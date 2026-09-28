-- Add CPF and phone to member accounts, collected at signup.

alter table public.members add column cpf text;
alter table public.members add column telefone text;

create unique index members_cpf_key on public.members (cpf) where cpf is not null;

drop function if exists public.member_signup(text, text, text);

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
    insert into members (name, email, password_hash, cpf, telefone)
    values (
      trim(p_name),
      lower(trim(p_email)),
      crypt(p_password, gen_salt('bf')),
      v_cpf_digits,
      nullif(trim(coalesce(p_telefone, '')), '')
    )
    returning members.id into v_id;
  exception
    when unique_violation then
      raise exception 'Esse e-mail ou CPF já está cadastrado.';
  end;

  return query select v_id, 'pending'::text;
end;
$$;

revoke all on function public.member_signup(text, text, text, text, text) from public;
grant execute on function public.member_signup(text, text, text, text, text) to anon, authenticated;
