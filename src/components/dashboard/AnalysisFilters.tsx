import { useEffect, useState } from "react";
import { Bug, Globe, Loader2, MapPin, Radar, Wheat } from "lucide-react";
import { Field } from "../ui";
import { STATES } from "../../data/locations";
import { CROPS, CROP_PESTS } from "../../data/cropPestMap";
import { useApp } from "../../context/AppContext";
import type { Selection } from "../../types";

export default function AnalysisFilters() {
  const { selection, applySelection, analyzing } = useApp();
  const [draft, setDraft] = useState<Selection>(selection);

  useEffect(() => setDraft(selection), [selection]);

  const districts =
    STATES.find((s) => s.name === draft.state)?.districts.map((d) => d.name) ?? [];
  const pests = CROP_PESTS[draft.crop] ?? [];

  const setState = (state: string) => {
    const first = STATES.find((s) => s.name === state)?.districts[0]?.name ?? "";
    setDraft((d) => ({ ...d, state, district: first }));
  };
  const setCrop = (crop: string) => {
    const first = (CROP_PESTS[crop] ?? [])[0] ?? "";
    setDraft((d) => ({ ...d, crop, pest: first }));
  };

  const dirty =
    draft.state !== selection.state ||
    draft.district !== selection.district ||
    draft.crop !== selection.crop ||
    draft.pest !== selection.pest;

  return (
    <div className="rounded-xl border border-line bg-white p-4 shadow-card sm:px-5">
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
          onClick={() => applySelection(draft)}
          disabled={analyzing}
          className={`relative flex h-9.5 items-center justify-center gap-2 rounded-lg px-5 text-[13px] font-semibold text-white shadow-sm transition-all sm:col-span-2 lg:col-span-1 ${
            analyzing
              ? "cursor-wait bg-forest-700"
              : "bg-forest-800 hover:bg-forest-700 active:scale-[0.98]"
          }`}
        >
          {analyzing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing…
            </>
          ) : (
            <>
              <Radar className="h-4 w-4" strokeWidth={2.1} />
              Analyze
              {dirty && <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-emerald-300" />}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
