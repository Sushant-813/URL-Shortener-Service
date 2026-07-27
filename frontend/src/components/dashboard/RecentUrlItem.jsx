import Badge from "../ui/Badge";

// Renders a single recent URL row inside the dashboard list.
//
// Props:
//   originalUrl  – full long URL (truncated in display)
//   shortUrl     – 8-char short code
//   clickCount   – total visits
//   status       – "active" | "inactive" | "expired"
//   createdDate  – pre-formatted date string (e.g. "Jul 20, 2026")
function RecentUrlItem({ originalUrl, shortUrl, clickCount, status, createdDate }) {
  return (
    <li className="py-2 first:pt-0 last:pb-0">
      {/*
        Desktop (md+): single flex row.
          - Original URL expands to fill available space and truncates.
          - Secondary info stays fixed on the right.
        Mobile: stacked column.
      */}
      <div className="-mx-2 flex flex-col gap-3 rounded-md px-2 py-2 transition-colors duration-150 hover:bg-[var(--color-surface-2)] md:flex-row md:items-center md:gap-6">

        {/* Primary — original URL */}
        <p
          className="min-w-0 flex-1 truncate text-sm font-medium text-[var(--color-text-primary)]"
          title={originalUrl}
        >
          {originalUrl}
        </p>

        {/* Secondary — short URL, clicks, badge, date */}
        <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2">
          <span className="font-mono text-sm text-[var(--color-text-secondary)]">
            {shortUrl}
          </span>

          <span className="tabular-nums text-sm text-[var(--color-text-muted)]">
            {clickCount.toLocaleString()} clicks
          </span>

          <Badge status={status} />

          <span className="text-sm text-[var(--color-text-muted)]">
            {createdDate}
          </span>
        </div>

      </div>
    </li>
  );
}

export default RecentUrlItem;
