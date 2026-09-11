import { ArrowRight, Quote } from "lucide-react";
import { Card } from "../ui";
import { useApp } from "../../context/AppContext";

export default function ExplainabilityPanel() {
  const { analysis, navigate } = useApp();
  const max = Math.max(...analysis.factors.map((f) => f.weight));

  return (
    <Card
      title="Top Contributing Factors"
      subtitle="Top factors influencing the current risk score"
      className="flex h-full flex-col"
      bodyClassName="flex flex-1 flex-col"
      right={
        <span className="rounded-md bg-teal-soft px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-teal-accent">
          Explainable AI
        </span>
      }
    >
      <div className="flex flex-col gap-3">
        {analysis.factors.map((f, i) => (
          <div key={f.name} className="group">
            <div className="flex items-baseline justify-between gap-2">
              <p className="flex items-center gap-2 text-[12.5px] font-medium text-ink">
                <span className="w-3.5 text-[10px] font-bold tabular text-faint">{i + 1}</span>
                {f.name}
              </p>
              <p className="text-[11.5px] font-bold tabular text-subtle">
                {f.weight.toFixed(2)}
              </p>
            </div>
            <div className="ml-[22px] mt-1.5 h-2 overflow-hidden rounded-full bg-paper">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-accent to-[#14a397] transition-all duration-700"
                style={{ width: `${(f.weight / max) * 100}%`, opacity: 1 - i * 0.14 }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-teal-accent/15 bg-teal-soft/60 p-3.5">
        <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-teal-accent">
          <Quote className="h-3 w-3" />
          Why this prediction?
        </p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-ink">
          <span className="font-semibold">{analysis.factors[0].name}</span> and{" "}
          <span className="font-semibold">{analysis.factors[1].name.toLowerCase()}</span> are the
          strongest contributors to the current {analysis.level.toLowerCase()} risk of{" "}
          {analysis.base}% for {analysis.selection.pest} in {analysis.selection.district}.
        </p>
      </div>

      <button
        onClick={() => navigate("xai")}
        className="mt-auto flex items-center gap-1.5 pt-4 text-[11.5px] font-semibold text-forest-700 hover:text-forest-600"
      >
        Open full explanation
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </Card>
  );
}
