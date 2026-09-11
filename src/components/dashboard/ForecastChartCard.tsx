import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowRight } from "lucide-react";
import { Card } from "../ui";
import { useApp } from "../../context/AppContext";
import { LEVEL_COLORS } from "../../data/mockData";

function ChartTip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-lg border border-line bg-white px-3 py-2 text-[11.5px] shadow-pop">
      <p className="font-semibold text-ink">{p.full}</p>
      <p className="mt-0.5 tabular text-subtle">
        Predicted risk: <span className="font-bold text-ink">{p.risk}%</span>
      </p>
    </div>
  );
}

export default function ForecastChartCard() {
  const { analysis, actionThreshold, navigate } = useApp();
  const lineHex = LEVEL_COLORS[analysis.level].hex;

  return (
    <Card
      title="Pest Risk Forecast"
      subtitle="Predicted risk over the next 7 days"
      right={
        <button
          onClick={() => navigate("forecast")}
          className="flex items-center gap-1 text-[11.5px] font-semibold text-forest-700 hover:text-forest-600"
        >
          Full outlook
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      }
    >
      <div className="h-[248px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={analysis.forecast.d7} margin={{ top: 8, right: 10, bottom: 0, left: 14 }}>
            <defs>
              <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={lineHex} stopOpacity={0.22} />
                <stop offset="100%" stopColor={lineHex} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#edf1ed" />
            <XAxis dataKey="label" tickLine={false} axisLine={{ stroke: "#e2e7e2" }} dy={6} />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `${v}%`}
              width={44}
            />
            <Tooltip content={<ChartTip />} />
            <ReferenceLine
              y={actionThreshold}
              stroke="#d97706"
              strokeDasharray="5 4"
              strokeWidth={1.2}
              label={{
                value: `Action threshold ${actionThreshold}%`,
                position: "insideTopRight",
                fontSize: 10,
                fill: "#b45309",
                fontWeight: 600,
              }}
            />
            <Area
              type="monotone"
              dataKey="risk"
              stroke={lineHex}
              strokeWidth={2.4}
              fill="url(#riskFill)"
              dot={{ r: 3, fill: "#fff", stroke: lineHex, strokeWidth: 1.6 }}
              activeDot={{ r: 4.5, fill: lineHex, stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
