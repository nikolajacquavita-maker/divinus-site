-- Divinus — mensagens aleatórias do hero da home (embasadas na Bíblia, sem citação literal)

create table public.hero_messages (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index hero_messages_active_idx on public.hero_messages (is_active);

create trigger hero_messages_set_updated_at
  before update on public.hero_messages
  for each row execute function public.set_updated_at();

alter table public.hero_messages enable row level security;

create policy "Public can read active hero messages"
  on public.hero_messages for select
  to anon, authenticated
  using (is_active = true);

create policy "Authenticated can read all hero messages"
  on public.hero_messages for select
  to authenticated
  using (true);

create policy "Authenticated can insert hero messages"
  on public.hero_messages for insert
  to authenticated
  with check (true);

create policy "Authenticated can update hero messages"
  on public.hero_messages for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can delete hero messages"
  on public.hero_messages for delete
  to authenticated
  using (true);
