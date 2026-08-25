-- Divinus — "active" e "coming_soon" ficam visíveis no catálogo público
-- (coming_soon aparece com selo "Em breve", sem botão de comprar);
-- "paused" e "cancelled" continuam totalmente invisíveis pro cliente.
-- Rodar depois do 0005_product_coming_soon_status.sql.

alter policy "Public can read active products"
  on public.products
  using (status in ('active', 'coming_soon'));
