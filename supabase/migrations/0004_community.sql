-- Divinus — conteúdo editável da página /comunidade (desafios + encontros)

create table public.challenges (
  id uuid primary key default gen_random_uuid(),
  days int not null,
  title text not null,
  description text not null,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.community_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.challenges enable row level security;
alter table public.community_events enable row level security;

create policy "Public can read active challenges"
  on public.challenges for select
  to anon, authenticated
  using (is_active = true);

create policy "Authenticated can read all challenges"
  on public.challenges for select
  to authenticated
  using (true);

create policy "Authenticated can write challenges"
  on public.challenges for all
  to authenticated
  using (true)
  with check (true);

create policy "Public can read active community events"
  on public.community_events for select
  to anon, authenticated
  using (is_active = true);

create policy "Authenticated can read all community events"
  on public.community_events for select
  to authenticated
  using (true);

create policy "Authenticated can write community events"
  on public.community_events for all
  to authenticated
  using (true)
  with check (true);

insert into public.challenges (days, title, description, sort_order) values
(7, 'Silêncio', 'Sete dias para desligar o ruído e ouvir o que importa.', 0),
(21, 'Disciplina espiritual', 'Três semanas de constância: corpo, leitura e oração.', 1),
(40, 'Recomeço', 'Quarenta dias para reconstruir hábito, direção e identidade.', 2);

insert into public.community_events (title, description, sort_order) values
('Corrida Divinus — Amanhecer', 'Domingos, 6h · aberto a todos os ritmos', 0),
('Encontro presencial', 'Último sábado do mês · conversa e café', 1),
('Campanha solidária', 'Cada pack Jornada apoia distribuição de água', 2);
