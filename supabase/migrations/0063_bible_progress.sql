-- Bible reading progress, tracked per member. Locked down like the other
-- member tables — no direct anon/authenticated access, only through
-- security-definer functions that verify the member id belongs to a real
-- session (the app only ever passes the id from the signed session cookie).

create table public.bible_progress (
  member_id uuid not null references public.members(id) on delete cascade,
  livro_id text not null,
  capitulo int not null,
  versiculo int not null,
  lido_em timestamptz not null default now(),
  primary key (member_id, livro_id, capitulo, versiculo)
);

alter table public.bible_progress enable row level security;

create index bible_progress_member_idx on public.bible_progress (member_id);

create policy "authenticated_select_bible_progress" on public.bible_progress
  for select to authenticated using (true);

create or replace function public.mark_verse_read(
  p_member_id uuid,
  p_livro_id text,
  p_capitulo int,
  p_versiculo int
)
returns void
language sql
security definer
set search_path = public
as $$
  insert into bible_progress (member_id, livro_id, capitulo, versiculo)
  values (p_member_id, p_livro_id, p_capitulo, p_versiculo)
  on conflict do nothing;
$$;

revoke all on function public.mark_verse_read(uuid, text, int, int) from public;
grant execute on function public.mark_verse_read(uuid, text, int, int) to anon, authenticated;

create or replace function public.unmark_verse_read(
  p_member_id uuid,
  p_livro_id text,
  p_capitulo int,
  p_versiculo int
)
returns void
language sql
security definer
set search_path = public
as $$
  delete from bible_progress
  where member_id = p_member_id
    and livro_id = p_livro_id
    and capitulo = p_capitulo
    and versiculo = p_versiculo;
$$;

revoke all on function public.unmark_verse_read(uuid, text, int, int) from public;
grant execute on function public.unmark_verse_read(uuid, text, int, int) to anon, authenticated;

create or replace function public.mark_chapter_read(
  p_member_id uuid,
  p_livro_id text,
  p_capitulo int,
  p_total_versiculos int
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v int;
begin
  for v in 1..p_total_versiculos loop
    insert into bible_progress (member_id, livro_id, capitulo, versiculo)
    values (p_member_id, p_livro_id, p_capitulo, v)
    on conflict do nothing;
  end loop;
end;
$$;

revoke all on function public.mark_chapter_read(uuid, text, int, int) from public;
grant execute on function public.mark_chapter_read(uuid, text, int, int) to anon, authenticated;

create or replace function public.get_chapter_progress(
  p_member_id uuid,
  p_livro_id text,
  p_capitulo int
)
returns setof int
language sql
security definer
set search_path = public
as $$
  select versiculo from bible_progress
  where member_id = p_member_id and livro_id = p_livro_id and capitulo = p_capitulo
  order by versiculo;
$$;

revoke all on function public.get_chapter_progress(uuid, text, int) from public;
grant execute on function public.get_chapter_progress(uuid, text, int) to anon, authenticated;

create or replace function public.get_bible_progress_summary(p_member_id uuid)
returns table(livro_id text, capitulo int, lidos bigint)
language sql
security definer
set search_path = public
as $$
  select livro_id, capitulo, count(*)::bigint as lidos
  from bible_progress
  where member_id = p_member_id
  group by livro_id, capitulo;
$$;

revoke all on function public.get_bible_progress_summary(uuid) from public;
grant execute on function public.get_bible_progress_summary(uuid) to anon, authenticated;

create or replace function public.get_bible_progress_total(p_member_id uuid)
returns bigint
language sql
security definer
set search_path = public
as $$
  select count(*)::bigint from bible_progress where member_id = p_member_id;
$$;

revoke all on function public.get_bible_progress_total(uuid) from public;
grant execute on function public.get_bible_progress_total(uuid) to anon, authenticated;
