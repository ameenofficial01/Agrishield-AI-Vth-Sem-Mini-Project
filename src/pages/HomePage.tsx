import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Bug,
  Globe,
  Loader2,
  MapPin,
  MapPinned,
  Radar,
  ShieldAlert,
  Wheat,
} from "lucide-react";
import { Card, Field } from "../components/ui";
import { CropThumb, PestThumb } from "../components/common/CropPestThumb";
import { STATES } from "../data/locations";
import { CROPS, CROP_PESTS } from "../data/cropPestMap";
import { useApp } from "../context/AppContext";
import type { Selection } from "../types";

function ActionCard({
  icon: Icon,
  title,
  text,
  cta,
  onClick,
  accent,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
  cta: string;
  onClick: () => void;
  accent: string;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-line bg-white p-5 shadow-card transition-shadow hover:shadow-pop">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg"
        style={{ backgroundColor: accent + "1a", color: accent }}
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <h3 className="mt-3.5 text-[15px] font-bold tracking-tight text-ink">{title}</h3>
      <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed text-faint">{text}</p>
      <button
        onClick={onClick}
        className="mt-4 flex h-9.5 items-center justify-center rounded-lg bg-forest-800 px-4 text-[13px] font-semibold text-white transition-colors hover:bg-forest-700 active:scale-[0.98]"
      >
        {cta}
      </button>
    </div>
  );
}

function SummaryStat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-white p-4 shadow-card">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: tone + "1a", color: tone }}
      >
        <Icon className="h-4.5 w-4.5" strokeWidth={2} />
      </span>
      <span className="min-w-0">
        <span className="block text-[10.5px] font-semibold uppercase tracking-wide text-faint">
          {label}
        </span>
        <span className="block truncate text-[15px] font-bold text-ink">{value}</span>
      </span>
    </div>
  );
}

export default function HomePage() {
  const { selection, analysis, navigate, quickCheck, checkingMessage } = useApp();
  const [draft, setDraft] = useState<Selection>(selection);

  useEffect(() => setDraft(selection), [selection]);

  const districts = STATES.find((s) => s.name === draft.state)?.districts.map((d) => d.name) ?? [];
  const pests = CROP_PESTS[draft.crop] ?? [];

  const setState = (state: string) => {
    const first = STATES.find((s) => s.name === state)?.districts[0]?.name ?? "";
    setDraft((d) => ({ ...d, state, district: first }));
  };
  const setCrop = (crop: string) => {
    const first = (CROP_PESTS[crop] ?? [])[0] ?? "";
    setDraft((d) => ({ ...d, crop, pest: first }));
  };

  const highRiskAreas = analysis.areas.filter((a) => a.level === "High").length;
  const checking = checkingMessage !== null;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[22px] font-bold tracking-tight text-ink sm:text-[26px]">
          Welcome to AgroShield AI
        </h2>
        <p className="mt-1 text-[13px] text-faint sm:text-[13.5px]">
          Monitor pest risk, review forecasts, and identify areas that need attention.
        </p>
      </div>

      {/* main actions */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <ActionCard
          icon={Radar}
          title="Check Pest Risk"
          text="Select a location, crop and pest to generate a risk assessment."
          cta="Start Analysis"
          accent="#1f6a48"
          onClick={() => navigate("dashboard")}
        />
        <ActionCard
          icon={MapPinned}
          title="View Risk Map"
          text="Explore location-specific pest-risk levels across districts and nearby regions."
          cta="Open Risk Map"
          accent="#0f766e"
          onClick={() => navigate("map")}
        />
        <ActionCard
          icon={ShieldAlert}
          title="View Alerts"
          text="Review active pest-risk warnings and monitoring notices."
          cta="View Alerts"
          accent="#c2410c"
          onClick={() => navigate("alerts")}
        />
      </div>

      {/* quick check */}
      <Card
        title="Quick Pest Risk Check"
        subtitle="Choose a location, crop and pest to jump straight into a risk assessment"
      >
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end">
          <Field
            label="State"
            icon={<Globe className="h-3 w-3" />}
            value={draft.state}
            onChange={setState}
            options={STATES.map((s) => s.name)}
          />
          <Field
            label="District"
            icon={<MapPin className="h-3 w-3" />}
            value={draft.district}
            onChange={(district) => setDraft((d) => ({ ...d, district }))}
            options={districts}
          />
          <Field
            label="Crop"
            icon={<Wheat className="h-3 w-3" />}
            value={draft.crop}
            onChange={setCrop}
            options={[...CROPS]}
          />
          <Field
            label="Pest"
            icon={<Bug className="h-3 w-3" />}
            value={draft.pest}
            onChange={(pest) => setDraft((d) => ({ ...d, pest }))}
            options={pests}
          />
          <button
            onClick={() => quickCheck(draft)}
            disabled={checking}
            className={`flex h-9.5 items-center justify-center gap-2 rounded-lg px-5 text-[13px] font-semibold text-white shadow-sm transition-all sm:col-span-2 lg:col-span-1 ${
              checking ? "cursor-wait bg-forest-700" : "bg-forest-800 hover:bg-forest-700 active:scale-[0.98]"
            }`}
          >
            {checking ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking…
              </>
            ) : (
              <>
                <Radar className="h-4 w-4" strokeWidth={2.1} />
                Check Pest Risk
              </>
            )}
          </button>
        </div>

        {/* selected crop / pest preview */}
        <div className="mt-4 flex flex-wrap items-center gap-5 border-t border-line-soft pt-4">
          <div className="flex items-center gap-2.5">
            <CropThumb crop={draft.crop} size="sm" />
            <span className="text-[12.5px] font-semibold text-ink">{draft.crop}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <PestThumb pest={draft.pest} size="sm" />
            <span className="text-[12.5px] font-semibold text-ink">{draft.pest}</span>
          </div>
        </div>

        {checking && (
          <p className="mt-3 flex items-center gap-2 text-[11.5px] font-medium text-forest-700">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            {checkingMessage}
          </p>
        )}
      </Card>

      {/* summary */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
        <SummaryStat icon={ShieldAlert} label="Active Alerts" value={String(analysis.activeAlerts)} tone="#c2410c" />
        <SummaryStat icon={AlertTriangle} label="High-Risk Areas" value={String(highRiskAreas)} tone="#b45309" />
        <SummaryStat
          icon={MapPin}
          label="Last Analysis"
          value={`${selection.district} · ${selection.crop} · ${selection.pest}`}
          tone="#1f6a48"
        />
      </div>
    </div>
  );
}
