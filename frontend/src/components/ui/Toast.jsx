import { useEffect } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

const AUTO_DISMISS_MS = 4000;

const TYPE_CONFIG = {
  success: {
    Icon: CheckCircle,
    borderColor: "var(--color-success)",
    iconColor: "var(--color-success)",
    label: "Success notification",
  },
  error: {
    Icon: XCircle,
    borderColor: "var(--color-danger)",
    iconColor: "var(--color-danger)",
    label: "Error notification",
  },
  info: {
    Icon: Info,
    borderColor: "var(--color-brand-primary)",
    iconColor: "var(--color-brand-primary)",
    label: "Info notification",
  },
};

// Single toast notification.
//
// Props:
//   id        – unique identifier (used as React key by ToastContainer)
//   message   – text to display
//   type      – "success" | "error" | "info"
//   onDismiss – called when the toast should be removed
function Toast({ id, message, type = "info", onDismiss }) {
  const config = TYPE_CONFIG[type] ?? TYPE_CONFIG.info;
  const { Icon, borderColor, iconColor, label } = config;

  // Auto-dismiss after AUTO_DISMISS_MS ms.
  // Cancelled if the component unmounts before the timer fires.
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(id), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-label={label}
      style={{ borderLeftColor: borderColor }}
      className="
        flex w-80 items-start gap-3 rounded-lg border border-[var(--color-border-hairline)]
        border-l-[3px] bg-[var(--color-surface-2)] px-4 py-3 shadow-lg
        motion-safe:animate-[slideInRight_200ms_ease-out]
      "
    >
      <Icon
        size={16}
        aria-hidden="true"
        className="mt-0.5 shrink-0"
        style={{ color: iconColor }}
      />
      <p className="flex-1 text-sm text-[var(--color-text-secondary)]">
        {message}
      </p>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => onDismiss(id)}
        className="
          -mr-1 -mt-0.5 rounded p-1 text-[var(--color-text-muted)]
          transition-colors hover:text-[var(--color-text-primary)]
          focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-focus)]
        "
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  );
}

export default Toast;
