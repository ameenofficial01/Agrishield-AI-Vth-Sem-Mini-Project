import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CloudRain, Minus, Thermometer, TrendingDown, TrendingUp, Droplets } from "lucide-react";
import { Card, RiskBadge } from "../components/ui";
import { useApp } from "../context/AppContext";
import { LEVEL_COLORS, riskLevel } from "../data/mockData";

type HorizonKey = "d7" | "d14" | "d30";
const HORIZONS: { key: HorizonKey; label: string }[] = [
  { key: "d7", label: "7 Days" },
  { key: "d14", label: "14 Days" },
  { key: "d30", label: "30 Days" },
];

function RiskTip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-lg border border-line bg-white px-3 py-2 text-[11.5px] shadow-pop">
      <p className="font-semibold text-ink">{p.full ?? p.label}</p>
      <p className="mt-0.5 tabular text-subtle">
        Predicted risk: <span className="font-bold text-ink">{p.risk}%</span>
      </p>
    </div>
  );
}

function EnvTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-line bg-white px-3 py-2 text-[11.5px] shadow-pop">
      <p className="font-semibold text-ink">{label}</p>
      {payload.map((e: any) => (
        <p key={e.dataKey} className="mt-0.5 flex items-center gap-1.5 tabular text-subtle">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: e.stroke ?? e.fill }} />
          {e.name}: <span className="font-bold text-ink">{e.value}{e.unit}</span>
        </p>
      ))}
    </div>
  );
}

function StatCard({ label, value, sub, icon, accent }: { label: string; value: string; sub: string; icon: React.ReactNode; accent?: string }) {
  return (
    <div className="rounded-xl border border-line bg-white px-4.5 py-4 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-faint">{label}</p>
        <span style={{ color: accent ?? "#5d6b63" }}>{icon}</span>
      </div>
      <p className="mt-1.5 text-[24px] font-extrabold tabular leading-none tracking-tight text-ink">{value}</p>
      <p className="mt-1.5 text-[11px] text-faint">{sub}</p>
    </div>
  );
}

export default function ForecastPage() {
  const { analysis, actionThreshold } = useApp();
  const [horizon, setHorizon] = useState<HorizonKey>("d7");
  const data = analysis.forecast[horizon];
  const lineHex = LEVEL_COLORS[analysis.level].hex;

  const stats = useMemo(() => {
    const peak = Math.max(...data.map((p) => p.risk));
    const above = data.filter((p) => p.risk >= actionThreshold).length;
    const avg = Math.round(data.reduce((s, p) => s + p.risk, 0) / data.length);
    const delta = data[data.length - 1].risk - data[0].risk;
    return { peak, above, avg, delta };
  }, [data, actionThreshold]);

  const TrendIcon = stats.delta >= 4 ? TrendingUp : stats.delta <= -4 ? TrendingDown : Minus;
  const trendColor = stats.delta >= 4 ? "#c2410c" : stats.delta <= -4 ? "#15803d" : "#5d6b63";
  const trendText = stats.delta >= 4 ? "Rising" : stats.delta <= -4 ? "Easing" : "Stable";

  const projRows = [
    { label: "Today (observed)", value: analysis.base },
    { label: "Next 7 days — mean", value: Math.round(analysis.forecast.d7.reduce((s, p) => s + p.risk, 0) / 7) },
    { label: "Next 14 days — mean", value: Math.round(analysis.forecast.d14.reduce((s, p) => s + p.risk, 0) / 14) },
    { label: "Next 30 days — mean", value: Math.round(analysis.forecast.d30.reduce((s, p) => s + p.risk, 0) / 30) },
    { label: `Peak (${analysis.peak.label})`, value: analysis.peak.risk },
  ];

  return (
    <div key={analysis.key} className="space-y-4 sm:space-y-5">
      {/* summary strip */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <StatCard
          label="Current Risk"
          value={`${analysis.base}%`}
          sub={`${analysis.selection.pest} · ${analysis.selection.district}`}
          icon={<RiskBadge level={analysis.level} size="sm" />}
        />
        <StatCard
          label="Projected Peak"
          value={`${stats.peak}%`}
          sub={`Within selected horizon`}
          icon={<TrendingUp className="h-4 w-4" />}
          accent="#c2410c"
        />
        <StatCard
          label="Days Above Threshold"
          value={`${stats.above}`}
          sub={`≥ ${actionThreshold}% action threshold`}
          icon={<CloudRain className="h-4 w-4" />}
        />
        <StatCard
          label="Trend"
          value={trendText}
          sub={`${stats.delta >= 0 ? "+" : ""}${stats.delta} pts across horizon`}
          icon={<TrendIcon className="h-4 w-4" style={{ color: trendColor }} />}
          accent={trendColor}
        />
      </div>

      {/* main trend */}
      <Card
        title="Risk Projection"
        subtitle={`${analysis.selection.crop} · ${analysis.selection.pest} · ${analysis.selection.district}`}
        right={
          <div className="flex rounded-lg border border-line bg-paper p-0.5">
            {HORIZONS.map((h) => (
              <button
                key={h.key}
                onClick={() => setHorizon(h.key)}
                className={`rounded-md px-3 py-1.5 text-[11.5px] font-semibold transition-colors ${
                  horizon === h.key ? "bg-white text-ink shadow-card" : "text-faint hover:text-subtle"
                }`}
              >
                {h.label}
              </button>
            ))}
          </div>
        }
      >
        <div className="h-[290px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 14 }}>
              <defs>
                <linearGradient id="fxFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={lineHex} stopOpacity={0.22} />
                  <stop offset="100%" stopColor={lineHex} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#edf1ed" />
              <XAxis dataKey="label" tickLine={false} axisLine={{ stroke: "#e2e7e2" }} dy={6} interval={horizon === "d30" ? 4 : horizon === "d14" ? 1 : 0} />
              <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}%`} width={42} />
              <Tooltip content={<RiskTip />} />
              <ReferenceLine
                y={actionThreshold}
                stroke="#d97706"
                strokeDasharray="5 4"
                strokeWidth={1.2}
                label={{ value: `Action threshold ${actionThreshold}%`, position: "insideTopRight", fontSize: 10, fill: "#b45309", fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="risk"
                stroke={lineHex}
                strokeWidth={2.4}
                fill="url(#fxFill)"
                dot={horizon === "d7" ? { r: 3, fill: "#fff", stroke: lineHex, strokeWidth: 1.6 } : false}
                activeDot={{ r: 4.5, fill: lineHex, stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* environment + comparison */}
      <div className="grid gap-4 sm:gap-5 xl:grid-cols-3">
        <Card
          title="Environmental Drivers"
          subtitle="Demonstration data · last 14 days"
          className="xl:col-span-2"
          right={
            <span className="flex items-center gap-3 text-[10.5px] font-semibold text-faint">
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-4 rounded-full bg-teal-accent" /> Humidity</span>
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-4 rounded-full bg-[#d97706]" /> Temp</span>
            </span>
          }
        >
          <div className="h-[210px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analysis.env} margin={{ top: 6, right: 4, bottom: 0, left: 14 }}>
                <CartesianGrid vertical={false} stroke="#edf1ed" />
                <XAxis dataKey="label" tickLine={false} axisLine={{ stroke: "#e2e7e2" }} dy={6} interval={1} />
                <YAxis yAxisId="h" domain={[40, 100]} tickLine={false} axisLine={false} width={38} tickFormatter={(v: number) => `${v}%`} />
                <YAxis yAxisId="t" orientation="right" domain={[18, 36]} tickLine={false} axisLine={false} width={34} tickFormatter={(v: number) => `${v}°`} />
                <Tooltip content={<EnvTip />} />
                <Line yAxisId="h" type="monotone" dataKey="humidity" name="Humidity" unit="%" stroke="#0f766e" strokeWidth={2} dot={false} />
                <Line yAxisId="t" type="monotone" dataKey="temp" name="Temp" unit="°C" stroke="#d97706" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Current vs Projected" subtitle="Mean risk by horizon">
          <div className="flex flex-col gap-3.5">
            {projRows.map((r) => {
              const lv = riskLevel(r.value);
              const c = LEVEL_COLORS[lv];
              return (
                <div key={r.label}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-[11.5px] font-medium text-subtle">{r.label}</p>
                    <p className="text-[12.5px] font-bold tabular" style={{ color: c.hex }}>
                      {r.value}%
                    </p>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-paper">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${r.value}%`, backgroundColor: c.hex, opacity: 0.85 }} />
                  </div>
                </div>
              );
            })}
            <p className="mt-1 border-t border-line-soft pt-3 text-[10.5px] leading-relaxed text-faint">
              Generated {analysis.generatedAt} IST · prototype analysis using demonstration data.
            </p>
          </div>
        </Card>
      </div>

      {/* rainfall */}
      <Card
        title="Rainfall Trend"
        subtitle="Daily rainfall · demonstration data · last 14 days"
        right={
          <span className="flex items-center gap-1.5 text-[10.5px] font-semibold text-faint">
            <Droplets className="h-3.5 w-3.5" /> mm
          </span>
        }
      >
        <div className="h-[170px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analysis.env} margin={{ top: 4, right: 10, bottom: 0, left: 6 }} barCategoryGap="28%">
              <CartesianGrid vertical={false} stroke="#edf1ed" />
              <XAxis dataKey="label" tickLine={false} axisLine={{ stroke: "#e2e7e2" }} dy={6} interval={1} />
              <YAxis tickLine={false} axisLine={false} width={40} tickFormatter={(v: number) => `${v}`} />
              <Tooltip content={<EnvTip />} cursor={{ fill: "rgba(15,118,110,0.05)" }} />
              <Bar dataKey="rainfall" name="Rainfall" unit=" mm" fill="#54748c" radius={[3, 3, 0, 0]} maxBarSize={26} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-[10.5px] text-faint">
          <Thermometer className="h-3 w-3" />
          Wet-canopy hours and cumulative moisture directly feed the pest-development model.
        </p>
      </Card>
    </div>
  );
}
