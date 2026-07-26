import StatisticCard from "../dashboard/StatisticCard";

// Skeleton that mimics the StatisticCard layout during loading.
function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-lg border border-[var(--color-border-hairline)] bg-[var(--color-surface-1)] p-6">
      <div className="h-3.5 w-1/2 rounded bg-[var(--color-surface-3)]" />
      <div className="mt-4 h-8 w-1/3 rounded bg-[var(--color-surface-2)]" />
      <div className="mt-6 h-3 w-3/4 rounded bg-[var(--color-surface-3)]" />
    </div>
  );
}

// Three summary stat cards derived from the total-clicks data.
//
// Props:
//   stats      – { total, peakLabel, peakCount, average } from computeSummaryStats()
//   isLoading  – boolean; renders skeletons while totalClicksQuery is pending
function AnalyticsSummaryCards({ stats, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatisticCard
        title="Total Clicks"
        value={stats.total.toLocaleString()}
        description="Clicks across all URLs in the selected range"
      />
      <StatisticCard
        title="Peak Day"
        value={stats.peakLabel}
        description={
          stats.total > 0
            ? `${stats.peakCount.toLocaleString()} clicks`
            : "No click data in range"
        }
      />
      <StatisticCard
        title="Daily Average"
        value={stats.average}
        description="Average clicks per day in selected range"
      />
    </div>
  );
}

export default AnalyticsSummaryCards;
