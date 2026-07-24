import { create } from "zustand";

// Each toast: { id: string, message: string, type: "success"|"error"|"info" }
const useToastStore = create((set) => ({
  toasts: [],

  addToast: (message, type = "info") => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    return id;
  },

  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));

export default useToastStore;
