import { ArrowRight, MapPin, Sparkles } from "lucide-react";
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
      subtitle="AI-driven diagnostic profile · Karnataka & Kerala"
      className="flex h-full flex-col"
      bodyClassName="flex flex-1 flex-col"
    >
      {/* Prominent Pest & Crop Visual Display */}
      <div className="grid grid-cols-2 gap-3 rounded-xl border border-line bg-paper/60 p-3">
        {/* Pest Card */}
        <div className="flex flex-col gap-2 rounded-lg border border-line-soft bg-white p-2.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
              Target Pest
            </span>
            <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[9px] font-semibold text-rose-700">
              Insect
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <PestThumb pest={analysis.selection.pest} size="md" className="h-14 w-14 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13.5px] font-bold text-ink">
                {analysis.selection.pest}
              </p>
              <p className="truncate text-[10.5px] italic text-faint">
                {meta?.scientific || "Identified Specimen"}
              </p>
            </div>
          </div>
        </div>

        {/* Crop Card */}
        <div className="flex flex-col gap-2 rounded-lg border border-line-soft bg-white p-2.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-forest-700">
              Host Crop
            </span>
            <span className="rounded bg-forest-50 px-1.5 py-0.5 text-[9px] font-semibold text-forest-700">
              Host
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <CropThumb crop={analysis.selection.crop} size="md" className="h-14 w-14 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13.5px] font-bold text-ink">
                {analysis.selection.crop}
              </p>
              <p className="flex items-center gap-1 truncate text-[10.5px] text-faint">
                <MapPin className="h-3 w-3 shrink-0 text-faint" />
                {analysis.selection.district}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2">
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
