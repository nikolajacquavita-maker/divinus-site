-- Split account approval from Grupo de Oração approval. From now on,
-- creating an account (email/password or Google) is auto-approved and
-- works immediately for Bíblia/Comunidade. Only Grupo de Oração (viewing
-- addresses + submitting a group) still requires manual authorization,
-- tracked in its own column.

alter table public.members
  add column grupo_oracao_status text not null default 'pending'
  check (grupo_oracao_status in ('pending', 'approved', 'rejected'));

-- Grandfather existing approved accounts into Grupo de Oração approval too
-- (they were already fully vetted under the old single-gate system).
update public.members set grupo_oracao_status = 'approved' where status = 'approved';

-- Existing pending accounts are no longer blocked from general access —
-- only from Grupo de Oração, which keeps its own pending status above.
update public.members set status = 'approved' where status = 'pending';

alter table public.members alter column status set default 'approved';

-- Signup: now auto-approves the account; Grupo de Oração stays pending.
create or replace function public.member_signup(
  p_name text,
  p_email text,
  p_password text,
  p_cpf text default null,
  p_telefone text default null
)
returns table(id uuid, status text)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_id uuid;
  v_cpf_digits text;
begin
  if length(trim(p_name)) < 2 then
    raise exception 'Informe seu nome.';
  end if;
  if p_password is null or length(p_password) < 8 then
    raise exception 'A senha precisa ter pelo menos 8 caracteres.';
  end if;

  v_cpf_digits := regexp_replace(coalesce(p_cpf, ''), '\D', '', 'g');
  if v_cpf_digits = '' then
    v_cpf_digits := null;
  elsif length(v_cpf_digits) <> 11 then
    raise exception 'CPF inválido.';
  end if;

  begin
    insert into members (name, email, password_hash, cpf, telefone, status, grupo_oracao_status)
    values (trim(p_name), lower(trim(p_email)), crypt(p_password, gen_salt('bf')), v_cpf_digits, nullif(trim(coalesce(p_telefone, '')), ''), 'approved', 'pending')
    returning members.id into v_id;
  exception when unique_violation then
    raise exception 'Esse e-mail já está cadastrado.';
  end;

  return query select v_id, 'approved'::text;
end;
$$;

-- OAuth upsert: same auto-approval for new accounts.
create or replace function public.member_oauth_upsert(
  p_email text,
  p_name text,
  p_google_sub text
)
returns table(out_id uuid, out_name text, out_email text, out_status text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text := lower(trim(p_email));
begin
  update members as m
  set google_sub = p_google_sub
  where m.email = v_email
    and (m.google_sub is distinct from p_google_sub);

  insert into members (name, email, google_sub, status, grupo_oracao_status)
  values (trim(p_name), v_email, p_google_sub, 'approved', 'pending')
  on conflict (email) do nothing;

  return query
    select m.id, m.name, m.email, m.status
    from members as m
    where m.email = v_email;
end;
$$;

-- get_member / member_login now also return grupo_oracao_status.
create or replace function public.get_member(p_id uuid)
returns table(id uuid, name text, email text, status text, grupo_oracao_status text)
language sql
security definer
set search_path = public
as $$
  select id, name, email, status, grupo_oracao_status from members where id = p_id;
$$;

create or replace function public.member_login(p_email text, p_password text)
returns table(id uuid, name text, email text, status text, grupo_oracao_status text)
language sql
security definer
set search_path = public, extensions
as $$
  select m.id, m.name, m.email, m.status, m.grupo_oracao_status
  from members m
  where m.email = lower(trim(p_email))
    and m.password_hash is not null
    and m.password_hash = crypt(p_password, m.password_hash);
$$;

-- Grupo de Oração features now check grupo_oracao_status specifically.
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
  select grupo_oracao_status into v_status from members where id = p_member_id;
  if v_status is distinct from 'approved' then
    raise exception 'Seu acesso ao Grupo de Oração ainda não foi aprovado.';
  end if;

  insert into prayer_groups (member_id, uf, cidade, endereco, horario, descricao, foto_url)
  values (p_member_id, upper(trim(p_uf)), trim(p_cidade), trim(p_endereco), trim(p_horario), trim(p_descricao), p_foto_url)
  returning id into v_id;

  return v_id;
end;
$$;

create or replace function public.list_prayer_groups(p_member_id uuid, p_uf text default null, p_cidade text default null)
returns setof public.prayer_groups
language plpgsql
security definer
set search_path = public
as $$
declare
  v_status text;
begin
  select grupo_oracao_status into v_status from members where id = p_member_id;
  if v_status is distinct from 'approved' then
    raise exception 'Acesso ao Grupo de Oração restrito a cadastros aprovados.';
  end if;

  return query
    select *
    from prayer_groups
    where status = 'approved'
      and (p_uf is null or uf = upper(trim(p_uf)))
      and (p_cidade is null or cidade = trim(p_cidade));
end;
$$;
