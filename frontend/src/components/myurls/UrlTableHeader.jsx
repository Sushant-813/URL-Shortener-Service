import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

// Column definitions. `sortKey` is the value accepted by the backend.
// Columns without a sortKey are not interactive.
const COLUMNS = [
  { label: "Original URL", sortKey: "originalUrl", className: "" },
  { label: "Short URL", sortKey: "shortUrl", className: "" },
  {
    label: "Clicks",
    sortKey: "clickCount",
    className: "hidden md:table-cell",
  },
  {
    label: "Created",
    sortKey: "createdDate",
    className: "hidden md:table-cell",
  },
  { label: "Expires", sortKey: null, className: "hidden lg:table-cell" },
  { label: "Status", sortKey: null, className: "" },
];

// A single sortable column header button.
function SortableHeader({ label, sortKey, activeSortKey, direction, onSort }) {
  const isActive = sortKey === activeSortKey;

  const SortIcon = isActive
    ? direction === "asc"
      ? ChevronUp
      : ChevronDown
    : ChevronsUpDown;

  const ariaSort = isActive ? (direction === "asc" ? "ascending" : "descending") : "none";
  const ariaLabel = `Sort by ${label} ${isActive && direction === "asc" ? "descending" : "ascending"}`;

  return (
    <button
      type="button"
      onClick={() => onSort(sortKey)}
      aria-label={ariaLabel}
      className="
        inline-flex items-center gap-1 text-xs font-medium uppercase
        tracking-wider text-[var(--color-text-muted)] transition-colors
        hover:text-[var(--color-text-primary)]
        focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-focus)]
        focus:ring-offset-1 focus:ring-offset-[var(--color-canvas)]
        rounded
      "
    >
      <span className={isActive ? "text-[var(--color-brand-hover)]" : ""}>
        {label}
      </span>
      <SortIcon
        size={12}
        aria-hidden="true"
        className={isActive ? "text-[var(--color-brand-hover)]" : ""}
      />
    </button>
  );
}

// Table header row. Receives sort state and the sort handler from useUrlTable.
function UrlTableHeader({ sortBy, direction, onSort }) {
  return (
    <thead>
      <tr className="border-b border-[var(--color-border-hairline)]">
        {COLUMNS.map((col) => (
          <th
            key={col.label}
            scope="col"
            aria-sort={col.sortKey ? (col.sortKey === sortBy ? (direction === "asc" ? "ascending" : "descending") : "none") : undefined}
            className={`px-4 py-3 text-left ${col.className}`}
          >
            {col.sortKey ? (
              <SortableHeader
                label={col.label}
                sortKey={col.sortKey}
                activeSortKey={sortBy}
                direction={direction}
                onSort={onSort}
              />
            ) : (
              <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                {col.label}
              </span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default UrlTableHeader;
