import { useEffect } from "react";
import { Search } from "lucide-react";

import Card from "../ui/Card";
import Input from "../ui/Input";
import ConfirmDialog from "../ui/ConfirmDialog";
import useUrlTable from "../../hooks/useUrlTable";
import useUrlActions from "../../hooks/useUrlActions";
import useToast from "../../hooks/useToast";
import UrlTableHeader from "./UrlTableHeader";
import UrlTableRow from "./UrlTableRow";
import UrlTableSkeleton from "./UrlTableSkeleton";
import UrlEmptyState from "./UrlEmptyState";
import UrlPagination from "./UrlPagination";

// Assembles the full URL management table section.
//
// Props:
//   className – optional Tailwind classes applied to the outer section wrapper.
function UrlTable({ className = "" }) {
  const toast = useToast();

  const {
    items,
    isLoading,
    isError,
    page,
    totalPages,
    sortBy,
    direction,
    searchQuery,
    isSearchMode,
    setSearchQuery,
    setPage,
    handleSort,
  } = useUrlTable();

  const {
    requestToggle,
    requestDelete,
    confirmDelete,
    cancelAction,
    dialogOpen,
    pendingAction,
    isToggling,
    isDeleting,
  } = useUrlActions();

  // Show a toast once when the fetch fails. The query will not retry
  // aggressively because the global QueryClient has retry: 1.
  useEffect(() => {
    if (isError) {
      toast.error("Failed to load your URLs. Please try again.");
    }
  }, [isError]); // eslint-disable-line react-hooks/exhaustive-deps

  const hasRows = items.length > 0;

  return (
    <>
      <section className={`${className}`} aria-labelledby="url-table-heading">
        {/* Section header */}
        <div className="flex items-center justify-between gap-4">
          <h2
            id="url-table-heading"
            className="text-2xl font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]"
          >
            Your URLs
          </h2>

          {/* Item count — hidden while loading or empty */}
          {!isLoading && hasRows && (
            <span className="text-sm text-[var(--color-text-muted)]">
              {isSearchMode
                ? `${items.length} result${items.length !== 1 ? "s" : ""}`
                : null}
            </span>
          )}
        </div>

        <Card className="mt-6 p-0 overflow-hidden">
          {/* Search bar */}
          <div className="flex items-center gap-2 border-b border-[var(--color-border-hairline)] px-4 py-3">
            <Search
              size={14}
              aria-hidden="true"
              className="shrink-0 text-[var(--color-text-muted)]"
            />
            <Input
              type="search"
              placeholder="Search by URL or short code…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search URLs"
              className="border-0 bg-transparent px-0 py-0 text-sm ring-0 focus:ring-0 min-h-0 h-7"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table
              className="w-full border-collapse"
              aria-label="Your short links"
            >
              <UrlTableHeader
                sortBy={sortBy}
                direction={direction}
                onSort={handleSort}
              />
              <tbody>
                {isLoading ? (
                  <UrlTableSkeleton />
                ) : !hasRows ? (
                  <UrlEmptyState
                    isSearchMode={isSearchMode}
                    searchQuery={searchQuery}
                    onClearSearch={() => setSearchQuery("")}
                  />
                ) : (
                  items.map((dto) => (
                    <UrlTableRow
                      key={dto.id}
                      id={dto.id}
                      originalUrl={dto.originalUrl}
                      shortUrl={dto.shortUrl}
                      clickCount={dto.clickCount}
                      active={dto.active}
                      expirationDate={dto.expirationDate}
                      createdDate={dto.createdDate}
                      isToggling={isToggling(dto.id)}
                      isDeleting={isDeleting(dto.id)}
                      onToggle={() => requestToggle(dto.id)}
                      onDelete={() => requestDelete(dto.id, dto.shortUrl)}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination — only visible in non-search mode with multiple pages */}
          {!isSearchMode && (
            <UrlPagination
              page={page}
              totalPages={totalPages}
              onPrev={() => setPage(page - 1)}
              onNext={() => setPage(page + 1)}
              isLoading={isLoading}
            />
          )}
        </Card>
      </section>

      {/* Confirmation dialog — rendered outside the table via portal to body */}
      <ConfirmDialog
        isOpen={dialogOpen}
        title="Delete short link?"
        description={`This will permanently remove the short link "${pendingAction?.shortUrl}". Redirects will stop working immediately.`}
        confirmLabel="Delete"
        confirmVariant="danger"
        onConfirm={confirmDelete}
        onCancel={cancelAction}
        isLoading={pendingAction ? isDeleting(pendingAction.id) : false}
      />
    </>
  );
}

export default UrlTable;

