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
