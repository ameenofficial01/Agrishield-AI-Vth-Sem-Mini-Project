import { useMemo, useState } from "react";
import { Check, Download, MapPin } from "lucide-react";
import { Card } from "../components/ui";
import { useApp } from "../context/AppContext";
import { LEVEL_COLORS } from "../data/mockData";
import type { AlertStatus } from "../types";

const FILTERS: ("All" | AlertStatus)[] = ["All", "Active", "Monitoring", "Resolved"];

function StatusBadge({ status }: { status: AlertStatus }) {
  if (status === "Active")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-high-soft px-2 py-1 text-[10.5px] font-bold text-high">
        <span className="live-dot h-1.5 w-1.5 rounded-full bg-high" />
        Active
      </span>
    );
  if (status === "Monitoring")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-med-soft px-2 py-1 text-[10.5px] font-bold text-med">
        <span className="h-1.5 w-1.5 rounded-full bg-med" />
        Monitoring
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-paper px-2 py-1 text-[10.5px] font-bold text-subtle ring-1 ring-line">
      <Check className="h-3 w-3 text-low" />
      Resolved
    </span>
  );
}

export default function AlertsPage() {
  const { analysis } = useApp();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [acked, setAcked] = useState<Set<string>>(new Set());

  const counts = useMemo(
    () => ({
      Active: analysis.alerts.filter((a) => a.status === "Active").length,
      Monitoring: analysis.alerts.filter((a) => a.status === "Monitoring").length,
      Resolved: analysis.alerts.filter((a) => a.status === "Resolved").length,
    }),
    [analysis]
  );

  const rows = analysis.alerts.filter((a) => filter === "All" || a.status === filter);

  return (
    <div key={analysis.key} className="space-y-4 sm:space-y-5">
      {/* summary + filters */}
      <div className="flex flex-wrap items-center gap-2.5">
        {(["Active", "Monitoring", "Resolved"] as const).map((s) => (
          <span key={s} className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-[11.5px] font-semibold text-subtle shadow-card">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: s === "Active" ? "#c2410c" : s === "Monitoring" ? "#b45309" : "#8a968f" }}
            />
            {s}
            <span className="rounded bg-paper px-1.5 py-px text-[11px] font-bold tabular text-ink">{counts[s]}</span>
          </span>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <div className="flex rounded-lg border border-line bg-white p-0.5 shadow-card">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1.5 text-[11.5px] font-semibold transition-colors ${
                  filter === f ? "bg-forest-800 text-white" : "text-faint hover:text-subtle"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="hidden items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2 text-[11.5px] font-semibold text-subtle shadow-card transition-colors hover:text-ink sm:flex">
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* table */}
      <Card pad={false} className="anim-in overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left">
            <thead>
              <tr className="border-b border-line bg-paper/60">
                {["Region", "Crop", "Pest", "Risk", "Forecast Window", "Status", "Top Driver", "Updated", ""].map((h) => (
                  <th key={h} className="whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-[0.09em] text-faint">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {rows.map((a) => {
                const c = LEVEL_COLORS[a.level];
                const isAcked = acked.has(a.id);
                return (
                  <tr
                    key={a.id}
                    className={`transition-colors hover:bg-paper/60 ${isAcked ? "opacity-55" : ""} ${
                      a.current ? "bg-forest-50/50" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1.5 text-[12.5px] font-semibold text-ink">
                        <MapPin className="h-3.5 w-3.5 text-faint" />
                        {a.region}
                        {a.current && (
                          <span className="ml-1 rounded bg-forest-800 px-1.5 py-px text-[9px] font-bold uppercase tracking-wide text-emerald-200">
                            Context
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block pl-5 text-[10.5px] text-faint">{a.state}</span>
                    </td>
                    <td className="px-4 py-3 text-[12px] font-medium text-subtle">{a.crop}</td>
                    <td className="px-4 py-3 text-[12px] font-medium text-subtle">{a.pest}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 text-[13px] font-bold tabular" style={{ color: c.hex }}>
                          {a.risk}%
                        </span>
                        <span className="h-1.5 w-16 overflow-hidden rounded-full bg-paper">
                          <span className="block h-full rounded-full" style={{ width: `${a.risk}%`, backgroundColor: c.hex }} />
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-subtle">{a.window}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={isAcked ? "Monitoring" : a.status} />
                    </td>
                    <td className="px-4 py-3 text-[12px] text-subtle">{a.driver}</td>
                    <td className="px-4 py-3 text-[11px] text-faint">{a.updated}</td>
                    <td className="px-4 py-3 text-right">
                      {a.status !== "Resolved" && !isAcked ? (
                        <button
                          onClick={() => setAcked((s) => new Set(s).add(a.id))}
                          className="rounded-lg border border-line px-2.5 py-1.5 text-[10.5px] font-semibold text-subtle transition-colors hover:border-forest-600/40 hover:bg-forest-50 hover:text-forest-700"
                        >
                          Acknowledge
                        </button>
                      ) : (
                        <span className="text-[10.5px] font-semibold text-faint">
                          {isAcked ? "Acknowledged" : "—"}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-[12px] text-faint">
                    No alerts match this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-[10.5px] text-faint">
          <span>{rows.length} alert{rows.length === 1 ? "" : "s"} shown · auto-escalates when risk crosses the action threshold</span>
          <span className="hidden sm:block">Generated from prototype risk assessment</span>
        </div>
      </Card>
    </div>
  );
}
