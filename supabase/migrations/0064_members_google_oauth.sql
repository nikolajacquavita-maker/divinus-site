-- Support Google-authenticated members alongside email/password ones.

alter table public.members alter column password_hash drop not null;
alter table public.members add column google_sub text;

create unique index members_google_sub_key on public.members (google_sub) where google_sub is not null;

-- Looks up a member by email (the canonical identity in this system); if
-- none exists, creates a new pending one with no password (Google-only
-- login). Always safe to call again for a returning Google user.
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

  insert into members (name, email, google_sub, status)
  values (trim(p_name), v_email, p_google_sub, 'pending')
  on conflict (email) do nothing;

  return query
    select m.id, m.name, m.email, m.status
    from members as m
    where m.email = v_email;
end;
$$;

revoke all on function public.member_oauth_upsert(text, text, text) from public;
grant execute on function public.member_oauth_upsert(text, text, text) to anon, authenticated;
