import type { Igreja } from "./types";

/**
 * Dados reais levantados via pesquisa (site da Diocese de Araçatuba, diretórios
 * locais e geocodificação OpenStreetMap/Nominatim). Cidade-piloto do mapa de
 * igrejas — outras cidades ainda não têm dados cadastrados.
 */
export const IGREJAS_POR_CIDADE: Record<string, Igreja[]> = {
  "sp/aracatuba": [
    {
      nome: "Catedral Diocesana Nossa Senhora Aparecida",
      denominacao: "catolica",
      endereco: "Praça Rui Barbosa, s/n — Centro, Araçatuba/SP, 16011-175",
      lat: -21.207057,
      lng: -50.438478,
      telefone: "(18) 3623-5245",
    },
    {
      nome: "Paróquia São Paulo Apóstolo",
      denominacao: "catolica",
      endereco: "Rua Francisco Cardassi, 319 — Planalto, Araçatuba/SP, 16072-390",
      lat: -21.200614,
      lng: -50.459739,
    },
    {
      nome: "Paróquia Santo Antônio de Pádua",
      denominacao: "catolica",
      endereco: "Rua Liberdade, 142 — Vila Bandeirantes, Araçatuba/SP, 16015-490",
      lat: -21.217133,
      lng: -50.440492,
      telefone: "(18) 3623-2435",
    },
    {
      nome: "Santuário São João Batista e São Judas Tadeu",
      denominacao: "catolica",
      endereco: "Praça São João, s/n — São João, Araçatuba/SP, 16010-970",
      lat: -21.210403,
      lng: -50.451633,
      telefone: "(18) 3623-7386",
    },
    {
      nome: "Paróquia Imaculado Coração de Maria",
      denominacao: "catolica",
      endereco: "Rua Saldanha Marinho, 1590 — São Joaquim, Araçatuba/SP, 16050-390",
      lat: -21.193651,
      lng: -50.450622,
      telefone: "(18) 3623-4929",
    },
    {
      nome: "Paróquia São Francisco e Santa Clara",
      denominacao: "catolica",
      endereco: "Rua Maria Gadioli Fardin, 390 — Cj. Hab. João Batista Botelho, Araçatuba/SP, 16012-190",
      lat: -21.209507,
      lng: -50.409426,
      telefone: "(18) 3301-9523",
    },
    {
      nome: "Paróquia São Sebastião",
      denominacao: "catolica",
      endereco: "Rua São Sebastião, 220 — Araçatuba/SP, 16075-080",
      lat: -21.1838,
      lng: -50.460231,
      telefone: "(18) 3622-2334",
    },
    {
      nome: "Paróquia Nossa Senhora de Fátima",
      denominacao: "catolica",
      endereco: "Rua Antônio Floriano Petia, 263 — Jussara, Araçatuba/SP, 16021-240",
      lat: -21.227449,
      lng: -50.455441,
      telefone: "(18) 3631-0397",
    },
    {
      nome: "Paróquia Sant'Ana",
      denominacao: "catolica",
      endereco: "Rua Tenente Alcides Theodoro dos Santos, s/n — Aviação, Araçatuba/SP, 16055-557",
      lat: -21.184576,
      lng: -50.427008,
    },
    {
      nome: "Paróquia Divino Espírito Santo",
      denominacao: "catolica",
      endereco: "Rua Araçatuba, 488 — Jardim Alvorada, Araçatuba/SP, 16016-010",
      lat: -21.228647,
      lng: -50.422896,
      telefone: "(18) 3622-3759",
    },
    {
      nome: "Paróquia Bom Jesus da Lapa",
      denominacao: "catolica",
      endereco: "Rua Mato Grosso, 416 — Vila Mendonça, Araçatuba/SP, 16015-140",
      lat: -21.203993,
      lng: -50.431054,
      telefone: "(18) 3623-6779",
    },
    {
      nome: "Igreja Evangélica Assembleia de Deus",
      denominacao: "evangelica",
      endereco: "Rua Porangaba, 119 — Vila Industrial, Araçatuba/SP, 16072-165",
      lat: -21.207356,
      lng: -50.450625,
    },
    {
      nome: "Quinta Igreja Batista de Araçatuba",
      denominacao: "evangelica",
      endereco: "Rua Bastos Cordeiro, 421 — Santana, Araçatuba/SP",
      lat: -21.197331,
      lng: -50.444993,
    },
    {
      nome: "Igreja Presbiteriana de Araçatuba",
      denominacao: "evangelica",
      endereco: "Rua Amador Bueno, 35 — Araçatuba/SP, 16072-335",
      lat: -21.203075,
      lng: -50.463173,
    },
    {
      nome: "Igreja Adventista do Sétimo Dia — Central Araçatuba",
      denominacao: "evangelica",
      endereco: "Rua Júlio Monteagudo Pinheiro, 296 — Araçatuba/SP, 16072-530",
      lat: -21.201582,
      lng: -50.466506,
    },
    {
      nome: "Igreja Universal do Reino de Deus",
      denominacao: "evangelica",
      endereco: "Rua Quinze de Novembro, 512 — Centro, Araçatuba/SP, 16010-030",
      lat: -21.204001,
      lng: -50.43828,
    },
    {
      nome: "Igreja do Evangelho Quadrangular",
      denominacao: "evangelica",
      endereco: "Rua João Batista Botelho, 273 — Araçatuba/SP, 16013-230",
      lat: -21.214864,
      lng: -50.417412,
    },
    {
      nome: "Congregação Cristã no Brasil",
      denominacao: "evangelica",
      endereco: "Rua Domingos Jorge Velho, 135 — Vila São Paulo, Araçatuba/SP, 16015-400",
      lat: -21.217665,
      lng: -50.435855,
    },
    {
      nome: "Centro Espírita Caminho de Jesus",
      denominacao: "espirita",
      endereco: "Rua Marquês de Abrantes, 826 — Boa Vista, Araçatuba/SP, 16071-020",
      lat: -21.204048,
      lng: -50.465844,
      telefone: "(18) 3623-4708",
    },
    {
      nome: "Centro Espírita Dr. Bezerra de Menezes",
      denominacao: "espirita",
      endereco: "Rua Conselheiro Oscar Rodrigues Alves, 152 — Centro, Araçatuba/SP, 16010-330",
      lat: -21.207404,
      lng: -50.427437,
    },
    {
      nome: "Centro Espírita Discípulos de Jesus",
      denominacao: "espirita",
      endereco: "Avenida Prestes Maia — Boa Vista, Araçatuba/SP, 16045-100",
      lat: -21.189034,
      lng: -50.454885,
      telefone: "(18) 3622-8336",
    },
    {
      nome: "Centro Espírita Casa da Caridade",
      denominacao: "espirita",
      endereco: "Rua Péricles Pimentel Salgado, 1010 — Vila Mendonça, Araçatuba/SP, 16013-230",
      lat: -21.214927,
      lng: -50.41777,
      telefone: "(18) 3608-8286",
    },
  ],
};

export function getIgrejasByCidade(uf: string, municipioSlug: string): Igreja[] | null {
  return IGREJAS_POR_CIDADE[`${uf}/${municipioSlug}`] ?? null;
}
