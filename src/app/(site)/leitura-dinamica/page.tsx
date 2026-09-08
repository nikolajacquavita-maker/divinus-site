import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leitura Dinâmica da Bíblia | Divinus",
};

const PASSOS = [
  {
    index: "01",
    titulo: "Identifique o assunto",
    texto:
      "Comece pelo que está pesando hoje, não pelo capítulo 1. Ansiedade, culpa, propósito, perdão — nomeie a dificuldade real antes de abrir a Bíblia.",
  },
  {
    index: "02",
    titulo: "Pesquise a palavra-chave",
    texto:
      "Procure essa palavra num buscador bíblico. Vão aparecer dezenas de passagens tocando o mesmo assunto, de livros e épocas diferentes.",
  },
  {
    index: "03",
    titulo: "Escolha o que salta aos olhos",
    texto:
      "Entre as opções, escolha a passagem que chamou mais atenção — não precisa ser a mais famosa. É essa reação inicial que indica por onde começar.",
  },
  {
    index: "04",
    titulo: "Entenda o contexto histórico",
    texto:
      "Quem escreveu, para quem, em que momento, sob que pressão. Um versículo sem contexto vira frase de parede; com contexto, vira instrução para alguém real, na situação real dele.",
  },
  {
    index: "05",
    titulo: "Leia o capítulo inteiro",
    texto:
      "Não pare no versículo que te chamou — leia o capítulo completo. Quase sempre o que parecia uma frase isolada é parte de um raciocínio bem mais longo.",
  },
  {
    index: "06",
    titulo: "Reflita e aplique",
    texto:
      "Escreva o que você sentiu e pensou lendo aquilo. Pergunte onde isso se encaixa na sua rotina, hoje — sem essa etapa, é conhecimento parado, não vivido.",
  },
  {
    index: "07",
    titulo: "Conecte com outras passagens",
    texto:
      "Boa parte da Bíblia comenta a si mesma. Siga as referências cruzadas para outros livros que tocam o mesmo tema, e repita os passos 4 a 7 em cada uma.",
  },
];

export default function LeituraDinamicaPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
      <p className="text-xs label-caps text-accent">Como lemos a Bíblia aqui</p>
      <h1 className="font-display mt-4 text-3xl sm:text-4xl">Leitura Dinâmica da Bíblia</h1>
      <p className="mt-6 text-muted-foreground">
        Não é sobre terminar a Bíblia do Gênesis ao Apocalipse. É sobre entrar
        nela pelo que está te afetando hoje, e sair tendo entendido — de
        verdade, com contexto — o que aquele texto quer dizer pra sua vida.
      </p>
      <p className="mt-4 text-muted-foreground">
        Prefira meditar sobre um único versículo por um ano inteiro e vivê-lo
        por completo, do que passar os olhos pelas Escrituras inteiras sem
        aplicar nada. Fé sem prática é só informação guardada.
      </p>

      <div className="mt-4">
        {PASSOS.map((p) => (
          <div
            key={p.index}
            className="grid gap-3 border-t border-border py-8 sm:grid-cols-[100px_1fr] sm:gap-8"
          >
            <div>
              <p className="text-xs label-caps text-muted-foreground">{p.index}</p>
              <p className="font-display mt-1 text-lg">{p.titulo}</p>
            </div>
            <div>
              <p className="text-muted-foreground">{p.texto}</p>
              {p.index === "02" && (
                <a
                  href="https://www.bibliaon.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-xs label-caps text-accent hover:underline"
                >
                  Buscar palavra-chave em bibliaon.com →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-border pt-12">
        <h2 className="font-display text-2xl">Três princípios por trás do método</h2>
        <div className="mt-8 space-y-8">
          <div>
            <p className="text-xs label-caps text-accent">Metas específicas, não vagas</p>
            <p className="mt-2 text-muted-foreground">
              &ldquo;Ler mais a Bíblia&rdquo; não dá pro seu cérebro nada
              concreto pra seguir. &ldquo;Um versículo por dia, com uma
              estratégia de como aplicar&rdquo; dá.
            </p>
          </div>
          <div>
            <p className="text-xs label-caps text-accent">Processo antes de resultado</p>
            <p className="mt-2 text-muted-foreground">
              O valor está em viver bem cada etapa — contexto, leitura,
              reflexão, conexão — não em quantos capítulos você riscou de uma
              lista.
            </p>
          </div>
          <div>
            <p className="text-xs label-caps text-accent">Blocos de estudo por tema</p>
            <p className="mt-2 text-muted-foreground">
              Em vez de ordem cronológica, agrupe por assunto: propósito,
              perdão, ansiedade. É assim que cada um dos 34 sentimentos aqui
              no site foi construído.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-border pt-12 text-center">
        <p className="font-display text-2xl">Veja isso funcionando na prática.</p>
        <p className="mt-4 text-muted-foreground">
          Cada sentimento na Divinus tem uma passagem trabalhada com esse
          método completo — contexto, capítulo, aplicação e conexão.
        </p>
        <Link
          href="/sentimentos"
          className="mt-8 inline-block border border-accent bg-accent px-6 py-3 text-xs label-caps text-accent-foreground hover:opacity-90 transition-opacity"
        >
          Explorar os sentimentos
        </Link>
      </div>
    </div>
  );
}
