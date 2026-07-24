import useToastStore from "../store/toastStore";

// Convenience hook exposing typed toast helpers.
//
// Usage:
//   const toast = useToast();
//   toast.success("URL created!");
//   toast.error("Something went wrong.");
//   toast.info("Copied to clipboard.");
function useToast() {
  const addToast = useToastStore((state) => state.addToast);

  return {
    success: (message) => addToast(message, "success"),
    error: (message) => addToast(message, "error"),
    info: (message) => addToast(message, "info"),
  };
}

export default useToast;
