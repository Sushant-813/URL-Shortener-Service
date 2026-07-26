import Button from "../ui/Button";

// Pagination strip for the URL table.
//
// Props:
//   page       – current page index (0-based)
//   totalPages – total number of pages from the Spring Page response
//   onPrev     – called when the Previous button is clicked
//   onNext     – called when the Next button is clicked
//   isLoading  – disables buttons while a page transition is in flight
//
// Hidden entirely when totalPages <= 1.
function UrlPagination({ page, totalPages, onPrev, onNext, isLoading }) {
  if (totalPages <= 1) return null;

  const isFirst = page === 0;
  const isLast = page >= totalPages - 1;

  return (
    <div className="flex items-center justify-between border-t border-[var(--color-border-hairline)] px-4 py-3">
      <Button
        variant="secondary"
        onClick={onPrev}
        disabled={isFirst || isLoading}
        aria-label="Previous page"
        aria-disabled={isFirst || isLoading}
        className="text-sm"
      >
        Previous
      </Button>

      <span
        aria-live="polite"
        aria-atomic="true"
        className="text-sm text-[var(--color-text-muted)]"
      >
        Page {page + 1} of {totalPages}
      </span>

      <Button
        variant="secondary"
        onClick={onNext}
        disabled={isLast || isLoading}
        aria-label="Next page"
        aria-disabled={isLast || isLoading}
        className="text-sm"
      >
        Next
      </Button>
    </div>
  );
}

export default UrlPagination;
