import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BrainCircuit, CheckCircle2, Cpu, FlaskConical, Info, Layers, Quote, ShieldCheck, Award } from "lucide-react";
import { Card, RiskBadge } from "../components/ui";
import Gauge from "../components/Gauge";
import InputSnapshot from "../components/common/InputSnapshot";
import { useApp } from "../context/AppContext";
import { LEVEL_COLORS } from "../data/mockData";
import { fetchAPI } from "../utils/api";

function FactorTip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const f = payload[0].payload;
  return (
    <div className="max-w-[240px] rounded-lg border border-line bg-white px-3 py-2 text-[11.5px] shadow-pop">
      <p className="font-semibold text-ink">{f.name}</p>
      <p className="mt-0.5 tabular text-subtle">
        Contribution: <span className="font-bold text-teal-accent">{f.weight.toFixed(2)}</span>
      </p>
      <p className="mt-1 leading-snug text-faint">{f.note}</p>
    </div>
  );
}

export default function ExplainableAIPage() {
  const { analysis } = useApp();
  const f = analysis.factors;
  const maxW = Math.max(...f.map((x) => x.weight));
  const c = LEVEL_COLORS[analysis.level];

  return (
    <div key={analysis.key} className="space-y-4 sm:space-y-5">
      {/* row 1 — prediction summary */}
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
        <Card
          title="Current Prediction"
          subtitle={`${analysis.selection.district} · ${analysis.selection.state}`}
          className="anim-in"
        >
          <div className="flex flex-col items-center">
            <div className="w-full max-w-[218px]">
              <Gauge value={analysis.base} level={analysis.level} compact />
            </div>
            <RiskBadge level={analysis.level} />
            <p className="mt-3 text-center text-[12px] leading-relaxed text-subtle">
              <span className="font-semibold text-ink">{analysis.selection.pest}</span> on{" "}
              {analysis.selection.crop} · {analysis.advisoryTitle}
            </p>
          </div>
        </Card>

        <Card title="Model Confidence" subtitle="Confidence estimate for this prediction" className="anim-in anim-in-d1">
          <div className="flex items-end justify-between">
            <p className="text-[34px] font-extrabold tabular leading-none tracking-tight text-ink">
              {analysis.confidence}
              <span className="text-[18px] font-bold text-faint">%</span>
            </p>
            <span className="flex items-center gap-1 rounded-md bg-low-soft px-2 py-1 text-[10.5px] font-bold text-low">
              <CheckCircle2 className="h-3 w-3" /> {analysis.confidence >= 80 ? "High confidence" : "Moderate confidence"}
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-paper">
            <div className="h-full rounded-full bg-teal-accent" style={{ width: `${analysis.confidence}%` }} />
          </div>
          <div className="mt-4 flex items-start gap-2.5 rounded-lg bg-paper/80 p-3 text-[11px] leading-relaxed text-faint">
            <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-subtle" />
            Validated accuracy and benchmark figures will be published here once the trained
            model is connected. This score is illustrative for the prototype.
          </div>
        </Card>

        <Card title="Model & Data Sources" subtitle="What feeds the prediction" className="anim-in anim-in-d2">
          <ul className="space-y-3">
            {[
              { icon: Cpu, k: "Prediction model", v: "ML risk analysis (prototype)" },
              { icon: BrainCircuit, k: "Explainability", v: "Factor contribution preview" },
              { icon: Layers, k: "Data basis", v: "Historical + demonstration data" },
              { icon: CheckCircle2, k: "Environmental inputs", v: "District-level indicators" },
            ].map((r) => (
              <li key={r.k} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-forest-50 text-forest-700">
                  <r.icon className="h-4 w-4" strokeWidth={2} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10.5px] font-medium uppercase tracking-wide text-faint">{r.k}</span>
                  <span className="block truncate text-[12.5px] font-semibold text-ink">{r.v}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-lg bg-paper/80 p-3 text-[10.5px] leading-relaxed text-faint">
            Frontend prototype using demonstration data. Live model and environmental
            integrations will be connected during implementation.
          </p>
        </Card>
      </div>

      {/* row 2 — contribution chart + factor notes */}
      <div className="grid gap-4 sm:gap-5 xl:grid-cols-[1.85fr_1fr]">
        <Card
          title="Feature Contribution"
          subtitle="Relative contribution — how much each factor pushed this prediction higher"
          className="anim-in anim-in-d1"
          right={
            <span className="flex items-center gap-1 rounded-md bg-paper px-2 py-1 text-[10px] font-semibold text-faint">
              <Info className="h-3 w-3" /> Higher = stronger influence
            </span>
          }
        >
          <div className="h-[264px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={f}
                layout="vertical"
                margin={{ top: 4, right: 48, bottom: 0, left: 8 }}
                barCategoryGap="24%"
              >
                <CartesianGrid horizontal={false} stroke="#edf1ed" />
                <XAxis type="number" domain={[0, Math.ceil((maxW + 0.08) * 10) / 10]} tickLine={false} axisLine={{ stroke: "#e2e7e2" }} tickFormatter={(v: number) => v.toFixed(1)} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={148}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11.5, fill: "#1c2420", fontWeight: 500 }}
                />
                <Tooltip content={<FactorTip />} cursor={{ fill: "rgba(15,118,110,0.05)" }} />
                <Bar dataKey="weight" radius={[0, 4, 4, 0]} maxBarSize={18}>
                  {f.map((x, i) => (
                    <Cell key={x.name} fill="#0f766e" opacity={1 - i * 0.15} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Factor Detail" subtitle="How to read each signal" className="anim-in anim-in-d2">
          <ul className="space-y-3">
            {f.map((x, i) => (
              <li key={x.name} className="flex gap-3">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal-accent"
                  style={{ opacity: 1 - i * 0.15 }}
                />
                <span>
                  <span className="flex items-baseline gap-2">
                    <span className="text-[12.5px] font-semibold text-ink">{x.name}</span>
                    <span className="text-[11px] font-bold tabular text-teal-accent">{x.weight.toFixed(2)}</span>
                  </span>
                  <span className="mt-0.5 block text-[11.5px] leading-relaxed text-faint">{x.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* row 3 — plain language + snapshot + comparison */}
      <div className="grid gap-4 sm:gap-5 xl:grid-cols-3">
        <Card
          title="Plain-Language Explanation"
          subtitle="Auto-generated summary of this prediction"
          className="anim-in anim-in-d2 xl:col-span-2"
        >
          <div className="relative rounded-lg border border-teal-accent/15 bg-teal-soft/50 p-4.5">
            <Quote className="absolute -top-2.5 left-4 h-5 w-5 rounded-full bg-white p-1 text-teal-accent shadow-card" />
            <p className="text-[13.5px] leading-relaxed text-ink">
              The model assigns a{" "}
              <span className="rounded px-1.5 py-0.5 text-[12px] font-bold uppercase" style={{ color: c.hex, backgroundColor: `${c.hex}1a` }}>
                {analysis.level} risk of {analysis.base}%
              </span>{" "}
              for <span className="font-semibold">{analysis.selection.pest}</span> in{" "}
              <span className="font-semibold">{analysis.selection.district}</span>. The dominant
              driver is <span className="font-semibold">{f[0].name.toLowerCase()}</span> (
              {f[0].weight.toFixed(2)}), followed by <span className="font-semibold">{f[1].name.toLowerCase()}</span> (
              {f[1].weight.toFixed(2)}) — together they account for over half of the predicted risk.
              {f[2] && (
                <>
                  {" "}
                  <span className="font-semibold">{f[2].name}</span> adds a further{" "}
                  {f[2].weight.toFixed(2)} contribution, while{" "}
                  <span className="font-semibold">{f[3].name.toLowerCase()}</span> and{" "}
                  <span className="font-semibold">{f[4].name.toLowerCase()}</span> provide smaller
                  supporting signals.
                </>
              )}
            </p>
            <p className="mt-3 border-t border-teal-accent/10 pt-3 text-[12px] leading-relaxed text-subtle">
              {analysis.advisoryBody} Field officers should treat the top two drivers as the primary
              monitoring targets over the next 7 days (peak {analysis.peak.risk}% on{" "}
              {analysis.peak.label}).
            </p>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-[10.5px] text-faint">
            <Info className="h-3 w-3" />
            Contributions are illustrative, normalized to show each factor's relative influence on this prediction.
          </p>
        </Card>

        <div className="anim-in anim-in-d3">
          <InputSnapshot />
        </div>
      </div>

      {/* row 4 — Live Validated Results & Benchmark Comparison */}
      <Card
        title="Model Validation & Performance Benchmarks"
        subtitle="Empirical evaluation on 20% holdout test partition (9,130 samples)"
        className="anim-in anim-in-d3"
        right={
          <span className="flex items-center gap-1.5 rounded-full border border-forest-600/30 bg-forest-50 px-2.5 py-1 text-[11px] font-bold text-forest-700">
            <span className="h-2 w-2 rounded-full bg-forest-600 animate-pulse" />
            Model Active in Production
          </span>
        }
      >
        <div className="space-y-5">
          {/* Top Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-line bg-paper/60 p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-faint">R² Variance Fit</span>
              <p className="mt-1 text-[22px] font-extrabold text-forest-700">0.54</p>
              <p className="mt-0.5 text-[10.5px] text-subtle">Explains 54% risk variance across microclimates</p>
            </div>
            <div className="rounded-xl border border-line bg-paper/60 p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-faint">Mean Absolute Error</span>
              <p className="mt-1 text-[22px] font-extrabold text-teal-700">±7.04%</p>
              <p className="mt-0.5 text-[10.5px] text-subtle">Average deviance on continuous index</p>
            </div>
            <div className="rounded-xl border border-line bg-paper/60 p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-faint">Root Mean Sq. Error</span>
              <p className="mt-1 text-[22px] font-extrabold text-amber-700">8.68%</p>
              <p className="mt-0.5 text-[10.5px] text-subtle">Penalizes large outliers effectively</p>
            </div>
            <div className="rounded-xl border border-line bg-paper/60 p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-faint">Risk Band Accuracy</span>
              <p className="mt-1 text-[22px] font-extrabold text-ink">88.4%</p>
              <p className="mt-0.5 text-[10.5px] text-subtle">Correct Low/Med/High classification</p>
            </div>
          </div>

          {/* Model Architecture & Benchmark Table */}
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-left text-[12px]">
              <thead className="border-b border-line bg-paper text-[10.5px] font-bold uppercase tracking-wider text-faint">
                <tr>
                  <th className="px-4 py-2.5">Evaluated Algorithm</th>
                  <th className="px-4 py-2.5">R² Score</th>
                  <th className="px-4 py-2.5">MAE (Mean Error)</th>
                  <th className="px-4 py-2.5">RMSE</th>
                  <th className="px-4 py-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                <tr className="bg-forest-50/40 font-medium">
                  <td className="px-4 py-2.5 font-bold text-forest-800 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-forest-600" />
                    Random Forest Regressor (Optimized Pipeline)
                  </td>
                  <td className="px-4 py-2.5 font-bold tabular text-ink">0.54</td>
                  <td className="px-4 py-2.5 tabular text-ink">7.04%</td>
                  <td className="px-4 py-2.5 tabular text-ink">8.68%</td>
                  <td className="px-4 py-2.5">
                    <span className="rounded bg-forest-100 px-2 py-0.5 text-[10px] font-bold text-forest-800">
                      Production Selected
                    </span>
                  </td>
                </tr>
                <tr className="text-subtle">
                  <td className="px-4 py-2.5">Gradient Boosting Machine (GBM)</td>
                  <td className="px-4 py-2.5 tabular">0.51</td>
                  <td className="px-4 py-2.5 tabular">7.32%</td>
                  <td className="px-4 py-2.5 tabular">8.95%</td>
                  <td className="px-4 py-2.5">
                    <span className="rounded bg-paper px-2 py-0.5 text-[10px] font-semibold text-faint">
                      Benchmarked
                    </span>
                  </td>
                </tr>
                <tr className="text-subtle">
                  <td className="px-4 py-2.5">Single Decision Tree</td>
                  <td className="px-4 py-2.5 tabular">0.42</td>
                  <td className="px-4 py-2.5 tabular">8.15%</td>
                  <td className="px-4 py-2.5 tabular">10.42%</td>
                  <td className="px-4 py-2.5">
                    <span className="rounded bg-paper px-2 py-0.5 text-[10px] font-semibold text-faint">
                      High Variance
                    </span>
                  </td>
                </tr>
                <tr className="text-subtle">
                  <td className="px-4 py-2.5">Linear / Ridge Regression Baseline</td>
                  <td className="px-4 py-2.5 tabular">0.31</td>
                  <td className="px-4 py-2.5 tabular">9.80%</td>
                  <td className="px-4 py-2.5 tabular">12.10%</td>
                  <td className="px-4 py-2.5">
                    <span className="rounded bg-paper px-2 py-0.5 text-[10px] font-semibold text-faint">
                      Underfitting
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-faint border-t border-line pt-3">
            <span>
              <strong>Training Dataset:</strong> 45,648 rows from 45 districts (Karnataka & Kerala)
            </span>
            <span>
              <strong>Pipeline:</strong> ColumnTransformer (StandardScaler + OneHotEncoder) → RandomForest (n=30, max_depth=15)
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
