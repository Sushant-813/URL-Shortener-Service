import { useEffect, useRef, useState } from "react";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

// Total visible lifetime of a toast (ms).
const AUTO_DISMISS_MS = 4000;
// Exit animation duration (ms) — matches toastOut keyframe in globals.css.
const EXIT_ANIMATION_MS = 200;
// Fire the exit animation this many ms before the total lifetime expires.
const EXIT_TRIGGER_MS = AUTO_DISMISS_MS - EXIT_ANIMATION_MS; // 3800ms

const TYPE_CONFIG = {
  success: {
    Icon: CheckCircle,
    borderColor: "var(--color-success)",
    iconColor: "var(--color-success)",
    progressColor: "var(--color-success)",
    label: "Success notification",
  },
  error: {
    Icon: XCircle,
    borderColor: "var(--color-danger)",
    iconColor: "var(--color-danger)",
    progressColor: "var(--color-danger)",
    label: "Error notification",
  },
  info: {
    Icon: Info,
    borderColor: "var(--color-brand-primary)",
    iconColor: "var(--color-brand-primary)",
    progressColor: "var(--color-brand-primary)",
    label: "Info notification",
  },
  warning: {
    Icon: AlertTriangle,
    borderColor: "var(--color-warning)",
    iconColor: "var(--color-warning)",
    progressColor: "var(--color-warning)",
    label: "Warning notification",
  },
};

// Single toast notification.
//
// Props:
//   id        – unique identifier (used as React key by ToastContainer)
//   message   – text to display
//   type      – "success" | "error" | "info" | "warning"
//   onDismiss – called when the toast should be removed from the store
function Toast({ id, message, type = "info", onDismiss }) {
  const config = TYPE_CONFIG[type] ?? TYPE_CONFIG.info;
  const { Icon, borderColor, iconColor, progressColor, label } = config;

  // isDismissing drives the exit animation before the store entry is removed.
  const [isDismissing, setIsDismissing] = useState(false);
  const dismissTimerRef = useRef(null);
  const exitTimerRef = useRef(null);

  // Trigger exit animation then notify the store to remove the entry.
  // Safe to call multiple times — the ref guards prevent duplicate timers.
  function beginDismiss() {
    if (isDismissing) return;
    setIsDismissing(true);
    exitTimerRef.current = setTimeout(() => onDismiss(id), EXIT_ANIMATION_MS);
  }

  useEffect(() => {
    // Fire exit animation at EXIT_TRIGGER_MS (3800ms); total lifetime = 4000ms.
    dismissTimerRef.current = setTimeout(beginDismiss, EXIT_TRIGGER_MS);

    return () => {
      clearTimeout(dismissTimerRef.current);
      clearTimeout(exitTimerRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-label={label}
      style={{ borderLeftColor: borderColor }}
      className={`
        relative flex w-80 flex-col overflow-hidden rounded-lg
        border border-[var(--color-border-hairline)] border-l-[3px]
        bg-[var(--color-surface-2)] shadow-lg
        ${
          isDismissing
            ? "motion-safe:animate-[toastOut_200ms_ease-in_both]"
            : "motion-safe:animate-[slideInRight_200ms_ease-out]"
        }
      `}
    >
      {/* Content row */}
      <div className="flex items-start gap-3 px-4 pt-3 pb-3">
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
          onClick={beginDismiss}
          className="
            -mr-1 -mt-0.5 rounded p-1 text-[var(--color-text-muted)]
            transition-colors duration-150 hover:text-[var(--color-text-primary)]
            focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-focus)]
          "
        >
          <X size={14} aria-hidden="true" />
        </button>
      </div>

      {/* Progress bar — shrinks from 100% to 0 over AUTO_DISMISS_MS.        */}
      {/* transform-origin: left so it shrinks left-to-right.                */}
      <div
        aria-hidden="true"
        className="h-0.5 w-full origin-left motion-safe:animate-[progressShrink_4000ms_linear_forwards] motion-reduce:hidden"
        style={{ backgroundColor: progressColor }}
      />
    </div>
  );
}

export default Toast;
