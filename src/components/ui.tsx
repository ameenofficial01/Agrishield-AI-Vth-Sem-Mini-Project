import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import type { RiskLevel } from "../types";
import { LEVEL_COLORS } from "../data/mockData";

/* ---------- Card ---------- */

export function Card({
  title,
  subtitle,
  right,
  children,
  className = "",
  bodyClassName = "",
  pad = true,
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  pad?: boolean;
}) {
  return (
    <section
      className={`rounded-xl border border-line bg-white shadow-card ${className}`}
    >
      {(title || right) && (
        <header className="flex items-start justify-between gap-3 px-5 pt-4 pb-1">
          <div className="min-w-0">
            <h3 className="text-[13.5px] font-semibold tracking-tight text-ink">{title}</h3>
            {subtitle && <p className="mt-0.5 text-[11.5px] text-faint">{subtitle}</p>}
          </div>
          {right && <div className="flex shrink-0 items-center gap-2">{right}</div>}
        </header>
      )}
      <div className={`${pad ? "px-5 py-4" : ""} ${bodyClassName}`}>{children}</div>
    </section>
  );
}

/* ---------- Risk badge ---------- */

export function RiskBadge({ level, size = "md" }: { level: RiskLevel; size?: "sm" | "md" }) {
  const c = LEVEL_COLORS[level];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md font-semibold uppercase tracking-wide ${c.soft} ${c.text} ${
        size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-[3px] text-[10.5px]"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.hex }} />
      {level} {level === "High" || level === "Low" ? "risk" : "risk"}
    </span>
  );
}

export function Dot({ hex, className = "" }: { hex: string; className?: string }) {
  return <span className={`inline-block h-2 w-2 rounded-full ${className}`} style={{ backgroundColor: hex }} />;
}

/* ---------- Field select ---------- */

export function Field({
  label,
  value,
  onChange,
  options,
  disabled,
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  disabled?: boolean;
  icon?: ReactNode;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-faint">
        {icon}
        {label}
      </span>
      <span className="relative block">
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="h-9.5 w-full appearance-none truncate rounded-lg border border-line bg-white pl-3 pr-8 text-[13px] font-medium text-ink outline-none transition-colors hover:border-[#c9d2c9] focus:border-forest-600 focus:ring-2 focus:ring-forest-600/15 disabled:cursor-not-allowed disabled:bg-paper disabled:text-faint"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-faint" />
      </span>
    </label>
  );
}

/* ---------- Toggle ---------- */

export function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 py-2.5 text-left"
    >
      <span>
        <span className="block text-[13px] font-medium text-ink">{label}</span>
        {hint && <span className="mt-0.5 block text-[11.5px] text-faint">{hint}</span>}
      </span>
      <span
        className={`relative h-[22px] w-[40px] shrink-0 rounded-full transition-colors duration-200 ${
          checked ? "bg-forest-600" : "bg-[#cfd8cf]"
        }`}
      >
        <span
          className={`absolute top-[3px] h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-[21px]" : "translate-x-[3px]"
          }`}
        />
      </span>
    </button>
  );
}

/* ---------- Section kicker ---------- */

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-forest-600">
      {children}
    </p>
  );
}

/* ---------- Prototype data badge ---------- */

export function ProtoBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-subtle">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
      Prototype Data
    </span>
  );
}
