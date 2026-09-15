import { useState } from "react";
import { Check, Mail, MapIcon, MessageSquare, Save, Smartphone, UserRound } from "lucide-react";
import { Card, Field, Kicker, Toggle } from "../components/ui";
import { useApp } from "../context/AppContext";
import { DISTRICT_META, STATES } from "../data/locations";

export default function SettingsPage() {
  const { actionThreshold, setActionThreshold, selection } = useApp();

  const [notif, setNotif] = useState({
    highRisk: true,
    dailySummary: true,
    weeklyBulletin: false,
  });
  const [density, setDensity] = useState("Comfortable");
  const [units, setUnits] = useState("Metric (°C, mm)");
  const [basemap, setBasemap] = useState("Minimal (light)");
  const [riskLabels, setRiskLabels] = useState(true);
  const [saved, setSaved] = useState(false);

  const districts =
    STATES.find((s) => s.name === selection.state)?.districts.map((d) => d.name) ?? [];

  const save = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
      {/* thresholds */}
      <Card title="Alert Thresholds" subtitle="Applied immediately to charts and alert evaluation" className="anim-in">
        <Kicker>Risk bands</Kicker>
        <div className="mt-3 space-y-4">
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="thr" className="text-[12.5px] font-medium text-ink">
                Action threshold
              </label>
              <span className="rounded-md bg-med-soft px-2 py-0.5 text-[11.5px] font-bold tabular text-med">
                {actionThreshold}%
              </span>
            </div>
            <input
              id="thr"
              type="range"
              min={50}
              max={90}
              step={5}
              value={actionThreshold}
              onChange={(e) => setActionThreshold(Number(e.target.value))}
              className="mt-2 w-full accent-forest-700"
            />
            <p className="mt-1 text-[11px] leading-relaxed text-faint">
              Regions predicted at or above this risk are escalated to Active alerts and marked on
              the forecast chart.
            </p>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-line-soft bg-paper/70 px-3.5 py-2.5 text-[12px]">
            <span className="text-subtle">High-risk boundary</span>
            <span className="font-bold tabular text-high">≥ 75%</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-line-soft bg-paper/70 px-3.5 py-2.5 text-[12px]">
            <span className="text-subtle">Medium-risk boundary</span>
            <span className="font-bold tabular text-med">≥ 40%</span>
          </div>
        </div>
      </Card>

      {/* notifications */}
      <Card title="Notifications" subtitle="How early warnings reach your team" className="anim-in anim-in-d1">
        <div className="divide-y divide-line-soft">
          <div className="flex items-start gap-3">
            <Smartphone className="mt-3 h-4 w-4 shrink-0 text-faint" />
            <div className="flex-1">
              <Toggle checked={notif.highRisk} onChange={(v) => setNotif((n) => ({ ...n, highRisk: v }))} label="High-risk push alerts" hint="Immediate push + SMS when a region crosses the action threshold" />
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="mt-3 h-4 w-4 shrink-0 text-faint" />
            <div className="flex-1">
              <Toggle checked={notif.dailySummary} onChange={(v) => setNotif((n) => ({ ...n, dailySummary: v }))} label="Daily district summary" hint="06:30 IST email digest of risk across monitored districts" />
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MessageSquare className="mt-3 h-4 w-4 shrink-0 text-faint" />
            <div className="flex-1">
              <Toggle checked={notif.weeklyBulletin} onChange={(v) => setNotif((n) => ({ ...n, weeklyBulletin: v }))} label="Weekly advisory bulletin" hint="Season outlook shared with extension officers" />
            </div>
          </div>
        </div>
      </Card>

      {/* display preferences */}
      <Card title="Display Preferences" subtitle="How the interface presents information" className="anim-in anim-in-d2">
        <div className="space-y-3.5">
          <Field label="Layout density" value={density} onChange={setDensity} options={["Comfortable", "Compact"]} />
          <Field label="Units" value={units} onChange={setUnits} options={["Metric (°C, mm)", "Imperial (°F, in)"]} />
          <div className="border-t border-line-soft pt-2">
            <Toggle checked={riskLabels} onChange={setRiskLabels} label="Show risk level labels" hint="Display Low / Medium / High tags alongside risk percentages" />
          </div>
        </div>
      </Card>

      {/* map preferences */}
      <Card title="Map Preferences" subtitle="Defaults for the regional risk map" className="anim-in anim-in-d2">
        <div className="space-y-3.5">
          <Field label="Basemap style" value={basemap} onChange={setBasemap} options={["Minimal (light)", "Satellite", "Terrain"]} />
          <div className="flex items-start gap-2.5 rounded-lg bg-paper/80 p-3 text-[11px] leading-relaxed text-faint">
            <MapIcon className="mt-0.5 h-4 w-4 shrink-0 text-subtle" />
            Map preferences apply across the Risk Analysis, Risk Map and Home pages.
          </div>
        </div>
      </Card>

      {/* profile */}
      <Card title="Profile & Jurisdiction" subtitle="Displayed on bulletins and shared advisories" className="anim-in anim-in-d3 lg:col-span-2">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-forest-600 to-forest-800 text-[13px] font-bold text-emerald-50">
            AO
          </div>
          <div>
            <p className="text-[13px] font-semibold text-ink">Agricultural Officer</p>
            <p className="text-[11px] text-faint">District Agriculture Office · Pest Surveillance Cell</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <Field label="State" value={selection.state} onChange={() => {}} options={STATES.map((s) => s.name)} disabled icon={<UserRound className="h-3 w-3" />} />
          <Field label="Home district" value={selection.district} onChange={() => {}} options={districts} disabled />
        </div>
        <p className="mt-2 text-[10.5px] text-faint">
          Jurisdiction changes are managed by the state coordinator. This prototype references{" "}
          {DISTRICT_META[selection.district]?.stations ?? 0} data points for your district.
        </p>

        <div className="mt-5 flex items-center justify-end gap-2.5 border-t border-line-soft pt-4">
          <span className={`mr-auto flex items-center gap-1.5 text-[11.5px] font-semibold text-low transition-opacity ${saved ? "opacity-100" : "opacity-0"}`}>
            <Check className="h-3.5 w-3.5" /> Preferences saved
          </span>
          <button
            onClick={save}
            className="flex items-center gap-2 rounded-lg bg-forest-800 px-4.5 py-2 text-[12.5px] font-semibold text-white shadow-sm transition-all hover:bg-forest-700 active:scale-[0.98]"
          >
            <Save className="h-3.5 w-3.5" />
            Save Changes
          </button>
        </div>
      </Card>
    </div>
  );
}
