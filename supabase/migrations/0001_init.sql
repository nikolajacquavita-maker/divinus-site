-- Divinus — schema inicial: produtos + mensagens + storage + RLS
-- Aplicar via mcp Supabase (apply_migration) assim que o projeto existir.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- PRODUCTS
-- ---------------------------------------------------------------------
create type product_universe as enum ('water', 'performance', 'essentials');
create type product_status as enum ('active', 'paused', 'cancelled');

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  universe product_universe not null,
  name text not null,
  short_description text not null default '',
  full_description text not null default '',
  price numeric(10,2),
  images text[] not null default '{}',
  features text[] not null default '{}',
  lobway_url text,
  status product_status not null default 'paused',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_universe_idx on public.products (universe);
create index products_status_idx on public.products (status);

create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

alter table public.products enable row level security;

create policy "Public can read active products"
  on public.products for select
  to anon, authenticated
  using (status = 'active');

create policy "Authenticated can read all products"
  on public.products for select
  to authenticated
  using (true);

create policy "Authenticated can insert products"
  on public.products for insert
  to authenticated
  with check (true);

create policy "Authenticated can update products"
  on public.products for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can delete products"
  on public.products for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------
-- MESSAGES (versículo + reflexão + ação prática)
-- ---------------------------------------------------------------------
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  verse_text text not null,
  verse_reference text not null,
  reflection text not null,
  practical_action text not null,
  is_daily boolean not null default true,
  is_active boolean not null default true,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

create index messages_category_idx on public.messages (category);
create index messages_daily_idx on public.messages (is_daily, is_active);

alter table public.messages enable row level security;

create policy "Public can read active messages"
  on public.messages for select
  to anon, authenticated
  using (is_active = true);

create policy "Authenticated can read all messages"
  on public.messages for select
  to authenticated
  using (true);

create policy "Authenticated can insert messages"
  on public.messages for insert
  to authenticated
  with check (true);

create policy "Authenticated can update messages"
  on public.messages for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can delete messages"
  on public.messages for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------
-- STORAGE (fotos de produto)
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Public can read product images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'product-images');

create policy "Authenticated can upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

create policy "Authenticated can update product images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images');

create policy "Authenticated can delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');
