import { useMemo, useState } from "react";
import { Bug, Globe, Layers, Wheat } from "lucide-react";
import { Card, Field, ProtoBadge, RiskBadge } from "../components/ui";
import MapView from "../components/MapView";
import { useApp } from "../context/AppContext";
import { STATES } from "../data/locations";
import { CROPS, CROP_PESTS } from "../data/cropPestMap";
import { getAnalysis, LEVEL_COLORS, riskLevel } from "../data/mockData";
import type { AreaRisk, Horizon } from "../types";

const HORIZON_OPTS: { key: Horizon; label: string }[] = [
  { key: "current", label: "Current" },
  { key: "7d", label: "7 Days" },
  { key: "14d", label: "14 Days" },
  { key: "30d", label: "30 Days" },
];

export default function RiskMapPage() {
  const { selection } = useApp();
  const [state, setState] = useState(selection.state);
  const [district, setDistrict] = useState(selection.district);
  const [crop, setCrop] = useState(selection.crop);
  const [pest, setPest] = useState(selection.pest);
  const [horizon, setHorizon] = useState<Horizon>("current");

  const districts = STATES.find((s) => s.name === state)?.districts ?? [];
  const pests = CROP_PESTS[crop] ?? [];

  const setStateSafe = (s: string) => {
    setState(s);
    setDistrict(STATES.find((x) => x.name === s)?.districts[0]?.name ?? "");
  };
  const setCropSafe = (c: string) => {
    setCrop(c);
    setPest((CROP_PESTS[c] ?? [])[0] ?? "");
  };

  const analysis = useMemo(
    () => getAnalysis({ state, district, crop, pest }),
    [state, district, crop, pest]
  );

  const horizonBase =
    horizon === "current"
      ? analysis.base
      : Math.max(
          ...analysis.forecast[horizon === "7d" ? "d7" : horizon === "14d" ? "d14" : "d30"].map(
            (p) => p.risk
          )
        );
  const scale = horizonBase / Math.max(1, analysis.base);
  const areas: AreaRisk[] = analysis.areas.map((a) => ({
    ...a,
    risk: Math.min(96, Math.round(a.risk * scale)),
    level: riskLevel(Math.min(96, Math.round(a.risk * scale))),
  }));
  const ctxAreas: AreaRisk[] = analysis.contextAreas.map((a) => ({
    ...a,
    risk: Math.min(96, Math.round(a.risk * scale)),
    level: riskLevel(Math.min(96, Math.round(a.risk * scale))),
  }));

  const level = riskLevel(horizonBase);
  const c = LEVEL_COLORS[level];
  const hot = [...areas].sort((a, b) => b.risk - a.risk)[0];

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* filter bar */}
      <div className="rounded-xl border border-line bg-white p-4 shadow-card sm:px-5">
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
          <Field label="State" icon={<Globe className="h-3 w-3" />} value={state} onChange={setStateSafe} options={STATES.map((s) => s.name)} />
          <Field label="Crop" icon={<Wheat className="h-3 w-3" />} value={crop} onChange={setCropSafe} options={[...CROPS]} />
          <Field label="Pest" icon={<Bug className="h-3 w-3" />} value={pest} onChange={setPest} options={pests} />
          <div>
            <span className="mb-1.5 flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-faint">
              <Layers className="h-3 w-3" />
              Forecast horizon
            </span>
            <div className="flex rounded-lg border border-line bg-paper p-0.5">
              {HORIZON_OPTS.map((h) => (
                <button
                  key={h.key}
                  onClick={() => setHorizon(h.key)}
                  className={`whitespace-nowrap rounded-md px-3 py-1.5 text-[11.5px] font-semibold transition-colors ${
                    horizon === h.key ? "bg-white text-ink shadow-card" : "text-faint hover:text-subtle"
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-5 xl:grid-cols-[1fr_318px]">
        {/* map */}
        <Card
          title={`${district} District`}
          subtitle={`${crop} · ${pest} · ${HORIZON_OPTS.find((h) => h.key === horizon)?.label} horizon`}
          pad={false}
          right={<ProtoBadge />}
          bodyClassName="p-3"
        >
          <div key={analysis.key + horizon} className="anim-in">
            <MapView
              areas={areas}
              contextAreas={ctxAreas}
              centroid={analysis.centroid}
              interactive
              className="h-[440px] sm:h-[560px]"
              onAreaClick={(a) => {
                if (districts.some((d) => d.name === a.name)) setDistrict(a.name);
              }}
              overlay={
                <div className="rounded-lg border border-line bg-white/92 px-3 py-2 shadow-card backdrop-blur-sm">
                  <p className="flex items-center gap-2 text-[12px] font-bold text-ink">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.hex }} />
                    {district} — {horizonBase}%
                  </p>
                  <p className="mt-0.5 text-[10.5px] font-medium text-faint">
                    {level} risk · click a neighbouring district to switch
                  </p>
                </div>
              }
            />
          </div>
        </Card>

        {/* side panel */}
        <Card title="Selected District" subtitle="Risk summary" bodyClassName="pt-2">
          <div className="mb-4">
            <Field
              label="District"
              value={district}
              onChange={setDistrict}
              options={districts.map((d) => d.name)}
            />
          </div>

          <div className="rounded-lg border border-line-soft bg-paper/70 p-4">
            <div className="flex items-start justify-between">
              <p className="text-[34px] font-extrabold tabular leading-none tracking-tight" style={{ color: c.hex }}>
                {horizonBase}
                <span className="text-[17px] font-bold text-faint">%</span>
              </p>
              <RiskBadge level={level} />
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${horizonBase}%`, backgroundColor: c.hex }} />
            </div>
          </div>

          <dl className="mt-4 space-y-3">
            {[
              ["Pest", pest],
              ["Crop", crop],
              ["Top driver", analysis.factors[0].name],
              ["Data window", "Last 30 days"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between border-b border-line-soft pb-2.5 text-[12px]">
                <dt className="text-faint">{k}</dt>
                <dd className="font-semibold text-ink">{v}</dd>
              </div>
            ))}
            <div className="flex items-center justify-between pb-1 text-[12px]">
              <dt className="text-faint">7-day outlook</dt>
              <dd><RiskBadge level={analysis.outlookLevel} size="sm" /></dd>
            </div>
          </dl>

          {hot && (
            <div className="mt-4 rounded-lg border border-line bg-white p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-faint">Highest-risk zone</p>
              <p className="mt-1 flex items-center justify-between text-[12.5px] font-semibold text-ink">
                {hot.name}
                <span className="tabular" style={{ color: LEVEL_COLORS[hot.level].hex }}>{hot.risk}%</span>
              </p>
            </div>
          )}

          <div className="mt-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-faint">
              District ranking — {crop} / {pest}
            </p>
            <ul className="space-y-2">
              {[district, ...ctxAreas.map((a) => a.name)]
                .map((name) => {
                  const a = name === district
                    ? { name, risk: horizonBase }
                    : ctxAreas.find((x) => x.name === name)!;
                  return a;
                })
                .sort((a, b) => b.risk - a.risk)
                .map((a) => {
                  const lv = LEVEL_COLORS[riskLevel(a.risk)];
                  return (
                    <li key={a.name} className="flex items-center gap-2.5 text-[11.5px]">
                      <span className={`w-24 truncate font-medium ${a.name === district ? "text-ink" : "text-faint"}`}>
                        {a.name}
                      </span>
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper">
                        <span className="block h-full rounded-full" style={{ width: `${a.risk}%`, backgroundColor: lv.hex, opacity: a.name === district ? 1 : 0.55 }} />
                      </span>
                      <span className="w-8 text-right font-bold tabular text-subtle">{a.risk}%</span>
                    </li>
                  );
                })}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
