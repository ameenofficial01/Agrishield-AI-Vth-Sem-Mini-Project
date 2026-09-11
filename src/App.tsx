import { AppProvider, useApp } from "./context/AppContext";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import DashboardPage from "./pages/DashboardPage";
import LocationSelectionPage from "./pages/LocationSelectionPage";
import RiskPredictionPage from "./pages/RiskPredictionPage";
import ForecastPage from "./pages/ForecastPage";
import ExplainableAIPage from "./pages/ExplainableAIPage";
import RiskMapPage from "./pages/RiskMapPage";
import AlertsPage from "./pages/AlertsPage";
import SettingsPage from "./pages/SettingsPage";

function Shell() {
  const { page, analyzing } = useApp();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Sidebar />

      <div className="relative isolate lg:pl-[74px] xl:pl-[236px]">
        <Header />

        {/* analysis progress indicator */}
        <div
          className={`relative h-[2.5px] overflow-hidden bg-transparent transition-opacity ${
            analyzing ? "opacity-100" : "opacity-0"
          }`}
        >
          {analyzing && <div className="ind-load h-full rounded-full bg-forest-600" />}
        </div>

        <main className="mx-auto max-w-[1480px] p-4 sm:p-6">
          <div key={page} className="anim-in">
            {page === "dashboard" && <DashboardPage />}
            {page === "location" && <LocationSelectionPage />}
            {page === "prediction" && <RiskPredictionPage />}
            {page === "forecast" && <ForecastPage />}
            {page === "xai" && <ExplainableAIPage />}
            {page === "map" && <RiskMapPage />}
            {page === "alerts" && <AlertsPage />}
            {page === "settings" && <SettingsPage />}
          </div>

          <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-line pb-4 pt-4 text-[10.5px] text-faint">
            <span>
              AgroShield AI · Explainable AI-based, location-specific pest risk forecasting and early
              warning
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500/80" />
              Frontend prototype using demonstration data. ML model and live environmental
              integrations will be connected during implementation.
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
