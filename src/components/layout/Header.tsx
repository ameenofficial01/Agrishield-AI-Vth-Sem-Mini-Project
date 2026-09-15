import { useEffect, useRef, useState } from "react";
import { Bell, ChevronRight, LogOut, Menu } from "lucide-react";
import { useApp } from "../../context/AppContext";
import type { PageKey } from "../../types";
import { LEVEL_COLORS } from "../../data/mockData";

export const PAGE_META: Record<PageKey, { title: string; subtitle: string }> = {
  home: {
    title: "Home",
    subtitle: "Monitor pest risk, review forecasts, and identify areas that need attention",
  },
  dashboard: {
    title: "Risk Analysis",
    subtitle: "Location-specific pest risk intelligence and early warning",
  },
  location: {
    title: "Location Selection",
    subtitle: "Define the region, crop and pest context for analysis",
  },
  prediction: {
    title: "Risk Prediction",
    subtitle: "Model-based pest risk prediction for the selected context",
  },
  forecast: {
    title: "Forecast",
    subtitle: "Short and medium-range pest risk outlook with environmental drivers",
  },
  xai: {
    title: "Explainable AI",
    subtitle: "Why the model predicted this risk level — in plain language",
  },
  map: {
    title: "Risk Map",
    subtitle: "Geographic view of pest risk across monitored regions",
  },
  alerts: {
    title: "Alerts",
    subtitle: "Active early warnings and monitoring status across regions",
  },
  settings: {
    title: "Settings",
    subtitle: "Thresholds, notifications and display preferences",
  },
};

function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);
  const date = now.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const time = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return (
    <div className="hidden text-right md:block">
      <p className="text-[12.5px] font-semibold tabular text-ink">{date}</p>
      <p className="text-[11px] tabular text-faint">{time} IST</p>
    </div>
  );
}

function NotificationBell() {
  const { analysis, navigate } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const items = analysis.alerts.filter((a) => a.status !== "Resolved").slice(0, 3);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-subtle transition-colors hover:border-[#c9d2c9] hover:text-ink"
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4" strokeWidth={1.9} />
        {analysis.activeAlerts > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold tabular text-white ring-2 ring-paper">
            {analysis.activeAlerts}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-[320px] overflow-hidden rounded-xl border border-line bg-white shadow-pop">
          <div className="flex items-center justify-between border-b border-line-soft px-4 py-2.5">
            <p className="text-[12px] font-semibold text-ink">Early Warnings</p>
            <span className="rounded-md bg-high-soft px-1.5 py-0.5 text-[10px] font-bold text-high">
              {analysis.activeAlerts} active
            </span>
          </div>
          <div className="divide-y divide-line-soft">
            {items.map((a) => (
              <button
                key={a.id}
                onClick={() => {
                  setOpen(false);
                  navigate("alerts");
                }}
                className="flex w-full items-start gap-2.5 px-4 py-3 text-left transition-colors hover:bg-paper"
              >
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: LEVEL_COLORS[a.level].hex }}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12px] font-semibold text-ink">
                    {a.pest} · {a.region}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-faint">
                    {a.crop} · Risk {a.risk}% · {a.window}
                  </span>
                </span>
                <span className="mt-0.5 shrink-0 text-[10px] text-faint">{a.updated}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setOpen(false);
              navigate("alerts");
            }}
            className="flex w-full items-center justify-center gap-1 border-t border-line bg-paper/60 px-4 py-2.5 text-[11.5px] font-semibold text-forest-700 transition-colors hover:bg-paper"
          >
            View all alerts
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

function ProfileMenu() {
  const { officer, logout } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const initials = officer.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div className="relative border-l border-line pl-3" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2.5 rounded-lg py-1 pr-1 transition-colors hover:bg-paper"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-forest-600 to-forest-800 text-[11.5px] font-bold text-emerald-50 ring-2 ring-white">
          {initials}
        </div>
        <div className="hidden leading-tight sm:block">
          <p className="text-[12.5px] font-semibold text-ink">{officer.name}</p>
          <p className="text-[10.5px] text-faint">{officer.role}</p>
        </div>
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-[220px] overflow-hidden rounded-xl border border-line bg-white shadow-pop">
          <div className="border-b border-line-soft px-4 py-3">
            <p className="text-[12.5px] font-semibold text-ink">{officer.name}</p>
            <p className="mt-0.5 text-[11px] text-faint">{officer.role}</p>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-[12.5px] font-medium text-high transition-colors hover:bg-high-soft"
          >
            <LogOut className="h-3.5 w-3.5" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const { page, setMobileNavOpen } = useApp();
  const meta = PAGE_META[page];

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1480px] items-center gap-3 px-4 sm:px-6">
        <button
          onClick={() => setMobileNavOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-subtle lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-4.5 w-4.5" strokeWidth={1.9} />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[16.5px] font-bold tracking-tight text-ink sm:text-[17.5px]">
            {meta.title}
          </h1>
          <p className="truncate text-[11.5px] text-faint sm:text-[12px]">{meta.subtitle}</p>
        </div>

        <div className="hidden h-8 w-px bg-line sm:block" />

        <Clock />
        <NotificationBell />
        <ProfileMenu />
      </div>
    </header>
  );
}
