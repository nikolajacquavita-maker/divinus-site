export interface EstadoContent {
  uf: string;
  nome: string;
  tagline: string;
  cor: string;
  historia: string;
  economia: string;
  curiosidades: string;
  escolhaCor: string;
  images: string[];
}

export interface Lancamento {
  uf: string;
  dataInicio: string; // ISO yyyy-mm-dd
  dataFim: string; // ISO yyyy-mm-dd
  evento: string;
  local: string;
}

export const LANCAMENTOS: Record<string, Lancamento> = {
  MG: {
    uf: "MG",
    dataInicio: "2026-11-20",
    dataFim: "2026-11-22",
    evento: "UAI — Ultra dos Anjos Internacional",
    local: "Prova de ultramaratona de 235 km, Brasil",
  },
};

export const ESTADOS_DISPONIVEIS: Record<string, EstadoContent> = {
  SP: {
    uf: "SP",
    nome: "São Paulo",
    tagline: "a cidade que não para.",
    cor: "#e63946",
    historia:
      "São Paulo nasceu em 1554 como um colégio jesuíta no alto de uma colina, pensado para catequizar — não para virar a maior cidade do hemisfério sul. O crescimento veio em ondas: primeiro os bandeirantes, que usaram o planalto como ponto de partida para explorar o interior do Brasil; depois o café, no século 19, que trouxe trilhos, imigrantes de dezenas de países e o capital que deu origem à indústria paulista; por fim a industrialização do século 20, que transformou fazendas de café em bairros inteiros. Hoje a Grande São Paulo reúne mais de 21 milhões de pessoas, um mosaico de quem chegou de todos os cantos do Brasil e do mundo atrás do mesmo movimento que nunca parou.",
    economia:
      "São Paulo sozinho responde por quase um terço do PIB brasileiro — mais do que muitos países da América Latina inteiros. É sede da B3, a bolsa de valores do Brasil, e concentra a maior parte das matrizes de empresas multinacionais que operam no país. Também é o maior polo industrial e financeiro da América do Sul, com uma economia tão diversa que vai do agronegócio do interior à tecnologia e aos serviços financeiros da capital.",
    curiosidades:
      '"Non ducor, duco" — "não sou conduzido, conduzo" — é o lema no brasão da cidade de São Paulo, e resume bem o espírito do estado: o de quem abre caminho em vez de seguir. O aniversário da cidade, 25 de janeiro, é feriado e vira quase uma segunda virada de ano para os paulistanos. E o estado tem o maior corredor de ônibus do mundo, a Avenida Radial Leste — um símbolo de uma cidade que nunca parou de se mover.',
    escolhaCor:
      "O vermelho, o preto e o branco vêm direto da Bandeira Paulista, hasteada pela primeira vez em 1932 durante a Revolução Constitucionalista — o movimento que colocou São Paulo em pé de luta por uma constituição para o Brasil. Não é só uma escolha estética: é a mesma paleta que carrega até hoje a ideia de um povo que se levanta pelo que acredita, agora estampada numa camiseta feita para quem corre com propósito.",
    images: ["/images/produtos/camiseta-sao-paulo-original.jpg"],
  },
};
