// Skeleton placeholder rows rendered while recent URLs list is loading.
//
// Matches RecentUrlItem layout using animate-pulse per DESIGN.md §17.
const SKELETON_COUNT = 3;

function SkeletonRecentItem() {
  return (
    <li className="py-4 first:pt-0 last:pb-0">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
        {/* Primary — original URL */}
        <div className="h-4 flex-1 rounded bg-[var(--color-surface-3)]" />

        {/* Secondary — short code, clicks, status, date */}
        <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2">
          <div className="h-4 w-20 rounded bg-[var(--color-surface-2)]" />
          <div className="h-4 w-16 rounded bg-[var(--color-surface-3)]" />
          <div className="h-5 w-14 rounded bg-[var(--color-surface-2)]" />
          <div className="h-4 w-20 rounded bg-[var(--color-surface-3)]" />
        </div>
      </div>
    </li>
  );
}

function RecentUrlsSkeleton() {
  return (
    <ul
      role="status"
      aria-label="Loading recent URLs"
      className="divide-y divide-[var(--color-border-hairline)] animate-pulse"
    >
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        <SkeletonRecentItem key={i} />
      ))}
    </ul>
  );
}

export default RecentUrlsSkeleton;
