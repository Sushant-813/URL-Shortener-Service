// Status badge configuration — uses only defined CSS custom properties.
const STATUS_CONFIG = {
  active: {
    label: "Active",
    className:
      "border-[var(--color-success)] text-[var(--color-success)]",
  },
  inactive: {
    label: "Inactive",
    className:
      "border-[var(--color-text-muted)] text-[var(--color-text-muted)]",
  },
  expired: {
    label: "Expired",
    className:
      "border-[var(--color-danger)] text-[var(--color-danger)]",
  },
};

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.inactive;

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded border px-2 py-0.5 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}

function RecentUrlItem({ originalUrl, shortUrl, clickCount, status, createdDate }) {
  return (
    <li className="py-4 first:pt-0 last:pb-0">
      {/*
        Desktop (md+): single flex row.
          - Original URL expands to fill available space and truncates.
          - Secondary info stays fixed on the right.
        Mobile: stacked column.
      */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">

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

          <StatusBadge status={status} />

          <span className="text-sm text-[var(--color-text-muted)]">
            {createdDate}
          </span>
        </div>

      </div>
    </li>
  );
}

export default RecentUrlItem;
