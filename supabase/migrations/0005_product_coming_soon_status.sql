-- Divinus — adiciona o status "coming_soon" (Em breve).
-- IMPORTANTE: rodar este arquivo sozinho primeiro, depois rodar o
-- 0006_product_coming_soon_policy.sql em separado (o Postgres não permite
-- usar um valor de enum novo na mesma transação em que ele foi criado).

alter type product_status add value if not exists 'coming_soon';
