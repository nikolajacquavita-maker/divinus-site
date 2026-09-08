import { UF_PATHS, MAP_VIEWBOX } from "@/lib/brazil-map-data";
import { ESTADOS_DISPONIVEIS } from "@/lib/estados-data";

export function BrazilMap() {
  return (
    <svg
      viewBox={MAP_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mapa do Brasil — clique num estado para ver a coleção"
      className="w-full"
    >
      <title>Coleção 27 Estados — clique num estado</title>
      {UF_PATHS.map(({ uf, nome, d }) => {
        const disponivel = Boolean(ESTADOS_DISPONIVEIS[uf]);
        return (
          <a key={uf} href={`/produtos/estados/${uf.toLowerCase()}`}>
            <path
              d={d}
              className={
                disponivel
                  ? "fill-accent stroke-accent transition-opacity hover:opacity-80"
                  : "fill-card stroke-border transition-colors hover:fill-muted"
              }
              strokeWidth={550}
            >
              <title>
                {nome}
                {disponivel ? "" : " — em breve"}
              </title>
            </path>
          </a>
        );
      })}
    </svg>
  );
}
