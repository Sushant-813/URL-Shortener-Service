// Status badge used to display a URL's current state.
//
// Props:
//   status – "active" | "inactive" | "expired"
//
// Colours are driven entirely by CSS custom properties so they stay
// consistent with the design system regardless of context.
const STATUS_CONFIG = {
  active: {
    label: "Active",
    className: "border-[var(--color-success)] text-[var(--color-success)]",
  },
  inactive: {
    label: "Inactive",
    className:
      "border-[var(--color-text-muted)] text-[var(--color-text-muted)]",
  },
  expired: {
    label: "Expired",
    className: "border-[var(--color-danger)] text-[var(--color-danger)]",
  },
};

function Badge({ status }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.inactive;

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded border px-2 py-0.5 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}

export default Badge;
