import { Eye, Scissors, ShieldCheck, Users } from "lucide-react";
import { Card, Kicker } from "../ui";
import { RECOMMENDATIONS } from "../../data/mockData";

const ICONS: Record<string, React.ElementType> = {
  monitor: Eye,
  shield: ShieldCheck,
  remove: Scissors,
  consult: Users,
};

export default function RecommendedActions() {
  return (
    <Card pad={false} className="anim-in-d3">
      <div className="border-b border-line-soft px-5 pb-3 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <Kicker>Integrated Pest Management</Kicker>
            <h3 className="mt-1 text-[13.5px] font-semibold tracking-tight text-ink">
              Recommended Actions
            </h3>
          </div>
          <p className="hidden text-[11px] text-faint sm:block">
            Field-verification first · No chemical dosage is prescribed by the system
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 divide-y divide-line-soft sm:grid-cols-2 sm:divide-y-0 xl:grid-cols-4">
        {RECOMMENDATIONS.map((r, i) => {
          const Icon = ICONS[r.icon];
          const borders = [
            "",
            "sm:border-l sm:border-line-soft",
            "sm:border-t sm:border-line-soft xl:border-l xl:border-t-0",
            "sm:border-l sm:border-t sm:border-line-soft xl:border-t-0",
          ][i];
          return (
            <div key={r.title} className={`flex items-start gap-3.5 px-5 py-4 ${borders}`}>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-forest-50 text-forest-700 ring-1 ring-forest-100">
                <Icon className="h-4 w-4" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <p className="text-[12.5px] font-semibold leading-snug text-ink">{r.title}</p>
                <p className="mt-1 text-[11.5px] leading-relaxed text-faint">{r.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
