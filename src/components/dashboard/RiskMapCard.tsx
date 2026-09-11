import { Maximize2 } from "lucide-react";
import { Card, ProtoBadge } from "../ui";
import MapView from "../MapView";
import { useApp } from "../../context/AppContext";
import { LEVEL_COLORS } from "../../data/mockData";

export default function RiskMapCard() {
  const { analysis, navigate } = useApp();
  const c = LEVEL_COLORS[analysis.level];

  return (
    <Card
      title="Regional Risk Map"
      subtitle={`Pest risk levels across ${analysis.selection.district} — taluk-level monitored zones`}
      className="flex h-full flex-col"
      right={
        <>
          <ProtoBadge />
          <button
            onClick={() => navigate("map")}
            className="flex h-7.5 w-7.5 items-center justify-center rounded-lg border border-line text-subtle transition-colors hover:border-[#c9d2c9] hover:text-ink"
            title="Open full map"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </>
      }
      bodyClassName="flex flex-1 flex-col"
    >
      <MapView
        areas={analysis.areas}
        contextAreas={analysis.contextAreas}
        centroid={analysis.centroid}
        className="min-h-[380px] flex-1 xl:min-h-[430px]"
        overlay={
          <div className="rounded-lg border border-line bg-white/92 px-3 py-2 shadow-card backdrop-blur-sm">
            <p className="flex items-center gap-2 text-[12px] font-bold text-ink">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.hex }} />
              {analysis.selection.district}
            </p>
            <p className="mt-0.5 text-[10.5px] font-medium text-faint">
              {analysis.selection.crop} · {analysis.selection.pest} · district risk {analysis.base}%
            </p>
          </div>
        }
      />
    </Card>
  );
}
