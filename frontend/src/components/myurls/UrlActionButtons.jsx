import { Power, Trash2 } from "lucide-react";

// Action icon buttons for a single URL table row.
//
// Renders two ghost-style buttons:
//   Power  – toggle active / inactive
//   Trash2 – soft delete (opens confirmation dialog via onDelete)
//
// Props:
//   active     – current active state of the URL
//   isExpired  – whether the URL has expired (affects toggle label)
//   isToggling – true when this row's toggle mutation is in flight
//   isDeleting – true when this row's delete mutation is in flight
//   onToggle   – called when the toggle button is pressed
//   onDelete   – called when the delete button is pressed
function UrlActionButtons({
  active,
  isExpired,
  isToggling,
  isDeleting,
  onToggle,
  onDelete,
}) {
  const isDisabled = isToggling || isDeleting || isExpired;

  // Derive toggle aria-label based on current URL state.
  const toggleLabel = isExpired
    ? "Expired URLs cannot be activated"
    : active
      ? "Deactivate URL"
      : "Activate URL";

  return (
    <div className="flex items-center gap-0.5">
      {/* Toggle active / inactive */}
      <button
        type="button"
        title={toggleLabel}
        aria-label={toggleLabel}
        onClick={onToggle}
        disabled={isDisabled}
        className={`
          inline-flex min-h-[44px] min-w-[44px] items-center justify-center
          rounded p-2 transition-colors
          focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-focus)]
          focus:ring-offset-1 focus:ring-offset-[var(--color-canvas)]
          disabled:cursor-not-allowed disabled:opacity-40
          ${
            active && !isExpired
              ? "text-[var(--color-success)] hover:bg-[var(--color-surface-3)]"
              : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-text-primary)]"
          }
        `}
      >
        <Power size={14} aria-hidden="true" />
      </button>

      {/* Soft delete — opens confirmation dialog */}
      <button
        type="button"
        title="Delete short link"
        aria-label="Delete short link"
        onClick={onDelete}
        disabled={isDisabled}
        className="
          inline-flex min-h-[44px] min-w-[44px] items-center justify-center
          rounded p-2 text-[var(--color-text-muted)] transition-colors
          hover:bg-[var(--color-surface-3)] hover:text-[var(--color-danger)]
          focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-focus)]
          focus:ring-offset-1 focus:ring-offset-[var(--color-canvas)]
          disabled:cursor-not-allowed disabled:opacity-40
        "
      >
        <Trash2 size={14} aria-hidden="true" />
      </button>
    </div>
  );
}

export default UrlActionButtons;
