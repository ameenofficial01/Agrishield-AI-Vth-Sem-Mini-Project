export type RiskLevel = "Low" | "Medium" | "High";
export type Horizon = "current" | "7d" | "14d" | "30d";

export type PageKey =
  | "dashboard"
  | "location"
  | "prediction"
  | "forecast"
  | "xai"
  | "map"
  | "alerts"
  | "settings";

export interface Selection {
  state: string;
  district: string;
  crop: string;
  pest: string;
}

export interface District {
  name: string;
  lat: number;
  lng: number;
}

export interface StateInfo {
  name: string;
  districts: District[];
}

export interface ForecastPoint {
  label: string;
  full: string;
  risk: number;
}

export interface Factor {
  name: string;
  weight: number;
  note: string;
}

export interface EnvPoint {
  label: string;
  temp: number;
  humidity: number;
  rainfall: number;
}

export type AlertStatus = "Active" | "Monitoring" | "Resolved";

export interface AlertRow {
  id: string;
  state: string;
  region: string;
  crop: string;
  pest: string;
  risk: number;
  level: RiskLevel;
  window: string;
  status: AlertStatus;
  driver: string;
  updated: string;
  current?: boolean;
}

export interface AreaRisk {
  name: string;
  lat: number;
  lng: number;
  risk: number;
  level: RiskLevel;
  radius: number;
  selected?: boolean;
}

export interface ClassProbs {
  low: number;
  medium: number;
  high: number;
}

export interface SnapshotItem {
  label: string;
  value: string;
}

export interface PestMeta {
  scientific: string;
  group: string;
}

export interface AnalysisResult {
  key: string;
  selection: Selection;
  base: number;
  level: RiskLevel;
  outlook7: number;
  outlookLevel: RiskLevel;
  confidence: number;
  forecast: { d7: ForecastPoint[]; d14: ForecastPoint[]; d30: ForecastPoint[] };
  factors: Factor[];
  advisoryTitle: string;
  advisoryBody: string;
  env: EnvPoint[];
  alerts: AlertRow[];
  activeAlerts: number;
  areas: AreaRisk[];
  contextAreas: AreaRisk[];
  centroid: [number, number];
  classProbs: ClassProbs;
  snapshot: SnapshotItem[];
  peak: { label: string; risk: number };
  trend: "Rising" | "Falling" | "Stable";
  trendDelta: number;
  generatedAt: string;
}
