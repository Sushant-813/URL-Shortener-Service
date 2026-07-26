import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import urlService from "../services/urlService";
import useToast from "./useToast";

// Extract a user-friendly error message from an Axios error.
function getActionErrorMessage(error) {
  const status = error?.response?.status;

  if (status === 401 || status === 403) {
    return "Your session has expired. Please sign in again.";
  }
  if (status === 404) {
    return "URL not found. It may have already been deleted.";
  }
  if (status >= 500) {
    return "Unable to complete the action. Please try again.";
  }
  if (!error?.response) {
    return "Unable to reach the server. Check your connection.";
  }
  return "Unable to complete the action. Please try again.";
}

// Apply an updater to the items array in every cached query that matches the
// ["urls"] prefix. Handles two data shapes:
//   - Flat array (search results): UrlMappingDTO[]
//   - Spring Page object (paginated results): { content: UrlMappingDTO[], ... }
function applyToAllUrlCaches(queryClient, updater) {
  queryClient.setQueriesData({ queryKey: ["urls"] }, (old) => {
    if (!old) return old;
    if (Array.isArray(old)) {
      return updater(old);
    }
    if (old.content !== undefined) {
      return { ...old, content: updater(old.content) };
    }
    return old;
  });
}

// Take a snapshot of every cached query matching the ["urls"] prefix.
// Returns an array of [queryKey, data] pairs for later restoration.
function snapshotUrlCaches(queryClient) {
  return queryClient
    .getQueriesData({ queryKey: ["urls"] })
    .map(([queryKey, data]) => [queryKey, data]);
}

// Restore a previously taken snapshot to its original cache state.
function restoreUrlCaches(queryClient, snapshot) {
  for (const [queryKey, data] of snapshot) {
    queryClient.setQueryData(queryKey, data);
  }
}

// Check whether the URL with the given id is expired in any cached query.
// Used to skip the optimistic active-toggle when the expired badge overrides
// the active/inactive display anyway.
function isUrlExpiredInCache(queryClient, id) {
  const now = new Date();
  for (const [, data] of queryClient.getQueriesData({ queryKey: ["urls"] })) {
    if (!data) continue;
    const items = Array.isArray(data) ? data : (data.content ?? []);
    const item = items.find((u) => u.id === id);
    if (item) {
      return Boolean(item.expirationDate && new Date(item.expirationDate) <= now);
    }
  }
  return false;
}

// Encapsulates URL action mutations (toggle active/inactive, soft delete),
// confirmation dialog state, optimistic updates, and error handling.
//
// Follows the same hook pattern as useUrlTable — business logic stays in the
// hook; components remain presentational.
//
// Returns:
//   requestToggle(id)           – fire toggle mutation directly (no dialog)
//   requestDelete(id, shortUrl) – open confirmation dialog
//   confirmDelete()             – called by dialog confirm button
//   cancelAction()              – called by dialog cancel / Escape
//   dialogOpen                  – boolean
//   pendingAction               – { id, shortUrl } | null
//   isToggling(id)              – true only when toggle mutation targets this id
//   isDeleting(id)              – true only when delete mutation targets this id
function useUrlActions() {
  const queryClient = useQueryClient();
  const toast = useToast();

  // { id: number, shortUrl: string } — the URL awaiting user confirmation.
  const [pendingAction, setPendingAction] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // --- Toggle Mutation -------------------------------------------------------

  const toggleMutation = useMutation({
    mutationFn: (id) => urlService.toggleUrlStatus(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["urls"] });

      // Expired URLs: the UI always shows the "Expired" badge regardless of
      // the active field, so a visual optimistic update would be misleading.
      // Skip it — the server response will still synchronise the cache.
      const expired = isUrlExpiredInCache(queryClient, id);
      if (expired) {
        return { snapshot: null, isExpired: true };
      }

      const snapshot = snapshotUrlCaches(queryClient);

      // Optimistically flip `active` so the badge updates immediately.
      applyToAllUrlCaches(queryClient, (items) =>
        items.map((item) =>
          item.id === id ? { ...item, active: !item.active } : item,
        ),
      );

      return { snapshot, isExpired: false };
    },

    onError: (error, _id, context) => {
      // Roll back only when an optimistic update was applied.
      if (context?.snapshot) {
        restoreUrlCaches(queryClient, context.snapshot);
      }
      toast.error(getActionErrorMessage(error));
    },

    onSuccess: (dto) => {
      // Replace the cached entry with the server-authoritative DTO before the
      // final invalidation. This keeps the frontend accurate if additional
      // fields are introduced to UrlMappingDTO later.
      applyToAllUrlCaches(queryClient, (items) =>
        items.map((item) => (item.id === dto.id ? dto : item)),
      );

      const message = dto.active ? "URL activated." : "URL deactivated.";
      toast.success(message);
    },

    onSettled: () => {
      // Always sync with the server after mutation completes or fails.
      queryClient.invalidateQueries({ queryKey: ["urls"] });
    },
  });

  // --- Delete Mutation -------------------------------------------------------

  const deleteMutation = useMutation({
    mutationFn: (id) => urlService.deleteUrl(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["urls"] });

      const snapshot = snapshotUrlCaches(queryClient);

      // Optimistically remove the row so the table updates instantly.
      applyToAllUrlCaches(queryClient, (items) =>
        items.filter((item) => item.id !== id),
      );

      return { snapshot };
    },

    onError: (error, _id, context) => {
      if (context?.snapshot) {
        restoreUrlCaches(queryClient, context.snapshot);
      }
      // Close the dialog on error — the row will reappear via rollback.
      setDialogOpen(false);
      setPendingAction(null);
      toast.error(getActionErrorMessage(error));
    },

    onSuccess: () => {
      toast.success("URL deleted.");
    },

    onSettled: () => {
      setDialogOpen(false);
      setPendingAction(null);
      queryClient.invalidateQueries({ queryKey: ["urls"] });
    },
  });

  // --- Public API ------------------------------------------------------------

  // Toggle active/inactive — reversible in one click, no confirmation needed.
  function requestToggle(id) {
    toggleMutation.mutate(id);
  }

  // Open the confirmation dialog before soft-deleting.
  function requestDelete(id, shortUrl) {
    setPendingAction({ id, shortUrl });
    setDialogOpen(true);
  }

  // Called by the dialog's confirm button.
  function confirmDelete() {
    if (!pendingAction) return;
    deleteMutation.mutate(pendingAction.id);
  }

  // Called by the dialog's cancel button or Escape key.
  function cancelAction() {
    setDialogOpen(false);
    setPendingAction(null);
  }

  // Returns true only when the toggle mutation is pending for the given id.
  // Scoped per-row so that toggling one URL does not disable other rows.
  function isToggling(id) {
    return toggleMutation.isPending && toggleMutation.variables === id;
  }

  // Returns true only when the delete mutation is pending for the given id.
  function isDeleting(id) {
    return deleteMutation.isPending && pendingAction?.id === id;
  }

  return {
    requestToggle,
    requestDelete,
    confirmDelete,
    cancelAction,
    dialogOpen,
    pendingAction,
    isToggling,
    isDeleting,
  };
}

export default useUrlActions;
