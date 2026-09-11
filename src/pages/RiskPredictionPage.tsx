import { ArrowRight, CheckCircle2, Clock3, Cpu, Info, RefreshCw } from "lucide-react";
import { Card, Kicker, RiskBadge } from "../components/ui";
import InputSnapshot from "../components/common/InputSnapshot";
import { useApp } from "../context/AppContext";
import { LEVEL_COLORS, riskLevel } from "../data/mockData";
import type { RiskLevel } from "../types";

const HISTORY = [
  { when: "Today · 06:00", offset: 0 },
  { when: "Yesterday · 18:00", offset: 3 },
  { when: "Yesterday · 06:00", offset: 5 },
  { when: "2 days ago · 18:00", offset: 8 },
  { when: "3 days ago · 06:00", offset: 11 },
];

export default function RiskPredictionPage() {
  const { analysis, applySelection, selection, analyzing, navigate } = useApp();
  const probs: { level: RiskLevel; pct: number }[] = [
    { level: "Low", pct: analysis.classProbs.low },
    { level: "Medium", pct: analysis.classProbs.medium },
    { level: "High", pct: analysis.classProbs.high },
  ];

  return (
    <div key={analysis.key} className="grid gap-4 sm:gap-5 xl:grid-cols-[1.85fr_1fr]">
      {/* left column */}
      <div className="space-y-4 sm:space-y-5">
        <Card
          title="Prediction Result"
          subtitle={`${selection.crop} · ${selection.pest} · ${selection.district}, ${selection.state}`}
          className="anim-in"
          right={
            <button
              onClick={() => applySelection(selection)}
              disabled={analyzing}
              className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-[11.5px] font-semibold text-subtle transition-colors hover:border-forest-600/40 hover:text-forest-700"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${analyzing ? "animate-spin" : ""}`} />
              Re-run
            </button>
          }
        >
          <div className="flex flex-wrap items-center gap-3">
            <RiskBadge level={analysis.level} />
            <p className="text-[12.5px] text-subtle">{analysis.advisoryTitle}</p>
          </div>

          <div className="mt-5 space-y-4">
            {probs.map((p) => {
              const c = LEVEL_COLORS[p.level];
              const predicted = p.level === analysis.level;
              return (
                <div key={p.level}>
                  <div className="flex items-baseline justify-between">
                    <p className="flex items-center gap-2 text-[12.5px] font-semibold text-ink">
                      {p.level}
                      {predicted && (
                        <span className="rounded px-1.5 py-px text-[9.5px] font-bold uppercase tracking-wide" style={{ color: c.hex, backgroundColor: `${c.hex}14` }}>
                          Predicted
                        </span>
                      )}
                    </p>
                    <p className="text-[13px] font-bold tabular" style={{ color: predicted ? c.hex : "#8a968f" }}>
                      {p.pct}%
                    </p>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-paper">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${Math.max(2, p.pct)}%`, backgroundColor: predicted ? c.hex : "#c8d1c9" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-line-soft bg-paper/70 p-3.5">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-teal-accent" />
            <p className="text-[12px] leading-relaxed text-subtle">
              Class probabilities are illustrative for this prototype. The
              highest-probability class is used as the prediction; supporting evidence is available in the
              <button onClick={() => navigate("xai")} className="ml-1 inline-flex items-center gap-0.5 font-semibold text-forest-700 hover:text-forest-600">
                explanation view <ArrowRight className="h-3 w-3" />
              </button>
            </p>
          </div>
        </Card>

        <Card
          title="Recent Predictions"
          subtitle="Same context · sample scenario history"
          pad={false}
          className="anim-in anim-in-d1"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[540px]">
              <thead>
                <tr className="border-b border-line bg-paper/60">
                  {["Run", "Risk", "Level", "Confidence", "Status"].map((h) => (
                    <th key={h} className="px-5 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.09em] text-faint">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {HISTORY.map((h, i) => {
                  const r = Math.min(96, Math.max(12, analysis.base - h.offset + (i % 2 === 0 ? 1 : -1)));
                  const lv = riskLevel(r);
                  return (
                    <tr key={h.when} className="hover:bg-paper/60">
                      <td className="px-5 py-3 text-[12px] font-medium text-subtle">
                        <span className="flex items-center gap-2">
                          <Clock3 className="h-3.5 w-3.5 text-faint" /> {h.when}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-[12.5px] font-bold tabular" style={{ color: LEVEL_COLORS[lv].hex }}>
                        {r}%
                      </td>
                      <td className="px-5 py-3"><RiskBadge level={lv} size="sm" /></td>
                      <td className="px-5 py-3 text-[12px] tabular text-subtle">{Math.min(97, analysis.confidence - (i % 3))}%</td>
                      <td className="px-5 py-3">
                        <span className="flex items-center gap-1.5 text-[11.5px] font-semibold text-low">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* right column */}
      <div className="space-y-4 sm:space-y-5">
        <div className="anim-in anim-in-d1">
          <InputSnapshot />
        </div>

        <Card title="Model Information" subtitle="Prototype inference profile" className="anim-in anim-in-d2">
          <Kicker>Prototype</Kicker>
          <ul className="mt-2.5 space-y-2.5">
            {[
              ["Prediction model", "ML risk analysis (prototype)"],
              ["Explainability", "Factor contribution preview"],
              ["Data basis", "Demonstration scenario library"],
              ["Inputs considered", "24 environmental + historical features"],
            ].map(([k, v]) => (
              <li key={k} className="flex items-center justify-between text-[12px]">
                <span className="text-faint">{k}</span>
                <span className="font-semibold text-ink">{v}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2.5 rounded-lg bg-paper/80 p-3 text-[11px] leading-relaxed text-faint">
            <Cpu className="h-4 w-4 shrink-0 text-subtle" />
            Prototype analysis based on demonstration data. The trained model and live weather
            integration will be connected during implementation.
          </div>
        </Card>
      </div>
    </div>
  );
}
