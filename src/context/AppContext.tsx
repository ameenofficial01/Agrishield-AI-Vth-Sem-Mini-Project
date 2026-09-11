import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { AnalysisResult, PageKey, Selection } from "../types";
import { DEFAULT_SELECTION, getAnalysis } from "../data/mockData";

interface AppContextValue {
  page: PageKey;
  navigate: (p: PageKey) => void;
  selection: Selection;
  applySelection: (s: Selection) => void;
  analysis: AnalysisResult;
  analyzing: boolean;
  actionThreshold: number;
  setActionThreshold: (v: number) => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (v: boolean) => void;
}

const Ctx = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<PageKey>("dashboard");
  const [selection, setSelection] = useState<Selection>(DEFAULT_SELECTION);
  const [analyzing, setAnalyzing] = useState(false);
  const [actionThreshold, setActionThreshold] = useState(70);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const analysis = useMemo(() => getAnalysis(selection), [selection]);

  const navigate = useCallback((p: PageKey) => {
    setPage(p);
    setMobileNavOpen(false);
  }, []);

  const applySelection = useCallback((s: Selection) => {
    setAnalyzing(true);
    // simulate a short model round-trip; swap with fetch() to FastAPI later
    window.setTimeout(() => {
      setSelection(s);
      setAnalyzing(false);
    }, 550);
  }, []);

  const value: AppContextValue = {
    page,
    navigate,
    selection,
    applySelection,
    analysis,
    analyzing,
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
