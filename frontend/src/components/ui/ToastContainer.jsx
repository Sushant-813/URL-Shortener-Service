import { createPortal } from "react-dom";

import useToastStore from "../../store/toastStore";
import Toast from "./Toast";

// Renders all active toasts in a fixed top-right stack, outside the normal
// DOM hierarchy via a React portal. This avoids z-index conflicts with
// the sidebar and any future modals.
function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  if (toasts.length === 0) {
    return null;
  }

  return createPortal(
    <div
      aria-label="Notifications"
      className="fixed right-4 top-4 z-50 flex flex-col gap-2"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onDismiss={removeToast}
        />
      ))}
    </div>,
    document.body,
  );
}

export default ToastContainer;
