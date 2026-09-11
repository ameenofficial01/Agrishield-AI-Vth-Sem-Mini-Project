/**
 * Centralized mock-analysis engine.
 *
 * Every dashboard value is derived deterministically from the current
 * Selection so the UI behaves like it is backed by a real model.
 * Replace `getAnalysis` with a call to the FastAPI backend
 * (e.g. GET /api/analysis?state=&district=&crop=&pest=) later.
 */

import type {
  AlertRow,
  AlertStatus,
  AnalysisResult,
  AreaRisk,
  ClassProbs,
  EnvPoint,
  Factor,
  ForecastPoint,
  RiskLevel,
  Selection,
  SnapshotItem,
} from "../types";
import { AREAS_BY_DISTRICT, getDistrict, STATES } from "./locations";
import { CROP_STAGES } from "./cropPestMap";

/* ------------------------------------------------------------------ */
/* deterministic hashing                                               */
/* ------------------------------------------------------------------ */

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const seed = (key: string, salt: string) => hash(key + "::" + salt);

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const pick = <T,>(arr: T[], n: number) => arr[n % arr.length];

/* ------------------------------------------------------------------ */
/* risk bands                                                          */
/* ------------------------------------------------------------------ */

export function riskLevel(r: number): RiskLevel {
  if (r >= 75) return "High";
  if (r >= 40) return "Medium";
  return "Low";
}

export const LEVEL_COLORS: Record<RiskLevel, { text: string; soft: string; hex: string; ring: string }> = {
  Low: { text: "text-low", soft: "bg-low-soft", hex: "#15803d", ring: "#9ccba9" },
  Medium: { text: "text-med", soft: "bg-med-soft", hex: "#b45309", ring: "#e0bd82" },
  High: { text: "text-high", soft: "bg-high-soft", hex: "#c2410c", ring: "#eab091" },
};

/* ------------------------------------------------------------------ */
/* scenario overrides (realistic sample scenarios from the brief)      */
/* ------------------------------------------------------------------ */

const RISK_OVERRIDES: Record<string, number> = {
  "Rice|Stem Borer|Dakshina Kannada": 82,
  "Rice|Stem Borer|Udupi": 72,
  "Maize|Fall Armyworm|Mysuru": 63,
  "Tomato|Whitefly|Hassan": 76,
  "Tomato|Fruit Borer|Kannur": 79,
  "Coconut|Rhinoceros Beetle|Kasaragod": 41,
  "Arecanut|Spindle Bug|Udupi": 57,
  "Rice|Leaf Folder|Kodagu": 38,
};

const CONFIDENCE_OVERRIDES: Record<string, number> = {
  "Rice|Stem Borer|Dakshina Kannada": 89,
};

/* first-week forecast overrides keep the documented scenarios consistent */
const FORECAST_OVERRIDES: Record<string, number[]> = {
  "Rice|Stem Borer|Dakshina Kannada": [82, 85, 86, 86, 81, 77, 73],
  "Rice|Stem Borer|Udupi": [72, 71, 70, 69, 71, 68, 66],
  "Tomato|Whitefly|Hassan": [76, 77, 78, 76, 74, 72, 70],
  "Tomato|Fruit Borer|Kannur": [79, 80, 79, 78, 77, 76, 74],
  "Rice|Leaf Folder|Kodagu": [38, 37, 36, 35, 34, 36, 35],
  "Coconut|Rhinoceros Beetle|Kasaragod": [41, 43, 42, 40, 39, 41, 40],
  "Maize|Fall Armyworm|Mysuru": [63, 65, 64, 62, 60, 61, 59],
  "Arecanut|Spindle Bug|Udupi": [57, 58, 56, 55, 57, 54, 53],
};

const scenarioKey = (s: Selection) => `${s.crop}|${s.pest}|${s.district}`;

export function baseRiskOf(s: Selection): number {
  const key = scenarioKey(s);
  if (RISK_OVERRIDES[key] !== undefined) return RISK_OVERRIDES[key];
  return 35 + (seed(key, "base") % 55); // 35..89
}

/* ------------------------------------------------------------------ */
/* forecast                                                            */
/* ------------------------------------------------------------------ */

const fmtDay = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
const fmtFull = (d: Date) =>
  d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });

function forecastSeries(key: string, base: number, days: number): ForecastPoint[] {
  const pts: ForecastPoint[] = [];
  let v = base;
  const now = new Date();
  const override = FORECAST_OVERRIDES[key];
  for (let i = 0; i < days; i++) {
    if (i > 0) {
      if (override && i < override.length) {
        v = override[i];
      } else {
        const drift = ((seed(key, "f" + i) % 13) - 6) * 0.8;
        v = clamp(Math.round(v + drift), 16, 95);
      }
    }
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    pts.push({ label: fmtDay(d), full: fmtFull(d), risk: Math.round(v) });
  }
  return pts;
}

/* ------------------------------------------------------------------ */
/* explainability factors                                              */
/* ------------------------------------------------------------------ */

const FACTOR_NOTES: Record<string, string> = {
  Humidity: "Sustained high relative humidity favours pest development and survival.",
  Rainfall: "Recent rainfall increases canopy moisture and egg-laying suitability.",
  "Temperature Suitability": "Mean temperature is inside the pest's optimal developmental window.",
  "Historical Pest Activity": "Elevated trap counts reported in this district over the past seasons.",
  "Crop Stage": "Current crop growth stage is highly susceptible to infestation.",
  "Night Temperature": "Warm nights accelerate pest metabolic rate and reproduction.",
  "Soil Moisture": "High soil moisture supports pupation and larval survival.",
  "Wind Speed": "Low wind speeds allow adult pests to remain and deposit eggs in fields.",
  "Dry Spell Length": "Extended dry conditions concentrate pests on irrigated host crops.",
  "Host Crop Density": "Dense contiguous host cropping raises local inoculum pressure.",
};

const FACTOR_POOL = [
  "Humidity",
  "Rainfall",
  "Temperature Suitability",
  "Historical Pest Activity",
  "Crop Stage",
  "Night Temperature",
  "Soil Moisture",
  "Wind Speed",
  "Dry Spell Length",
  "Host Crop Density",
];

const WEIGHT_PATTERN = [0.31, 0.26, 0.18, 0.13, 0.07];

function buildFactors(key: string): Factor[] {
  if (key === "Rice|Stem Borer|Dakshina Kannada") {
    return [
      { name: "Humidity", weight: 0.32, note: FACTOR_NOTES["Humidity"] },
      { name: "Rainfall", weight: 0.28, note: FACTOR_NOTES["Rainfall"] },
      { name: "Temperature Suitability", weight: 0.18, note: FACTOR_NOTES["Temperature Suitability"] },
      { name: "Historical Pest Activity", weight: 0.14, note: FACTOR_NOTES["Historical Pest Activity"] },
      { name: "Crop Stage", weight: 0.08, note: FACTOR_NOTES["Crop Stage"] },
    ];
  }
  // deterministic rotation of the pool
  const offset = seed(key, "pool") % FACTOR_POOL.length;
  const names = Array.from({ length: 5 }, (_, i) => FACTOR_POOL[(offset + i * 2) % FACTOR_POOL.length]);
  const weights = WEIGHT_PATTERN.map(
    (w, i) => Math.round((w + ((seed(key, "w" + i) % 5) - 2) * 0.01) * 100) / 100
  );
  const order = names
    .map((name, i) => ({ name, weight: Math.max(0.04, weights[i]) }))
    .sort((a, b) => b.weight - a.weight);
  return order.map((f) => ({ ...f, note: FACTOR_NOTES[f.name] }));
}

/* ------------------------------------------------------------------ */
/* advisories                                                          */
/* ------------------------------------------------------------------ */

function advisory(level: RiskLevel, s: Selection): { title: string; body: string } {
  const title =
    level === "High"
      ? "Conditions are favourable for pest activity."
      : level === "Medium"
        ? "Conditions are moderately favourable for pest activity."
        : "Conditions are currently unfavourable for significant pest activity.";
  const body = `Recent environmental conditions indicate ${
    level === "High" ? "an elevated" : level === "Medium" ? "a moderate" : "a low"
  } likelihood of ${s.pest} activity in ${s.district}. ${
    level === "High"
      ? "Field verification within 48 hours is advised."
      : level === "Medium"
        ? "Continue routine scouting over the next few days."
        : "No immediate intervention is required."
  }`;
  return { title, body };
}

/* ------------------------------------------------------------------ */
/* environment trends                                                  */
/* ------------------------------------------------------------------ */

function buildEnv(key: string, days: number): EnvPoint[] {
  const pts: EnvPoint[] = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    pts.push({
      label: fmtDay(d),
      temp: Math.round((26.5 + ((seed(key, "t" + i) % 50) - 25) / 12) * 10) / 10,
      humidity: clamp(78 + ((seed(key, "h" + i) % 24) - 8), 55, 96),
      rainfall: seed(key, "r" + i) % 5 === 0 ? 0 : Math.round(((seed(key, "r" + i) % 220) / 10) * 10) / 10,
    });
  }
  return pts;
}

/* ------------------------------------------------------------------ */
/* alerts                                                              */
/* ------------------------------------------------------------------ */

const ALERT_COMBOS: Selection[] = [
  { state: "Karnataka", district: "Dakshina Kannada", crop: "Rice", pest: "Stem Borer" },
  { state: "Karnataka", district: "Udupi", crop: "Rice", pest: "Stem Borer" },
  { state: "Karnataka", district: "Hassan", crop: "Tomato", pest: "Whitefly" },
  { state: "Karnataka", district: "Mysuru", crop: "Maize", pest: "Fall Armyworm" },
  { state: "Kerala", district: "Kasaragod", crop: "Coconut", pest: "Rhinoceros Beetle" },
  { state: "Karnataka", district: "Kodagu", crop: "Rice", pest: "Leaf Folder" },
  { state: "Kerala", district: "Kannur", crop: "Tomato", pest: "Fruit Borer" },
  { state: "Karnataka", district: "Udupi", crop: "Arecanut", pest: "Spindle Bug" },
];

const ALERT_WINDOWS = ["Next 7 days", "Next 7 days", "Next 14 days", "Next 30 days"];
const ALERT_TIMES = ["25 min ago", "1 h ago", "2 h ago", "3 h ago", "5 h ago", "Yesterday"];

function statusFor(risk: number): AlertStatus {
  if (risk >= 75) return "Active";
  if (risk >= 40) return "Monitoring";
  return "Resolved";
}

function outlookFor(s: Selection): number {
  const key = scenarioKey(s);
  const fc = forecastSeries(key, baseRiskOf(s), 7);
  return Math.max(...fc.map((p) => p.risk));
}

export function buildAlerts(sel: Selection): AlertRow[] {
  const rows: AlertRow[] = [];
  const combos = ALERT_COMBOS.filter(
    (c) => !(c.district === sel.district && c.pest === sel.pest)
  );
  const ordered: Selection[] = [sel, ...combos];
  ordered.slice(0, 7).forEach((c, i) => {
    const risk = outlookFor(c);
    const factors = buildFactors(scenarioKey(c));
    rows.push({
      id: "AL-" + (4200 + seed(scenarioKey(c), "id") % 800),
      state: c.state,
      region: c.district,
      crop: c.crop,
      pest: c.pest,
      risk,
      level: riskLevel(risk),
      window: i === 0 ? "Next 7 days" : pick(ALERT_WINDOWS, seed(scenarioKey(c), "w")),
      status: statusFor(risk),
      driver: factors[0].name,
      updated: i === 0 ? "Just now" : pick(ALERT_TIMES, seed(scenarioKey(c), "t") + i),
      current: i === 0,
    });
  });
  return rows;
}

/* ------------------------------------------------------------------ */
/* input snapshot (features fed to the model)                          */
/* ------------------------------------------------------------------ */

function buildSnapshot(key: string, s: Selection): SnapshotItem[] {
  const humidity = 74 + (seed(key, "sh") % 20);
  const rainfall7 = 18 + (seed(key, "sr") % 64);
  const tempAvg = (25.6 + (seed(key, "st") % 46) / 10).toFixed(1);
  const wind = 3 + (seed(key, "sw") % 8);
  const stage = pick(CROP_STAGES[s.crop] ?? ["Vegetative"], seed(key, "sc"));
  const soil = pick(["Low", "Moderate", "High"], seed(key, "ss"));
  return [
    { label: "Region", value: `${s.district}, ${s.state}` },
    { label: "Crop / Pest", value: `${s.crop} · ${s.pest}` },
    { label: "Crop stage", value: stage },
    { label: "Relative humidity", value: `${humidity}%` },
    { label: "Rainfall (last 7d)", value: `${rainfall7} mm` },
    { label: "Mean temperature", value: `${tempAvg}°C` },
    { label: "Wind speed", value: `${wind} km/h` },
    { label: "Soil moisture", value: soil },
    { label: "Data window", value: "Last 30 days (demonstration data)" },
  ];
}

/* ------------------------------------------------------------------ */
/* main entry point                                                    */
/* ------------------------------------------------------------------ */

export function getAnalysis(sel: Selection): AnalysisResult {
  const key = scenarioKey(sel);
  const base = baseRiskOf(sel);
  const level = riskLevel(base);

  const d7 = forecastSeries(key, base, 7);
  const d14 = forecastSeries(key, base, 14);
  const d30 = forecastSeries(key, base, 30);
  const outlook7 = Math.max(...d7.map((p) => p.risk));

  const confidence =
    CONFIDENCE_OVERRIDES[key] ?? 84 + (seed(key, "conf") % 10);

  const factors = buildFactors(key);
  const adv = advisory(level, sel);

  // ---- map areas -------------------------------------------------
  const areaDefs = AREAS_BY_DISTRICT[sel.district] ?? [];
  const areas: AreaRisk[] = areaDefs.map((a, i) => {
    const jitter = (seed(key, "area" + a.name) % 23) - 11;
    const risk = clamp(base + jitter, 14, 95);
    return {
      name: a.name,
      lat: a.lat,
      lng: a.lng,
      risk,
      level: riskLevel(risk),
      radius: 4200 + (seed(key, "rad" + a.name) % 2600),
      selected: i === 0,
    };
  });

  // neighbouring districts rendered as muted context
  const contextAreas: AreaRisk[] = (
    STATES.find((x) => x.name === sel.state)?.districts ?? []
  )
    .filter((d) => d.name !== sel.district)
    .map((d) => {
      const r = clamp(baseRiskOf({ ...sel, district: d.name }), 14, 95);
      return {
        name: d.name,
        lat: d.lat,
        lng: d.lng,
        risk: r,
        level: riskLevel(r),
        radius: 6000,
      };
    });

  const dd = getDistrict(sel.state, sel.district);
  const centroid: [number, number] = dd ? [dd.lat, dd.lng] : [12.86, 75.14];

  // ---- class probabilities (prediction view) ----------------------
  const predicted = level;
  const classProbs: ClassProbs =
    predicted === "High"
      ? { low: 100 - base - (seed(key, "cp") % 6), medium: Math.max(4, 100 - base - 4), high: base }
      : predicted === "Medium"
        ? { low: Math.max(5, 100 - base - (seed(key, "cp") % 20)), medium: base, high: clamp(100 - base - 8, 6, 40) }
        : { low: clamp(100 - base, 55, 92), medium: Math.max(4, base - (seed(key, "cp") % 12)), high: 4 };
  const total = classProbs.low + classProbs.medium + classProbs.high;
  classProbs.low = Math.round((classProbs.low / total) * 100);
  classProbs.medium = Math.round((classProbs.medium / total) * 100);
  classProbs.high = 100 - classProbs.low - classProbs.medium;

  // ---- summary stats ----------------------------------------------
  const peakIdx = d7.reduce((mi, p, i) => (p.risk > d7[mi].risk ? i : mi), 0);
  const trendDelta = d7[6].risk - d7[0].risk;
  const trend = trendDelta >= 4 ? "Rising" : trendDelta <= -4 ? "Falling" : "Stable";

  const alerts = buildAlerts(sel);

  return {
    key,
    selection: sel,
    base,
    level,
    outlook7,
    outlookLevel: riskLevel(outlook7),
    confidence,
    forecast: { d7, d14, d30 },
    factors,
    advisoryTitle: adv.title,
    advisoryBody: adv.body,
    env: buildEnv(key, 14),
    alerts,
    activeAlerts: alerts.filter((a) => a.status === "Active").length,
    areas,
    contextAreas,
    centroid,
    classProbs,
    snapshot: buildSnapshot(key, sel),
    peak: { label: d7[peakIdx].full, risk: d7[peakIdx].risk },
    trend,
    trendDelta,
    generatedAt: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
  };
}

/* ------------------------------------------------------------------ */
/* recommended actions (integrated pest management, no dosages)        */
/* ------------------------------------------------------------------ */

export const RECOMMENDATIONS = [
  {
    icon: "monitor",
    title: "Monitor Fields Regularly",
    body: "Check for early signs of pest infestation and record observations in field logs.",
  },
  {
    icon: "shield",
    title: "Use Recommended Control Measures",
    body: "Follow integrated pest management practices suited to the current crop stage.",
  },
  {
    icon: "remove",
    title: "Remove Affected Plant Parts",
    body: "Prevent further spread by removing and destroying infested material where appropriate.",
  },
  {
    icon: "consult",
    title: "Consult Agricultural Officers",
    body: "Seek region-specific guidance from your local office before any chemical treatment.",
  },
] as const;

export const DEFAULT_SELECTION: Selection = {
  state: "Karnataka",
  district: "Dakshina Kannada",
  crop: "Rice",
  pest: "Stem Borer",
};
