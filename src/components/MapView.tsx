import { useEffect } from "react";
import L from "leaflet";
import { Circle, MapContainer, TileLayer, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { AreaRisk } from "../types";
import { LEVEL_COLORS } from "../data/mockData";

function FitBounds({ areas, centroid }: { areas: AreaRisk[]; centroid: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (areas && areas.length > 0) {
      const b = L.latLngBounds(areas.map((a) => [a.lat, a.lng] as [number, number]));
      map.fitBounds(b.pad(0.15), { maxZoom: 12, animate: true });
    } else if (centroid) {
      map.setView(centroid, 10, { animate: true });
    }
    window.setTimeout(() => map.invalidateSize(), 60);
  }, [map, areas, centroid]);
  return null;
}

function CircleTip({ a, context }: { a: AreaRisk; context?: boolean }) {
  return (
    <Tooltip direction="top" offset={[0, -4]} opacity={1} className="map-tip">
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: context ? "#cbd5e1" : LEVEL_COLORS[a.level].hex }}
        />
        <span className="font-semibold text-white">{a.name}</span>
        <span className="tabular text-gray-200">
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
  interactive = true,
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
        zoom={10}
        scrollWheelZoom={interactive}
        zoomControl={interactive}
        doubleClickZoom={interactive}
        dragging
        className="h-full w-full"
        style={{ background: "#0f172a" }}
      >
        {/* Professional High-Res Satellite Imagery */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="&copy; Esri &mdash; Maxar, Earthstar Geographics"
        />
        {/* Satellite Reference Labels (Districts, Cities, Boundaries) */}
        <TileLayer
          url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        />

        {/* Zoom specifically into the affected district taluks */}
        <FitBounds areas={areas} centroid={centroid} />

        {/* Neighbouring districts — subtle dashed reference */}
        {contextAreas.map((a) => (
          <Circle
            key={"ctx" + a.name}
            center={[a.lat, a.lng]}
            radius={a.radius}
            pathOptions={{
              color: "#94a3b8",
              weight: 1.5,
              dashArray: "4 4",
              fillColor: "#64748b",
              fillOpacity: 0.15,
            }}
            eventHandlers={onAreaClick ? { click: () => onAreaClick(a) } : undefined}
          >
            <CircleTip a={a} context />
            <Tooltip permanent direction="bottom" offset={[0, 6]} className="map-label" opacity={0.9}>
              {a.name}
            </Tooltip>
          </Circle>
        ))}

        {/* Monitored and affected taluks in selected district */}
        {areas.map((a) => {
          const c = LEVEL_COLORS[a.level];
          const hot = a.risk === maxRisk;
          return (
            <Circle
              key={a.name + a.risk}
              center={[a.lat, a.lng]}
              radius={a.radius || 9000}
              pathOptions={{
                color: hot ? "#ffffff" : c.hex,
                weight: hot ? 3 : 2,
                fillColor: c.hex,
                fillOpacity: hot ? 0.65 : 0.45,
              }}
              eventHandlers={onAreaClick ? { click: () => onAreaClick(a) } : undefined}
            >
              <CircleTip a={a} />
              <Tooltip permanent direction="top" offset={[0, -6]} className="map-label" opacity={0.95}>
                {a.name} ({a.risk}%)
              </Tooltip>
            </Circle>
          );
        })}
      </MapContainer>

      {/* context chip */}
      {overlay && (
        <div className="pointer-events-none absolute left-3 top-3 z-[700] max-w-[70%]">{overlay}</div>
      )}

      {/* satellite badge indicator */}
      <div className="absolute right-3 top-3 z-[700] rounded-md bg-black/60 px-2 py-1 text-[10px] font-semibold text-white shadow-sm backdrop-blur-sm">
        🛰️ Satellite View
      </div>

      {/* legend */}
      {legend && (
        <div className="absolute bottom-3 left-3 z-[700] flex items-center gap-3 rounded-lg border border-line bg-white/95 px-3 py-2 shadow-card backdrop-blur-sm">
          {(["Low", "Medium", "High"] as const).map((l) => (
            <span key={l} className="flex items-center gap-1.5 text-[10.5px] font-semibold text-subtle">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: LEVEL_COLORS[l].hex }} />
              {l} Risk
            </span>
          ))}
          <span className="hidden border-l border-line pl-3 text-[10px] text-faint sm:block">
            Pulsing rings = affected taluks
          </span>
        </div>
      )}
    </div>
  );
}
