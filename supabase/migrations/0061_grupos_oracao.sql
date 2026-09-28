-- Grupo de Oração: visitor accounts (separate from admin auth) + moderated
-- prayer group listings. Both tables are fully locked down (RLS enabled,
-- zero anon/authenticated policies) — all access goes through the
-- security-definer functions below, which enforce their own rules
-- (password check, approved-member check) regardless of caller role.

create extension if not exists pgcrypto;

create table public.members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password_hash text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.members enable row level security;

create table public.prayer_groups (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.members(id) on delete cascade,
  uf text not null,
  cidade text not null,
  endereco text not null,
  foto_url text,
  horario text not null,
  descricao text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.prayer_groups enable row level security;

create index prayer_groups_uf_cidade_idx on public.prayer_groups (uf, cidade) where status = 'approved';
create index prayer_groups_member_idx on public.prayer_groups (member_id);

-- Admin (existing Supabase Auth "authenticated" role) can read/manage
-- everything directly for the moderation screens in /admin.
create policy "authenticated_select_members" on public.members
  for select to authenticated using (true);
create policy "authenticated_update_members" on public.members
  for update to authenticated using (true);

create policy "authenticated_select_prayer_groups" on public.prayer_groups
  for select to authenticated using (true);
create policy "authenticated_update_prayer_groups" on public.prayer_groups
  for update to authenticated using (true);
create policy "authenticated_delete_prayer_groups" on public.prayer_groups
  for delete to authenticated using (true);

-- Signup: creates a pending member. Never exposes password_hash.
create or replace function public.member_signup(p_name text, p_email text, p_password text)
returns table(id uuid, status text)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_id uuid;
begin
  if length(trim(p_name)) < 2 then
    raise exception 'Informe seu nome.';
  end if;
  if p_password is null or length(p_password) < 8 then
    raise exception 'A senha precisa ter pelo menos 8 caracteres.';
  end if;

  begin
    insert into members (name, email, password_hash)
    values (trim(p_name), lower(trim(p_email)), crypt(p_password, gen_salt('bf')))
    returning members.id into v_id;
  exception when unique_violation then
    raise exception 'Esse e-mail já está cadastrado.';
  end;

  return query select v_id, 'pending'::text;
end;
$$;

revoke all on function public.member_signup(text, text, text) from public;
grant execute on function public.member_signup(text, text, text) to anon, authenticated;

-- Login: verifies password via pgcrypto, returns the member row on success
-- (regardless of approval status — the app decides what to show a pending
-- member) or nothing on failure.
create or replace function public.member_login(p_email text, p_password text)
returns table(id uuid, name text, email text, status text)
language sql
security definer
set search_path = public, extensions
as $$
  select m.id, m.name, m.email, m.status
  from members m
  where m.email = lower(trim(p_email))
    and m.password_hash = crypt(p_password, m.password_hash);
$$;

revoke all on function public.member_login(text, text) from public;
grant execute on function public.member_login(text, text) to anon, authenticated;

-- Re-fetch the current session's member (id comes from our signed cookie,
-- never from user input) to confirm they still exist / are still approved.
create or replace function public.get_member(p_id uuid)
returns table(id uuid, name text, email text, status text)
language sql
security definer
set search_path = public
as $$
  select id, name, email, status from members where id = p_id;
$$;

revoke all on function public.get_member(uuid) from public;
grant execute on function public.get_member(uuid) to anon, authenticated;

-- Submit a group listing. Only members whose account is already approved
-- may do this — enforced here, not just in the app.
create or replace function public.submit_prayer_group(
  p_member_id uuid,
  p_uf text,
  p_cidade text,
  p_endereco text,
  p_horario text,
  p_descricao text,
  p_foto_url text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_status text;
  v_id uuid;
begin
  select status into v_status from members where id = p_member_id;
  if v_status is distinct from 'approved' then
    raise exception 'Seu cadastro ainda não foi aprovado.';
  end if;

  insert into prayer_groups (member_id, uf, cidade, endereco, horario, descricao, foto_url)
  values (p_member_id, upper(trim(p_uf)), trim(p_cidade), trim(p_endereco), trim(p_horario), trim(p_descricao), p_foto_url)
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function public.submit_prayer_group(uuid, text, text, text, text, text, text) from public;
grant execute on function public.submit_prayer_group(uuid, text, text, text, text, text, text) to anon, authenticated;

-- List approved groups, optionally filtered by state/city. Requires a
-- currently-approved member id, so browsing is gated the same as viewing.
create or replace function public.list_prayer_groups(p_member_id uuid, p_uf text default null, p_cidade text default null)
returns setof public.prayer_groups
language plpgsql
security definer
set search_path = public
as $$
declare
  v_status text;
begin
  select status into v_status from members where id = p_member_id;
  if v_status is distinct from 'approved' then
    raise exception 'Acesso restrito a cadastros aprovados.';
  end if;

  return query
    select *
    from prayer_groups
    where status = 'approved'
      and (p_uf is null or uf = upper(trim(p_uf)))
      and (p_cidade is null or cidade = trim(p_cidade));
end;
$$;

revoke all on function public.list_prayer_groups(uuid, text, text) from public;
grant execute on function public.list_prayer_groups(uuid, text, text) to anon, authenticated;

-- Storage bucket for facade photos. Public bucket (matches the existing
-- product-images pattern) with random UUID filenames — anon may upload
-- (members aren't Supabase-authenticated, so this can't be restricted to
-- "authenticated" like product-images is) and anyone may read by URL, but
-- URLs are never listed publicly, only shown to approved members in the app.
insert into storage.buckets (id, name, public)
values ('grupo-oracao-fotos', 'grupo-oracao-fotos', true)
on conflict (id) do nothing;

create policy "public_read_grupo_oracao_fotos" on storage.objects
  for select to public using (bucket_id = 'grupo-oracao-fotos');

create policy "anon_upload_grupo_oracao_fotos" on storage.objects
  for insert to anon, authenticated with check (bucket_id = 'grupo-oracao-fotos');
