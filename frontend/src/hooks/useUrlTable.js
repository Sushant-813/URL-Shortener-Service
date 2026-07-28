import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import urlService from "../services/urlService";

const PAGE_SIZE = 10;
const DEBOUNCE_MS = 300;

// Encapsulates all state and data fetching for the URL management table.
//
// Behaviour:
//   - When debouncedQuery is non-empty → search mode: calls searchUrls,
//     pagination and sorting are inactive.
//   - When debouncedQuery is empty → paginated mode: calls getUserUrls with
//     current page, sortBy, and direction.
//
// React Query keys:
//   Paginated: ["urls", "list", page, sortBy, direction]
//   Search:    ["urls", "search", debouncedQuery]
//
// Invalidating ["urls"] covers both keys (prefix match).
function useUrlTable() {
  const [page, setPageIndex] = useState(0);
  const [sortBy, setSortBy] = useState("createdDate");
  const [direction, setDirection] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce the search input so the API is not called on every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const isSearchMode = debouncedQuery.length > 0;

  // Paginated query — active when not in search mode.
  const paginatedQuery = useQuery({
    queryKey: ["urls", "list", page, sortBy, direction],
    queryFn: () => urlService.getUserUrls(page, PAGE_SIZE, sortBy, direction),
    enabled: !isSearchMode,
    // Keep previous page data visible while the next page is loading,
    // so the table does not flash empty during page transitions.
    placeholderData: (previousData) => previousData,
  });

  // Search query — active only when debounced query is non-empty.
  const searchResultQuery = useQuery({
    queryKey: ["urls", "search", debouncedQuery],
    queryFn: () => urlService.searchUrls(debouncedQuery),
    enabled: isSearchMode,
  });

  // Unified derived values regardless of which query is active.
  // The search endpoint returns a flat array, so we normalise it into the
  // same shape as the Spring Page object for consistent rendering.
  const pageData = paginatedQuery.data;
  const items = isSearchMode
    ? (searchResultQuery.data ?? [])
    : (pageData?.content ?? []);
  const totalPages = isSearchMode ? 1 : (pageData?.totalPages ?? 1);
  const isLoading = isSearchMode
    ? searchResultQuery.isLoading
    : paginatedQuery.isLoading;
  const isError = isSearchMode
    ? searchResultQuery.isError
    : paginatedQuery.isError;

  // Toggle sort: same column → flip direction; new column → set desc default.
  function handleSort(column) {
    setPageIndex(0);
    if (column === sortBy) {
      setDirection((prev) => (prev === "desc" ? "asc" : "desc"));
    } else {
      setSortBy(column);
      setDirection("desc");
    }
  }

  function updateSearchQuery(query) {
    setPageIndex(0);
    setSearchQuery(query);
  }

  function setPage(newPage) {
    setPageIndex(newPage);
  }

  return {
    items,
    isLoading,
    isError,
    page,
    totalPages,
    sortBy,
    direction,
    searchQuery,
    isSearchMode,
    setSearchQuery: updateSearchQuery,
    setPage,
    handleSort,
  };
}

export default useUrlTable;
