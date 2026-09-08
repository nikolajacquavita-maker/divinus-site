-- Divinus — primeiro produto da linha Água Divinus

insert into public.products (slug, universe, name, short_description, full_description, price, images, features, lobway_url, status, sort_order)
values (
  'agua-divinus',
  'water',
  'Água Divinus',
  'Água mineral, com e sem gás, em lata minimalista com uma cruz e um QR Code que leva à mensagem certa para o seu momento.',
  'Cada lata de Água Divinus carrega uma mensagem. Disponível com e sem gás, a lata traz uma cruz minimalista e um QR Code que leva direto a uma reflexão bíblica — na sua rotina, no escritório, no treino, em qualquer momento em que você precisar lembrar quem você é.',
  null,
  array['/images/produtos/agua-divinus-frente.jpg', '/images/produtos/agua-divinus-verso.jpg', '/images/produtos/agua-divinus-escritorio.jpg', '/images/produtos/agua-divinus-atleta.jpg'],
  array['Com e sem gás', 'Lata de alumínio', 'Cruz minimalista', 'QR Code com mensagem bíblica'],
  null,
  'coming_soon',
  0
);
