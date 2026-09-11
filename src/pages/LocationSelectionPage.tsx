import { useMemo, useState } from "react";
import { ArrowRight, Bug, CheckCircle2, Globe, MapPin, Radar, Ruler, Satellite, Wheat } from "lucide-react";
import { Card, Field, RiskBadge } from "../components/ui";
import MapView from "../components/MapView";
import { useApp } from "../context/AppContext";
import { DISTRICT_META, STATES } from "../data/locations";
import { CROPS, CROP_PESTS } from "../data/cropPestMap";
import { getAnalysis, LEVEL_COLORS } from "../data/mockData";
import type { Selection } from "../types";

export default function LocationSelectionPage() {
  const { selection, applySelection, analyzing, navigate } = useApp();
  const [draft, setDraft] = useState<Selection>(selection);

  const districts = STATES.find((s) => s.name === draft.state)?.districts.map((d) => d.name) ?? [];
  const pests = CROP_PESTS[draft.crop] ?? [];
  const meta = DISTRICT_META[draft.district];

  const preview = useMemo(() => getAnalysis(draft), [draft]);

  const setState = (state: string) => {
    const first = STATES.find((s) => s.name === state)?.districts[0]?.name ?? "";
    setDraft((d) => ({ ...d, state, district: first }));
  };
  const setCrop = (crop: string) => {
    setDraft((d) => ({ ...d, crop, pest: (CROP_PESTS[crop] ?? [])[0] ?? "" }));
  };

  const isApplied =
    draft.state === selection.state &&
    draft.district === selection.district &&
    draft.crop === selection.crop &&
    draft.pest === selection.pest;

  return (
    <div className="grid gap-4 sm:gap-5 xl:grid-cols-[360px_1fr]">
      {/* left — form + district meta */}
      <div className="space-y-4 sm:space-y-5">
        <Card title="Analysis Context" subtitle="Select the region and target pest complex">
          <div className="space-y-3.5">
            <Field label="State" icon={<Globe className="h-3 w-3" />} value={draft.state} onChange={setState} options={STATES.map((s) => s.name)} />
            <Field label="District" icon={<MapPin className="h-3 w-3" />} value={draft.district} onChange={(district) => setDraft((d) => ({ ...d, district }))} options={districts} />
            <Field label="Crop" icon={<Wheat className="h-3 w-3" />} value={draft.crop} onChange={setCrop} options={[...CROPS]} />
            <Field label="Pest" icon={<Bug className="h-3 w-3" />} value={draft.pest} onChange={(pest) => setDraft((d) => ({ ...d, pest }))} options={pests} />

            {isApplied ? (
              <div className="flex items-center justify-between gap-2 rounded-lg border border-forest-600/25 bg-forest-50 px-3.5 py-2.5">
                <span className="flex items-center gap-2 text-[12px] font-semibold text-forest-700">
                  <CheckCircle2 className="h-4 w-4" /> Active context
                </span>
                <button
                  onClick={() => navigate("dashboard")}
                  className="flex items-center gap-1 text-[11.5px] font-semibold text-forest-700 hover:text-forest-600"
                >
                  Dashboard <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => applySelection(draft)}
                disabled={analyzing}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-forest-800 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-forest-700 active:scale-[0.99] disabled:cursor-wait"
              >
                <Radar className={`h-4 w-4 ${analyzing ? "animate-spin" : ""}`} />
                {analyzing ? "Applying…" : "Set as Analysis Context"}
              </button>
            )}
          </div>
        </Card>

        {meta && (
          <Card title="Environmental Data Coverage" subtitle={meta.zone}>
            <ul className="space-y-3">
              {[
                { icon: Satellite, k: "Data reference points", v: `${meta.stations} (prototype)` },
                { icon: Ruler, k: "Geographic area", v: meta.area },
                { icon: Wheat, k: "Major crops", v: meta.majorCrops.join(" · ") },
                { icon: CheckCircle2, k: "Last field survey", v: meta.lastSurvey },
              ].map((r) => (
                <li key={r.k} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-paper text-subtle">
                    <r.icon className="h-4 w-4" strokeWidth={1.9} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase tracking-wide text-faint">{r.k}</span>
                    <span className="block text-[12.5px] font-semibold text-ink">{r.v}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>

      {/* right — preview map + taluk table */}
      <div className="space-y-4 sm:space-y-5">
        <Card
          title="Coverage Preview"
          subtitle={`Monitored zones in ${draft.district} — preview for ${draft.crop} / ${draft.pest}`}
          right={
            <span className="flex items-center gap-2 rounded-md px-2 py-1 text-[11px] font-bold tabular" style={{ color: LEVEL_COLORS[preview.level].hex, backgroundColor: `${LEVEL_COLORS[preview.level].hex}14` }}>
              {preview.base}% <RiskBadge level={preview.level} size="sm" />
            </span>
          }
          pad={false}
          bodyClassName="p-3"
        >
          <div key={preview.key}>
            <MapView
              areas={preview.areas}
              contextAreas={preview.contextAreas}
              centroid={preview.centroid}
              className="h-[300px] sm:h-[360px]"
            />
          </div>
        </Card>

        <Card title="Zone-Level Risk" subtitle="Taluk ranking for the selected context" pad={false}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px]">
              <thead>
                <tr className="border-b border-line bg-paper/60">
                  {["Zone", "Risk", "Level", "7-Day Peak"].map((h) => (
                    <th key={h} className="px-5 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.09em] text-faint">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {[...preview.areas]
                  .sort((a, b) => b.risk - a.risk)
                  .map((a) => {
                    const c = LEVEL_COLORS[a.level];
                    return (
                      <tr key={a.name} className="hover:bg-paper/60">
                        <td className="px-5 py-2.5 text-[12.5px] font-semibold text-ink">{a.name}</td>
                        <td className="px-5 py-2.5">
                          <div className="flex items-center gap-2.5">
                            <span className="w-8 text-[12.5px] font-bold tabular" style={{ color: c.hex }}>{a.risk}%</span>
                            <span className="h-1.5 w-24 overflow-hidden rounded-full bg-paper">
                              <span className="block h-full rounded-full" style={{ width: `${a.risk}%`, backgroundColor: c.hex }} />
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-2.5"><RiskBadge level={a.level} size="sm" /></td>
                        <td className="px-5 py-2.5 text-[12px] tabular text-subtle">
                          {Math.min(96, a.risk + 4)}%
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
