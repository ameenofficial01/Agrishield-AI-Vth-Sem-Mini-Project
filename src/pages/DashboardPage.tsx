import AnalysisFilters from "../components/dashboard/AnalysisFilters";
import KpiRow from "../components/dashboard/KpiRow";
import RiskMapCard from "../components/dashboard/RiskMapCard";
import CurrentRiskCard from "../components/dashboard/CurrentRiskCard";
import ForecastChartCard from "../components/dashboard/ForecastChartCard";
import ExplainabilityPanel from "../components/dashboard/ExplainabilityPanel";
import RecommendedActions from "../components/dashboard/RecommendedActions";
import { useApp } from "../context/AppContext";

export default function DashboardPage() {
  const { analysis } = useApp();

  return (
    <div className="space-y-4 sm:space-y-5">
      <AnalysisFilters />

      <div key={analysis.key} className="space-y-4 sm:space-y-5">
        <KpiRow />

        <div className="grid gap-4 sm:gap-5 xl:grid-cols-[1.85fr_1fr]">
          <div className="anim-in">
            <RiskMapCard />
          </div>
          <div className="anim-in anim-in-d1">
            <CurrentRiskCard />
          </div>
        </div>

        <div className="grid gap-4 sm:gap-5 xl:grid-cols-[1.85fr_1fr]">
          <div className="anim-in anim-in-d1">
            <ForecastChartCard />
          </div>
          <div className="anim-in anim-in-d2">
            <ExplainabilityPanel />
          </div>
        </div>

        <RecommendedActions />
      </div>
    </div>
  );
}
