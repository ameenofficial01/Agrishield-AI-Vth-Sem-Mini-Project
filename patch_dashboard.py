import os

# Update DashboardPage.tsx
dashboard_path = 'src/pages/DashboardPage.tsx'
with open(dashboard_path, 'r') as f:
    content = f.read()

content = content.replace('import { RefreshCw } from "lucide-react";',
'''import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchAPI } from "../utils/api";''')

content = content.replace('export default function DashboardPage() {',
'''export default function DashboardPage() {
  const [summary, setSummary] = useState({
    total_predictions: 0,
    high_risk_predictions: 0,
    active_alerts: 0
  });
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetchAPI("/dashboard/summary").then(setSummary).catch(console.error);
    fetchAPI("/predictions").then(setHistory).catch(console.error);
  }, []);
''')

content = content.replace('stats = [\n    { label: "Active Predictions", value: "14",',
'''stats = [
    { label: "Total Predictions", value: summary.total_predictions.toString(),''')

content = content.replace('label: "High Risk Zones", value: "3",',
'''label: "High Risk Alerts", value: summary.high_risk_predictions.toString(),''')

content = content.replace('label: "Action Required", value: "5",',
'''label: "Active Alerts", value: summary.active_alerts.toString(),''')

with open(dashboard_path, 'w') as f:
    f.write(content)
print("Updated DashboardPage.tsx")
