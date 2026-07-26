import { Link2, SearchX } from "lucide-react";

// Empty state displayed inside the URL table when there are no rows to show.
//
// Props:
//   isSearchMode – true when the user has typed a search query.
//   searchQuery  – the current search term (used in the "no results" message).
//   onClearSearch – callback to reset the search input.
function UrlEmptyState({ isSearchMode, searchQuery, onClearSearch }) {
  if (isSearchMode) {
    return (
      <tr>
        <td colSpan={6}>
          <div
            role="status"
            className="flex flex-col items-center py-16 text-center"
          >
            <SearchX
              size={32}
              aria-hidden="true"
              className="text-[var(--color-text-muted)]"
            />
            <p className="mt-4 text-sm font-medium text-[var(--color-text-primary)]">
              No results
            </p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              No URLs match &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={onClearSearch}
              className="
                mt-6 min-h-11 rounded-md px-4 py-2 text-sm font-medium
                bg-[var(--color-surface-2)] text-[var(--color-text-primary)]
                transition-colors hover:bg-[var(--color-surface-3)]
                focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-focus)]
                focus:ring-offset-2 focus:ring-offset-[var(--color-canvas)]
              "
            >
              Clear search
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td colSpan={6}>
        <div
          role="status"
          className="flex flex-col items-center py-16 text-center"
        >
          <Link2
            size={32}
            aria-hidden="true"
            className="text-[var(--color-text-muted)]"
          />
          <p className="mt-4 text-sm font-medium text-[var(--color-text-primary)]">
            No short links yet
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Create your first URL above to see it here.
          </p>
        </div>
      </td>
    </tr>
  );
}

export default UrlEmptyState;
