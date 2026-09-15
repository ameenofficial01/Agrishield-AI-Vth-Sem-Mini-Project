import { ArrowRight, MapPin } from "lucide-react";
import { Card, RiskBadge } from "../ui";
import { CropThumb, PestThumb } from "../common/CropPestThumb";
import Gauge from "../Gauge";
import { useApp } from "../../context/AppContext";
import { PEST_META } from "../../data/cropPestMap";

export default function CurrentRiskCard() {
  const { analysis, navigate } = useApp();
  const meta = PEST_META[analysis.selection.pest];

  return (
    <Card
      title="Current Pest Risk"
      subtitle="Prediction prototype · demonstration data"
      className="flex h-full flex-col"
      bodyClassName="flex flex-1 flex-col"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <PestThumb pest={analysis.selection.pest} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-[15px] font-bold tracking-tight text-ink">
              {analysis.selection.pest}
            </p>
            {meta && (
              <p className="truncate text-[10.5px] italic text-faint">
                {meta.scientific} · {meta.group}
              </p>
            )}
          </div>
        </div>
        <span className="mt-0.5 shrink-0 rounded-md bg-paper px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-subtle ring-1 ring-line">
          Prototype
        </span>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-medium text-subtle">
        <span className="flex items-center gap-1.5">
          <CropThumb crop={analysis.selection.crop} size="sm" className="h-5 w-5" />
          {analysis.selection.crop}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3 w-3 text-faint" /> {analysis.selection.district}, {analysis.selection.state}
        </span>
      </div>

      <div className="mt-1">
        <Gauge value={analysis.base} level={analysis.level} />
        <div className="-mt-0.5 flex justify-center">
          <RiskBadge level={analysis.level} />
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-line-soft bg-paper/70 p-3.5">
        <p className="text-[12.5px] font-semibold leading-snug text-ink">{analysis.advisoryTitle}</p>
        <p className="mt-1 text-[11.5px] leading-relaxed text-subtle">{analysis.advisoryBody}</p>
      </div>

      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between text-[11px] font-semibold">
          <span className="text-subtle">Model confidence</span>
          <span className="tabular text-ink">{analysis.confidence}%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-paper">
          <div
            className="h-full rounded-full bg-teal-accent transition-all duration-700"
            style={{ width: `${analysis.confidence}%` }}
          />
        </div>
        <button
          onClick={() => navigate("xai")}
          className="mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-lg border border-line py-2 text-[12px] font-semibold text-forest-700 transition-colors hover:border-forest-600/40 hover:bg-forest-50"
        >
          Why this prediction?
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </Card>
  );
}
