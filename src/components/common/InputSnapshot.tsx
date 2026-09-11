import { Database } from "lucide-react";
import { Card } from "../ui";
import { useApp } from "../../context/AppContext";

export default function InputSnapshot({
  title = "Model Input Snapshot",
  subtitle = "Feature values supplied to the prediction model",
}: {
  title?: string;
  subtitle?: string;
}) {
  const { analysis } = useApp();
  return (
    <Card
      title={title}
      subtitle={subtitle}
      right={<Database className="h-3.5 w-3.5 text-faint" />}
    >
      <dl className="grid grid-cols-1 gap-x-6 gap-y-3">
        {analysis.snapshot.map((s) => (
          <div
            key={s.label}
            className="flex items-baseline justify-between gap-3 border-b border-line-soft pb-2.5 last:border-0 last:pb-0"
          >
            <dt className="text-[11.5px] font-medium text-faint">{s.label}</dt>
            <dd className="truncate text-right text-[12px] font-semibold text-ink">{s.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
