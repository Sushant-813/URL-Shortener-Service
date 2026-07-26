// Skeleton placeholder rows rendered while the URL table is loading.
//
// Matches the real table's column layout so the page does not reflow
// when data arrives. Uses animate-pulse per DESIGN.md §17 (no spinners).
const SKELETON_ROW_COUNT = 5;

// A single shimmer block. Width is passed as a Tailwind class string.
function SkeletonCell({ widthClass = "w-full" }) {
  return (
    <td className="px-4 py-3">
      <div
        className={`h-4 animate-pulse rounded bg-[var(--color-surface-3)] ${widthClass}`}
      />
    </td>
  );
}

function UrlTableSkeleton() {
  return Array.from({ length: SKELETON_ROW_COUNT }, (_, i) => (
    <tr key={i} className="border-b border-[var(--color-border-hairline)]">
      {/* Original URL — widest */}
      <SkeletonCell widthClass="w-3/4" />
      {/* Short URL */}
      <SkeletonCell widthClass="w-24" />
      {/* Clicks */}
      <SkeletonCell widthClass="w-12 hidden md:block" />
      {/* Created */}
      <SkeletonCell widthClass="w-24 hidden md:block" />
      {/* Expires */}
      <SkeletonCell widthClass="w-24 hidden lg:block" />
      {/* Status */}
      <SkeletonCell widthClass="w-16" />
      {/* Actions */}
      <SkeletonCell widthClass="w-16" />
    </tr>
  ));
}

export default UrlTableSkeleton;
