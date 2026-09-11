import {
  BellRing,
  BrainCircuit,
  CalendarClock,
  LayoutDashboard,
  Map as MapIcon,
  MapPinned,
  Radar,
  Settings,
  Sprout,
  X,
} from "lucide-react";
import type { PageKey } from "../../types";
import { useApp } from "../../context/AppContext";

const NAV: { key: PageKey; label: string; icon: React.ElementType }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "location", label: "Location Selection", icon: MapPinned },
  { key: "prediction", label: "Risk Prediction", icon: Radar },
  { key: "forecast", label: "Forecast", icon: CalendarClock },
  { key: "xai", label: "Explainable AI", icon: BrainCircuit },
  { key: "map", label: "Risk Map", icon: MapIcon },
  { key: "alerts", label: "Alerts", icon: BellRing },
  { key: "settings", label: "Settings", icon: Settings },
];

function Logo({ compact }: { compact?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? "justify-center" : "px-1"}`}>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-forest-500 to-forest-700 shadow-[inset_0_1px_0_rgb(255_255_255/0.15)] ring-1 ring-white/15">
        <Sprout className="h-4.5 w-4.5 text-emerald-100" strokeWidth={2.2} />
      </div>
      {!compact && (
        <div className="min-w-0">
          <p className="truncate text-[14.5px] font-bold tracking-tight text-white">
            AgroShield <span className="text-emerald-300">AI</span>
          </p>
          <p className="truncate text-[9.5px] font-medium uppercase tracking-[0.14em] text-white/40">
            Data · Intelligence · Harvests
          </p>
        </div>
      )}
    </div>
  );
}

function NavItems({ compact }: { compact?: boolean }) {
  const { page, navigate, analysis } = useApp();
  return (
    <nav className="mt-5 flex flex-col gap-1">
      {!compact && (
        <p className="mb-1.5 px-3 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/35">
          Monitoring Console
        </p>
      )}
      {NAV.map((item) => {
        const active = page === item.key;
        const Icon = item.icon;
        return (
          <button
            key={item.key}
            onClick={() => navigate(item.key)}
            title={compact ? item.label : undefined}
            className={`group relative flex items-center gap-3 rounded-lg px-3 py-[9px] text-left text-[13px] transition-colors duration-150 ${
              compact ? "justify-center px-0" : ""
            } ${
              active
                ? "bg-white/[0.09] font-semibold text-white"
                : "font-medium text-white/55 hover:bg-white/[0.05] hover:text-white/90"
            }`}
          >
            {active && !compact && (
              <span className="absolute left-0 top-1/2 h-[18px] w-[3px] -translate-y-1/2 rounded-full bg-emerald-400" />
            )}
            <Icon
              className={`h-[17px] w-[17px] shrink-0 ${
                active ? "text-emerald-300" : "text-white/45 group-hover:text-white/75"
              }`}
              strokeWidth={active ? 2.2 : 1.9}
            />
            {!compact && <span className="flex-1 truncate">{item.label}</span>}
            {!compact && item.key === "alerts" && analysis.activeAlerts > 0 && (
              <span className="rounded-md bg-red-500/90 px-1.5 py-px text-[10px] font-bold tabular text-white">
                {analysis.activeAlerts}
              </span>
            )}
            {compact && item.key === "alerts" && analysis.activeAlerts > 0 && (
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-400" />
            )}
          </button>
        );
      })}
    </nav>
  );
}

function ModelStatus({ compact }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="mt-4 flex justify-center" title="Prediction Prototype">
        <span className="h-2 w-2 rounded-full bg-amber-400/80" />
      </div>
    );
  }
  return (
    <div className="mt-6 rounded-lg border border-white/[0.08] bg-white/[0.04] p-3">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
        <p className="text-[11px] font-semibold text-white/85">Prediction Prototype</p>
      </div>
      <p className="mt-1.5 text-[10.5px] leading-relaxed text-white/40">
        ML risk analysis · Explainability preview · demonstration data
      </p>
    </div>
  );
}

export default function Sidebar() {
  const { mobileNavOpen, setMobileNavOpen } = useApp();

  return (
    <>
      {/* desktop rail (tablet = icons, desktop = full) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[74px] flex-col border-r border-forest-950/60 bg-gradient-to-b from-forest-950 via-forest-900 to-forest-850 lg:flex xl:w-[236px]">
        <div className="dark-scroll flex h-full flex-col overflow-y-auto px-3.5 py-5 xl:px-4">
          <div className="xl:hidden">
            <Logo compact />
          </div>
          <div className="hidden xl:block">
            <Logo />
          </div>

          <div className="xl:hidden">
            <NavItems compact />
          </div>
          <div className="hidden xl:block">
            <NavItems />
          </div>

          <div className="mt-auto pt-6">
            <div className="xl:hidden">
              <ModelStatus compact />
            </div>
            <div className="hidden xl:block">
              <ModelStatus />
              <p className="mt-3 px-1 text-center text-[9.5px] leading-relaxed text-white/30">
                Early Warning System · Karnataka & Kerala
                <br />
                AgroShield AI · 2026
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${mobileNavOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileNavOpen}
      >
        <div
          className={`absolute inset-0 bg-forest-950/50 backdrop-blur-[2px] transition-opacity duration-200 ${
            mobileNavOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileNavOpen(false)}
        />
        <aside
          className={`absolute inset-y-0 left-0 flex w-[264px] flex-col bg-gradient-to-b from-forest-950 via-forest-900 to-forest-850 shadow-2xl transition-transform duration-250 ease-out ${
            mobileNavOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="dark-scroll flex h-full flex-col overflow-y-auto px-4 py-5">
            <div className="flex items-center justify-between">
              <Logo />
              <button
                onClick={() => setMobileNavOpen(false)}
                className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>
            <NavItems />
            <div className="mt-auto pt-6">
              <ModelStatus />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
