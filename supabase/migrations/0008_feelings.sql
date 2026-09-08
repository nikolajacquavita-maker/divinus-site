-- Divinus — galeria de sentimentos (corpo/mente/espírito/ação)

create type feeling_category as enum (
  'ansiedade_medo',
  'perdas',
  'relacoes',
  'proposito_acao',
  'voce_consigo_mesmo'
);

create table public.feelings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category feeling_category not null,
  title text not null,
  teaser text not null,

  corpo_question text not null,
  corpo_text text not null,
  corpo_video_url text,

  mente_question text not null,
  mente_text text not null,
  mente_video_url text,

  espirito_question text not null,
  espirito_text text not null,
  espirito_video_url text,

  verse_text text not null,
  verse_reference text not null,

  acao_question text not null,
  acao_text text not null,
  acao_video_url text,
  acao_cta_label text not null default 'Eu aceito o desafio',

  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index feelings_category_idx on public.feelings (category);
create index feelings_active_idx on public.feelings (is_active);

create trigger feelings_set_updated_at
  before update on public.feelings
  for each row execute function public.set_updated_at();

alter table public.feelings enable row level security;

create policy "Public can read active feelings"
  on public.feelings for select
  to anon, authenticated
  using (is_active = true);

create policy "Authenticated can read all feelings"
  on public.feelings for select
  to authenticated
  using (true);

create policy "Authenticated can insert feelings"
  on public.feelings for insert
  to authenticated
  with check (true);

create policy "Authenticated can update feelings"
  on public.feelings for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can delete feelings"
  on public.feelings for delete
  to authenticated
  using (true);
