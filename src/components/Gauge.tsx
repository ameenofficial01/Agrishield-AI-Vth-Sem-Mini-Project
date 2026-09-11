import type { RiskLevel } from "../types";
import { LEVEL_COLORS } from "../data/mockData";

function polar(cx: number, cy: number, r: number, angleDeg: number): [number, number] {
  const rad = (angleDeg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy - r * Math.sin(rad)];
}

function arcPath(cx: number, cy: number, r: number, from: number, to: number): string {
  const [sx, sy] = polar(cx, cy, r, from);
  const [ex, ey] = polar(cx, cy, r, to);
  const large = from - to > 180 ? 1 : 0;
  return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
}

const BANDS: { from: number; to: number; color: string }[] = [
  { from: 180, to: 180 - 0.4 * 180, color: "#dcebe0" }, // low segment
  { from: 180 - 0.4 * 180, to: 180 - 0.75 * 180, color: "#f4e2c4" }, // medium segment
  { from: 180 - 0.75 * 180, to: 0.001, color: "#f3d3c2" }, // high segment
];

export default function Gauge({
  value,
  level,
  caption = "PEST RISK INDEX",
  compact = false,
}: {
  value: number;
  level: RiskLevel;
  caption?: string;
  compact?: boolean;
}) {
  const c = LEVEL_COLORS[level];
  const cx = 100;
  const cy = 104;
  const r = 82;

  return (
    <div className="relative mx-auto w-full max-w-[250px]">
      <svg viewBox="0 0 200 116" className="block w-full">
        {/* banded track */}
        {BANDS.map((b, i) => (
          <path
            key={i}
            d={arcPath(cx, cy, r, b.from - 1.5, b.to + 1.5)}
            fill="none"
            stroke={b.color}
            strokeWidth={13}
          />
        ))}
        {/* value arc */}
        <path
          d={arcPath(cx, cy, r, 180, 0.001)}
          fill="none"
          stroke={c.hex}
          strokeWidth={13}
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${Math.max(1.5, value)} 100`}
          style={{ transition: "stroke-dasharray 0.9s cubic-bezier(0.22,0.8,0.3,1), stroke 0.4s" }}
        />
        {/* ticks */}
        {[0, 25, 50, 75, 100].map((t) => {
          const a = 180 - (t / 100) * 180;
          const [x1, y1] = polar(cx, cy, r - 12, a);
          const [x2, y2] = polar(cx, cy, r - 17, a);
          const [tx, ty] = polar(cx, cy, r - 26, a);
          return (
            <g key={t}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c3ccc5" strokeWidth={1.2} />
              <text
                x={tx}
                y={ty + 2.5}
                textAnchor="middle"
                fontSize={8}
                fill="#98a39b"
                fontWeight={600}
              >
                {t}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
        <span
          className={`font-extrabold tabular tracking-tight text-ink ${
            compact ? "text-[30px]" : "text-[38px] leading-none"
          }`}
        >
          {value}
          <span className="text-[0.55em] font-bold text-faint">%</span>
        </span>
        {!compact && (
          <span className="mt-1.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-faint">
            {caption}
          </span>
        )}
      </div>
    </div>
  );
}
