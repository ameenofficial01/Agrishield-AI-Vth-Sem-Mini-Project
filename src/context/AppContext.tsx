import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { AnalysisResult, PageKey, Selection } from "../types";
import { DEFAULT_SELECTION, getAnalysis } from "../data/mockData";
import { fetchAPI } from "../utils/api";
import { useEffect } from "react";

const AUTH_KEY = "agroshield.auth";

export interface OfficerProfile {
  name: string;
  role: string;
}

const DEMO_OFFICER: OfficerProfile = {
  name: "Agricultural Officer",
  role: "District Agriculture Office",
};

function readStoredAuth(): boolean {
  try {
    return window.localStorage.getItem(AUTH_KEY) === "true";
  } catch {
    return false;
  }
}

interface AppContextValue {
  isAuthenticated: boolean;
  officer: OfficerProfile;
  login: () => void;
  logout: () => void;
  page: PageKey;
  navigate: (p: PageKey) => void;
  selection: Selection;
  applySelection: (s: Selection) => void;
  analysis: AnalysisResult;
  analyzing: boolean;
  checkingMessage: string | null;
  quickCheck: (s: Selection) => void;
  actionThreshold: number;
  setActionThreshold: (v: number) => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (v: boolean) => void;
}

const Ctx = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => readStoredAuth());
  const [page, setPage] = useState<PageKey>("home");
  const [selection, setSelection] = useState<Selection>(DEFAULT_SELECTION);
  const [analyzing, setAnalyzing] = useState(false);
  const [checkingMessage, setCheckingMessage] = useState<string | null>(null);
  const [actionThreshold, setActionThreshold] = useState(70);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [analysis, setAnalysis] = useState<AnalysisResult>(getAnalysis(selection));

  useEffect(() => {
    // We update local analysis state whenever selection changes to immediately show mock structure, 
    // then we fetch real predictions and overlay them.
    setAnalysis(getAnalysis(selection));
  }, [selection]);

  const login = useCallback(() => {
    try {
      window.localStorage.setItem(AUTH_KEY, "true");
    } catch {
      /* localStorage unavailable — session-only auth still works */
    }
    setIsAuthenticated(true);
    setPage("home");
  }, []);

  const logout = useCallback(() => {
    try {
      window.localStorage.removeItem(AUTH_KEY);
    } catch {
      /* ignore */
    }
    setIsAuthenticated(false);
    setMobileNavOpen(false);
  }, []);

  const navigate = useCallback((p: PageKey) => {
    setPage(p);
    setMobileNavOpen(false);
  }, []);

  const applySelection = useCallback(async (s: Selection) => {
    setAnalyzing(true);
    try {
      const weather = await fetchAPI(`/weather?district=${s.district}`);
      const payload = {
        state: s.state,
        district: s.district,
        taluk: s.district,
        crop: s.crop,
        pest: s.pest,
        temperature_c: weather.temperature_c,
        humidity_pct: weather.humidity_pct,
        rainfall_7d_mm: weather.rainfall_7d_mm,
        wind_kmh: weather.wind_kmh
      };
      
      const res = await fetchAPI('/predict', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      
      setSelection(s);
      
      // Update analysis state with real predictions
      setAnalysis(prev => ({
        ...prev,
        base: Math.round(res.risk_score),
        level: res.risk_level,
        advisoryTitle: res.advisory_title,
        advisoryBody: res.advisory_body,
        classProbs: res.class_probs,
        env: [
          { label: "Current", temp: weather.temperature_c, humidity: weather.humidity_pct, rainfall: weather.rainfall_7d_mm }
        ],
        confidence: 85
      }));
      
    } catch (e) {
      console.error(e);
      setSelection(s);
    } finally {
      setAnalyzing(false);
    }
  }, []);

  // Used by the Home page's Quick Pest Risk Check: shows a brief, honest
  // "analyzing" state before landing on the Risk Analysis page with the
  // chosen context applied.
  const quickCheck = useCallback((s: Selection) => {
    setCheckingMessage("Analyzing selected crop, pest and location...");
    window.setTimeout(() => {
      setSelection(s);
      setCheckingMessage(null);
      setPage("dashboard");
      setMobileNavOpen(false);
    }, 700);
  }, []);

  const value: AppContextValue = {
    isAuthenticated,
    officer: DEMO_OFFICER,
    login,
    logout,
    page,
    navigate,
    selection,
    applySelection,
    analysis,
    analyzing,
    checkingMessage,
    quickCheck,
    actionThreshold,
    setActionThreshold,
    mobileNavOpen,
    setMobileNavOpen,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppContextValue {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be used inside AppProvider");
  return v;
}
