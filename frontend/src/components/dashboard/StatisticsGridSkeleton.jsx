// Skeleton placeholder grid rendered while Dashboard statistics are loading.
//
// Matches StatisticsGrid layout (4 cards) using animate-pulse per DESIGN.md §17.
const SKELETON_COUNT = 4;

function SkeletonStatCard() {
  return (
    <div className="flex h-full flex-col justify-between rounded-lg border border-[var(--color-border-hairline)] bg-[var(--color-surface-1)] p-6 animate-pulse">
      <div>
        <div className="h-4 w-28 rounded bg-[var(--color-surface-3)]" />
        <div className="mt-4 h-8 w-16 rounded bg-[var(--color-surface-2)]" />
      </div>
      <div className="mt-6 h-4 w-40 rounded bg-[var(--color-surface-3)]" />
    </div>
  );
}

function StatisticsGridSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading statistics"
      className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
    >
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        <SkeletonStatCard key={i} />
      ))}
    </div>
  );
}

export default StatisticsGridSkeleton;
