import { UF_PATHS, MAP_VIEWBOX } from "@/lib/brazil-map-data";

export function IgrejasBrazilMap() {
  return (
    <svg
      viewBox={MAP_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mapa do Brasil — clique num estado para encontrar igrejas"
      className="w-full"
    >
      <title>Encontre uma igreja — clique num estado</title>
      {UF_PATHS.map(({ uf, nome, d }) => (
        <a key={uf} href={`/igrejas/${uf.toLowerCase()}`}>
          <path
            d={d}
            className="fill-card stroke-border transition-colors hover:fill-accent/60"
            strokeWidth={550}
          >
            <title>{nome}</title>
          </path>
        </a>
      ))}
    </svg>
  );
}
