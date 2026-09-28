// Mapa nome → id dos 66 livros (ids do dataset ARC em public/data/biblia/).
// Fixo e hardcoded (não lê arquivo) pra funcionar em qualquer runtime,
// incluindo o Worker do Cloudflare.
const LIVRO_ID_POR_NOME: Record<string, string> = {
  "genesis": "gn",
  "exodo": "ex",
  "levitico": "lv",
  "numeros": "nm",
  "deuteronomio": "dt",
  "josue": "js",
  "juizes": "jud",
  "rute": "rt",
  "1 samuel": "1sm",
  "2 samuel": "2sm",
  "1 reis": "1kgs",
  "2 reis": "2kgs",
  "1 cronicas": "1ch",
  "2 cronicas": "2ch",
  "esdras": "ezr",
  "neemias": "ne",
  "ester": "et",
  "jo": "job",
  "salmos": "ps",
  "salmo": "ps",
  "proverbios": "prv",
  "eclesiastes": "ec",
  "canticos": "so",
  "cantico dos canticos": "so",
  "isaias": "is",
  "jeremias": "jr",
  "lamentacoes": "lm",
  "lamentacoes de jeremias": "lm",
  "ezequiel": "ez",
  "daniel": "dn",
  "oseias": "ho",
  "joel": "jl",
  "amos": "am",
  "obadias": "ob",
  "jonas": "jn",
  "miqueias": "mi",
  "naum": "na",
  "habacuque": "hk",
  "sofonias": "zp",
  "ageu": "hg",
  "zacarias": "zc",
  "malaquias": "ml",
  "mateus": "mt",
  "marcos": "mk",
  "lucas": "lk",
  "joao": "jo",
  "atos": "act",
  "romanos": "rm",
  "1 corintios": "1co",
  "2 corintios": "2co",
  "galatas": "gl",
  "efesios": "eph",
  "filipenses": "ph",
  "colossenses": "cl",
  "1 tessalonicenses": "1ts",
  "2 tessalonicenses": "2ts",
  "1 timoteo": "1tm",
  "2 timoteo": "2tm",
  "tito": "tt",
  "filemom": "phm",
  "hebreus": "hb",
  "tiago": "jm",
  "tg": "jm",
  "1 pedro": "1pe",
  "2 pedro": "2pe",
  "1 joao": "1jo",
  "2 joao": "2jo",
  "3 joao": "3jo",
  "judas": "jd",
  "apocalipse": "re",
  "ap": "re",
};

const DIACRITICS = /[̀-ͯ]/g;

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(DIACRITICS, "")
    .toLowerCase()
    .replace(/\./g, "")
    .trim();
}

export interface ReferenciaBiblia {
  livroId: string;
  capitulo: number;
  versiculoInicio: number;
}

/**
 * Converte uma referência no formato "Livro capítulo:versículo" ou
 * "Livro capítulo:versículoInicial-versículoFinal" (igual ao campo
 * `reference` de hero_messages) no id do livro + capítulo + primeiro
 * versículo, pra montar o link pra `/biblia/[livro]/[capitulo]#v[n]`.
 */
export function parseReferencia(referencia: string): ReferenciaBiblia | null {
  const match = referencia.trim().match(/^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/);
  if (!match) return null;

  const [, livroRaw, capituloStr, versiculoInicioStr] = match;
  const livroId = LIVRO_ID_POR_NOME[normalize(livroRaw)];
  if (!livroId) return null;

  return {
    livroId,
    capitulo: Number(capituloStr),
    versiculoInicio: Number(versiculoInicioStr),
  };
}

export function referenciaParaRota(referencia: string): string | null {
  const parsed = parseReferencia(referencia);
  if (!parsed) return null;
  return `/biblia/${parsed.livroId}/${parsed.capitulo}#v${parsed.versiculoInicio}`;
}
