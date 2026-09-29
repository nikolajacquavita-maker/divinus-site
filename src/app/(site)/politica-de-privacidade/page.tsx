import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Divinus",
};

const SECOES = [
  {
    index: "01",
    titulo: "Quem somos",
    texto:
      "A Divinus é uma marca que produz conteúdo, produtos físicos e uma experiência digital voltada à reflexão espiritual. Este site é operado pela Divinus, e esta política explica quais dados coletamos de quem cria uma conta ou interage com o site, por que coletamos, como usamos e quais são os seus direitos sobre eles.",
  },
  {
    index: "02",
    titulo: "Quais dados coletamos",
    texto:
      "Ao criar uma conta (por e-mail e senha, ou entrando com sua conta Google), coletamos nome, e-mail, CPF e telefone. Se você entra com o Google, recebemos apenas o nome, e-mail e um identificador da sua conta Google — nunca sua senha do Google. Ao cadastrar um grupo de oração, coletamos o endereço informado, horário, descrição e, se enviada, a foto da fachada. Ao usar a Bíblia, registramos quais versículos você marcou como lidos, para calcular seu progresso de leitura.",
  },
  {
    index: "03",
    titulo: "Por que coletamos cada dado",
    texto:
      "Nome, e-mail, CPF e telefone servem para identificar sua conta e permitir contato em caso de necessidade — por exemplo, para confirmar um cadastro antes de aprová-lo. O endereço e a foto de um grupo de oração são publicados para outras pessoas aprovadas encontrarem o grupo, por isso pedimos que só sejam enviados com o consentimento de quem organiza o grupo. O progresso de leitura da Bíblia é usado exclusivamente para mostrar sua própria porcentagem lida — não é compartilhado com outras pessoas.",
  },
  {
    index: "04",
    titulo: "Aprovação manual de cadastros",
    texto:
      "Todo cadastro novo — seja feito por e-mail e senha ou pelo Google — fica com status pendente até ser revisado manualmente. Isso vale tanto para contas quanto para grupos de oração enviados. Essa revisão existe para proteger a comunidade contra cadastros falsos ou conteúdo impróprio, especialmente porque grupos de oração publicam endereços residenciais.",
  },
  {
    index: "05",
    titulo: "Como protegemos seus dados",
    texto:
      "Senhas nunca são armazenadas em texto puro — usamos um algoritmo de hash (bcrypt) que torna a senha original irrecuperável, mesmo por nós. As tabelas que guardam seus dados de cadastro, grupos de oração e progresso de leitura não têm acesso público direto: toda leitura e escrita passa por funções específicas que verificam permissão antes de agir. Sua sessão de login é controlada por um cookie assinado digitalmente, que só o navegador que fez login consegue usar.",
  },
  {
    index: "06",
    titulo: "Com quem compartilhamos dados",
    texto:
      "Não vendemos nem alugamos seus dados a terceiros. Usamos o Supabase (infraestrutura de banco de dados) para armazenar as informações, e o Google como opção de login — cada um desses serviços tem suas próprias políticas de privacidade. Endereços e fotos de grupos de oração só ficam visíveis para outras contas aprovadas dentro da área de Grupo de Oração, nunca publicamente na internet.",
  },
  {
    index: "07",
    titulo: "Cookies",
    texto:
      "Usamos apenas um cookie essencial, necessário para manter você logado entre uma página e outra. Não usamos cookies de rastreamento publicitário ou de terceiros para monitorar sua navegação em outros sites.",
  },
  {
    index: "08",
    titulo: "Seus direitos (LGPD)",
    texto:
      "Segundo a Lei Geral de Proteção de Dados (LGPD), você pode solicitar a qualquer momento: acesso aos dados que temos sobre você, correção de dados incorretos, exclusão da sua conta e dos dados associados, ou uma cópia dos seus dados em formato legível. Para exercer qualquer um desses direitos, entre em contato pelo e-mail abaixo.",
  },
  {
    index: "09",
    titulo: "Por quanto tempo guardamos seus dados",
    texto:
      "Mantemos seus dados enquanto sua conta estiver ativa. Se você pedir a exclusão da conta, removemos seus dados pessoais e o conteúdo associado (como grupos de oração enviados), salvo quando a lei exigir retenção por período determinado.",
  },
  {
    index: "10",
    titulo: "Contato",
    texto:
      "Dúvidas sobre esta política ou pedidos relacionados aos seus dados podem ser enviados para contato@divinus.com.br. Esta política pode ser atualizada eventualmente — a data da última atualização aparece abaixo.",
  },
];

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-14 sm:py-20">
      <p className="text-xs label-caps text-accent">Divinus</p>
      <h1 className="font-display mt-2 text-3xl sm:text-4xl">Política de Privacidade</h1>
      <p className="mt-6 text-muted-foreground">
        Esta página explica, em linguagem direta, quais dados o site da
        Divinus coleta, por que coleta e como você pode controlá-los.
      </p>

      <div className="mt-4">
        {SECOES.map((s) => (
          <div
            key={s.index}
            className="grid gap-3 border-t border-border py-10 sm:grid-cols-[130px_1fr] sm:gap-8"
          >
            <div>
              <p className="text-xs label-caps text-muted-foreground">{s.index}</p>
              <p className="font-display mt-1 text-lg">{s.titulo}</p>
            </div>
            <p className="text-muted-foreground">{s.texto}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
        Última atualização: 29 de setembro de 2026.
      </p>
    </div>
  );
}
