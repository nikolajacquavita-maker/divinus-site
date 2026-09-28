import fs from "fs";
import path from "path";

/**
 * Almeida Revista e Corrigida (ARC) — tradução de domínio público.
 * Fonte: https://github.com/MaatheusGois/bible (versions/pt-br/arc.json)
 * Verificado manualmente (ex.: João 3:16) contra o texto ARC conhecido.
 *
 * Use esse arquivo como fonte de verdade pra citar versículos no site —
 * nunca a edição da Bíblia publicada pela Igreja de Jesus Cristo dos
 * Santos dos Últimos Dias (© 2015 Intellectual Reserve, Inc.), que tem
 * direitos autorais reservados.
 */

interface ArcBook {
  id: string;
  name: string;
  chapters: string[][];
}

let cache: ArcBook[] | null = null;

function loadArc(): ArcBook[] {
  if (cache) return cache;
  const filePath = path.join(process.cwd(), "public", "data", "biblia-arc.json");
  cache = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return cache!;
}

const DIACRITICS = /[̀-ͯ]/g;

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(DIACRITICS, "")
    .toLowerCase()
    .replace(/\./g, "")
    .trim();
}

// Aliases além do nome exato já presente no JSON (ex.: "cantico dos canticos"
// pro livro cujo nome oficial no arquivo é "Cânticos").
const ALIASES: Record<string, string> = {
  "cantico dos canticos": "so",
  "canticos de salomao": "so",
  salmo: "ps",
  apocalipse: "re",
  ap: "re",
  tg: "jm",
  hb: "hb",
};

function findBookId(livroRaw: string, books: ArcBook[]): string | null {
  const alvo = normalize(livroRaw);
  const porNome = books.find((b) => normalize(b.name) === alvo);
  if (porNome) return porNome.id;
  if (ALIASES[alvo]) return ALIASES[alvo];
  const porId = books.find((b) => b.id === alvo);
  if (porId) return porId.id;
  return null;
}

export interface PassagemARC {
  livro: string;
  capitulo: number;
  versiculoInicio: number;
  versiculoFim: number;
  texto: string;
}

/**
 * Aceita referências no formato "Livro capítulo:versículo" ou
 * "Livro capítulo:versículoInicial-versículoFinal", igual ao campo
 * `reference` já usado em hero_messages (ex.: "Tiago 3:5", "1 Pedro 1:3-9").
 */
export function getPassagemARC(referencia: string): PassagemARC | null {
  const match = referencia.trim().match(/^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/);
  if (!match) return null;

  const [, livroRaw, capituloStr, versiculoInicioStr, versiculoFimStr] = match;
  const books = loadArc();
  const bookId = findBookId(livroRaw, books);
  if (!bookId) return null;

  const book = books.find((b) => b.id === bookId);
  if (!book) return null;

  const capitulo = Number(capituloStr);
  const versiculoInicio = Number(versiculoInicioStr);
  const versiculoFim = versiculoFimStr ? Number(versiculoFimStr) : versiculoInicio;

  const versos = book.chapters[capitulo - 1];
  if (!versos) return null;

  const trecho = versos.slice(versiculoInicio - 1, versiculoFim);
  if (trecho.length === 0) return null;

  return {
    livro: book.name,
    capitulo,
    versiculoInicio,
    versiculoFim,
    texto: trecho.join(" "),
  };
}
