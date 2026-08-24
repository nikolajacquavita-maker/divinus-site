-- Divinus — seed inicial de produtos (mesmos itens do mockup), status "paused"
-- até o admin completar foto real, preço e link Lobway pelo painel.

insert into public.products
  (slug, universe, name, short_description, full_description, price, images, features, lobway_url, status, sort_order)
values

('divinus-still-500ml', 'water', 'Divinus Still 500ml',
 'Sem gás · lata premium · mensagem individual',
 'Água mineral sem gás em lata premium. Cada unidade carrega uma frase, um versículo e um QR Code que leva a uma reflexão específica — nunca à página inicial.',
 null, '{}', array['Sem gás','Lata premium','Mensagem individual','QR único por lata'],
 null, 'paused', 0),

('divinus-sparkling-350ml', 'water', 'Divinus Sparkling 350ml',
 'Com gás · edição neutra',
 'Água mineral com gás em edição neutra. Mesma proposta da linha Water: uma mensagem por lata, nunca repetida à toa.',
 null, '{}', array['Com gás','Edição neutra','QR único por lata'],
 null, 'paused', 1),

('pack-jornada-12un', 'water', 'Pack Jornada 12un',
 '12 mensagens diferentes, uma por dia',
 'Pack com 12 unidades, cada uma com uma mensagem diferente — pensado pra acompanhar 12 dias seguidos de reflexão.',
 null, '{}', array['12 unidades','12 mensagens diferentes','Uma por dia'],
 null, 'paused', 2),

('tee-tecnica-conduz', 'performance', 'Tee Técnica Conduz',
 'Dry-touch · unissex · P ao GG',
 'Camiseta técnica dry-touch, unissex, do P ao GG. A frase aparece onde só você vê no espelho antes de sair.',
 null, '{}', array['Dry-touch','Unissex','P ao GG'],
 null, 'paused', 0),

('manga-longa-amanhecer', 'performance', 'Manga Longa Amanhecer',
 'Proteção UV · detalhe refletivo',
 'Manga longa com proteção UV e detalhe refletivo — pensada pra quem treina de madrugada ou no fim do dia.',
 null, '{}', array['Proteção UV','Detalhe refletivo'],
 null, 'paused', 1),

('bone-corrida-divinus', 'performance', 'Boné Corrida Divinus',
 'Leve · ajuste único',
 'Boné leve, ajuste único, feito pra corrida — parte da linha que conecta desempenho e fé.',
 null, '{}', array['Leve','Ajuste único'],
 null, 'paused', 2),

('eletrolito-creatina-dose-unica', 'performance', 'Eletrólito + Creatina dose única',
 'Sachês individuais · caixa com 20',
 'Eletrólitos e creatina em dose individual, sachês prontos, caixa com 20 unidades.',
 null, '{}', array['Sachês individuais','Caixa com 20'],
 null, 'paused', 3),

('camiseta-essentials', 'essentials', 'Camiseta Essentials',
 'Algodão pesado · tons neutros',
 'Camiseta de algodão pesado em tons neutros, pra levar a mensagem à vida comum, no dia a dia.',
 null, '{}', array['Algodão pesado','Tons neutros'],
 null, 'paused', 0),

('moletom-silencio', 'essentials', 'Moletom Silêncio',
 'Interior felpado · símbolo discreto',
 'Moletom com interior felpado e símbolo discreto — existe um propósito por trás desta peça.',
 null, '{}', array['Interior felpado','Símbolo discreto'],
 null, 'paused', 1),

('garrafa-divinus-600ml', 'essentials', 'Garrafa Divinus 600ml',
 'Inox · gravação a laser',
 'Garrafa em inox, 600ml, com gravação a laser — feita pra durar e lembrar todo dia.',
 null, '{}', array['Inox','Gravação a laser','600ml'],
 null, 'paused', 2),

('devocional-40-dias', 'essentials', 'Devocional 40 Dias',
 'Capa dura · leitura de 5 minutos',
 'Devocional de capa dura com leituras de 5 minutos, pensado pra criar constância em 40 dias.',
 null, '{}', array['Capa dura','Leitura de 5 minutos','40 dias'],
 null, 'paused', 3)
;
