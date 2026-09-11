import { BellRing, BrainCircuit, Gauge as GaugeIcon, TrendingUp } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { LEVEL_COLORS } from "../../data/mockData";

function KpiCard({
  icon,
  label,
  value,
  suffix = "%",
  badge,
  bar,
  foot,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  suffix?: string;
  badge?: React.ReactNode;
  bar?: { pct: number; hex: string };
  foot?: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-white px-4.5 py-4 shadow-card">
      <div className="flex items-center justify-between">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-50 text-forest-700">
          {icon}
        </span>
        {badge}
      </div>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.09em] text-faint">{label}</p>
      <p className="mt-0.5 text-[26px] font-extrabold tabular leading-none tracking-tight text-ink">
        {value}
        {suffix && <span className="text-[15px] font-bold text-faint">{suffix}</span>}
      </p>
      {bar && (
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-paper">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${bar.pct}%`, backgroundColor: bar.hex }}
          />
        </div>
      )}
      {foot && <p className="mt-2 text-[10.5px] text-faint">{foot}</p>}
    </div>
  );
}

function LevelPill({ level }: { level: "Low" | "Medium" | "High" }) {
  const c = LEVEL_COLORS[level];
  return (
    <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${c.soft} ${c.text}`}>
      {level}
    </span>
  );
}

export default function KpiRow() {
  const { analysis } = useApp();
  const highActive = analysis.alerts.filter((a) => a.status === "Active").length;

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      <KpiCard
        icon={<GaugeIcon className="h-4 w-4" strokeWidth={2} />}
        label="Current Risk"
        value={analysis.base}
        badge={<LevelPill level={analysis.level} />}
        foot={`${analysis.selection.pest} · ${analysis.selection.district}`}
      />
      <KpiCard
        icon={<TrendingUp className="h-4 w-4" strokeWidth={2} />}
        label="7-Day Outlook"
        value={analysis.outlook7}
        badge={<LevelPill level={analysis.outlookLevel} />}
        foot={`Peak ${analysis.peak.risk}% on ${analysis.peak.label}`}
      />
      <KpiCard
        icon={<BrainCircuit className="h-4 w-4" strokeWidth={2} />}
        label="Model Confidence"
        value={analysis.confidence}
        bar={{ pct: analysis.confidence, hex: "#0f766e" }}
        foot={analysis.confidence >= 80 ? "High confidence" : "Moderate confidence"}
      />
      <KpiCard
        icon={<BellRing className="h-4 w-4" strokeWidth={2} />}
        label="Active Alerts"
        value={analysis.activeAlerts}
        suffix=""
        badge={
          <span className="rounded-md bg-high-soft px-1.5 py-0.5 text-[10px] font-bold text-high">
            {highActive} high
          </span>
        }
        foot="Early warnings in force"
      />
    </div>
  );
}
