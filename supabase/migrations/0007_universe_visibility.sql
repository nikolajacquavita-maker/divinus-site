-- Divinus — permite esconder uma linha inteira (Water/Performance/Essentials)
-- do site público, independente do status de cada produto individual.

create table public.universe_settings (
  universe product_universe primary key,
  is_visible boolean not null default true
);

alter table public.universe_settings enable row level security;

create policy "Public can read universe settings"
  on public.universe_settings for select
  to anon, authenticated
  using (true);

create policy "Authenticated can write universe settings"
  on public.universe_settings for all
  to authenticated
  using (true)
  with check (true);

insert into public.universe_settings (universe, is_visible) values
('water', true),
('performance', true),
('essentials', true);
