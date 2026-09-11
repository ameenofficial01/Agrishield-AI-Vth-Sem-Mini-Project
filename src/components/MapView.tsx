import { useEffect } from "react";
import L from "leaflet";
import { Circle, MapContainer, TileLayer, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { AreaRisk } from "../types";
import { LEVEL_COLORS } from "../data/mockData";

function FitBounds({ areas }: { areas: AreaRisk[] }) {
  const map = useMap();
  useEffect(() => {
    if (!areas.length) return;
    const b = L.latLngBounds(areas.map((a) => [a.lat, a.lng] as [number, number]));
    map.fitBounds(b.pad(0.28), { maxZoom: 10, animate: false });
    window.setTimeout(() => map.invalidateSize(), 60);
  }, [map, areas]);
  return null;
}

function CircleTip({ a, context }: { a: AreaRisk; context?: boolean }) {
  return (
    <Tooltip direction="top" offset={[0, -4]} opacity={1} className="map-tip">
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: context ? "#8a968f" : LEVEL_COLORS[a.level].hex }}
        />
        <span className="font-semibold">{a.name}</span>
        <span className="tabular text-subtle">
          {a.risk}% · {a.level}
        </span>
      </div>
    </Tooltip>
  );
}

export default function MapView({
  areas,
  contextAreas = [],
  centroid,
  interactive = false,
  legend = true,
  overlay,
  onAreaClick,
  className = "h-[420px]",
}: {
  areas: AreaRisk[];
  contextAreas?: AreaRisk[];
  centroid: [number, number];
  interactive?: boolean;
  legend?: boolean;
  overlay?: React.ReactNode;
  onAreaClick?: (a: AreaRisk) => void;
  className?: string;
}) {
  const maxRisk = areas.length ? Math.max(...areas.map((a) => a.risk)) : 0;

  return (
    <div className={`relative w-full overflow-hidden rounded-lg border border-line ${className}`}>
      <MapContainer
        center={centroid}
        zoom={9}
        scrollWheelZoom={interactive}
        zoomControl={interactive}
        doubleClickZoom={interactive}
        dragging
        className="h-full w-full"
        style={{ background: "#eef1ee" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        />
        <FitBounds areas={[...areas, ...contextAreas]} />

        {/* neighbouring districts — muted context */}
        {contextAreas.map((a) => (
          <Circle
            key={"ctx" + a.name}
            center={[a.lat, a.lng]}
            radius={a.radius}
            pathOptions={{
              color: "#8a968f",
              weight: 1,
              dashArray: "4 4",
              fillColor: "#8a968f",
              fillOpacity: 0.08,
            }}
            eventHandlers={onAreaClick ? { click: () => onAreaClick(a) } : undefined}
          >
            <CircleTip a={a} context />
            <Tooltip permanent direction="bottom" offset={[0, 6]} className="map-label" opacity={0.85}>
              {a.name}
            </Tooltip>
          </Circle>
        ))}

        {/* monitored taluks / areas of the selected district */}
        {areas.map((a) => {
          const c = LEVEL_COLORS[a.level];
          const hot = a.risk === maxRisk;
          return (
            <Circle
              key={a.name + a.risk}
              center={[a.lat, a.lng]}
              radius={a.radius}
              pathOptions={{
                color: hot ? c.hex : c.ring,
                weight: hot ? 2.4 : 1.4,
                fillColor: c.hex,
                fillOpacity: hot ? 0.4 : 0.26,
              }}
              eventHandlers={onAreaClick ? { click: () => onAreaClick(a) } : undefined}
            >
              <CircleTip a={a} />
            </Circle>
          );
        })}
      </MapContainer>

      {/* context chip */}
      {overlay && (
        <div className="pointer-events-none absolute left-3 top-3 z-[700] max-w-[70%]">{overlay}</div>
      )}

      {/* legend */}
      {legend && (
        <div className="absolute bottom-3 left-3 z-[700] flex items-center gap-3 rounded-lg border border-line bg-white/92 px-3 py-2 shadow-card backdrop-blur-sm">
          {(["Low", "Medium", "High"] as const).map((l) => (
            <span key={l} className="flex items-center gap-1.5 text-[10.5px] font-semibold text-subtle">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: LEVEL_COLORS[l].hex }} />
              {l}
            </span>
          ))}
          <span className="hidden border-l border-line pl-3 text-[10px] text-faint sm:block">
            Circle = monitored zone
          </span>
        </div>
      )}
    </div>
  );
}
