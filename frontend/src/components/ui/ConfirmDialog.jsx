import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import Button from "./Button";

// Generic confirmation dialog — no domain-specific logic.
// All content is configurable through props so it can be reused across phases.
//
// Props:
//   isOpen         – controls visibility
//   title          – dialog heading text
//   description    – body / warning text
//   confirmLabel   – confirm button label (e.g. "Delete")
//   confirmVariant – Button variant for the confirm action ("primary" | "danger")
//   onConfirm      – called when the user presses the confirm button
//   onCancel       – called when the user presses Cancel or Escape
//   isLoading      – disables both buttons and shows loading state on confirm
function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = "Confirm",
  confirmVariant = "danger",
  onConfirm,
  onCancel,
  isLoading = false,
}) {
  const panelRef = useRef(null);

  // Move focus into the dialog panel when it opens so keyboard users are
  // immediately inside the modal context.
  useEffect(() => {
    if (isOpen) {
      panelRef.current?.focus();
    }
  }, [isOpen]);

  // Close on Escape key.
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onCancel();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    // Backdrop — clicking outside the panel calls onCancel.
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "var(--color-overlay)" }}
      aria-hidden="true"
      onClick={onCancel}
    >
      {/* Dialog panel — stop propagation so clicks inside don't close it. */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        tabIndex="-1"
        onClick={(e) => e.stopPropagation()}
        className="
          relative mx-4 w-full max-w-md rounded-lg
          border border-[var(--color-border-hairline)]
          bg-[var(--color-surface-2)] p-6
          focus:outline-none
          motion-safe:animate-[dialogIn_150ms_ease-out]
        "
      >
        <h2
          id="confirm-dialog-title"
          className="text-base font-semibold text-[var(--color-text-primary)]"
        >
          {title}
        </h2>

        <p
          id="confirm-dialog-description"
          className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]"
        >
          {description}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
            className="text-sm"
          >
            Cancel
          </Button>

          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            disabled={isLoading}
            aria-busy={isLoading}
            className="min-w-20 text-sm"
          >
            {isLoading ? "Deleting…" : confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ConfirmDialog;
