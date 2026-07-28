import apiClient from "./apiClient";

// Fetch the five most recent URLs for the authenticated user.
//
// Uses the default sort (createdDate desc) which the backend already applies.
// Only page=0 and size=5 are specified — all other parameters take defaults.
async function getRecentUrls() {
  const response = await apiClient.get("/api/urls/myurls", {
    params: {
      page: 0,
      size: 5,
    },
  });

  // The endpoint returns a Spring Page object.
  // The actual URL items live in the `content` array.
  return response.data.content;
}

// Fetch dashboard statistics for the authenticated user.
//
// There is no dedicated stats endpoint. All four statistics are derived from
// a single call to /api/urls/myurls with a large page size so that every
// non-deleted URL is returned in one response.
//
// Derivation:
//   totalUrls    — page.totalElements (authoritative DB count, non-deleted only)
//   activeUrls   — content items where active === true AND not expired
//   totalClicks  — sum of clickCount across all content items
//   unavailable  — content items where active === false OR expired
async function getDashboardStats() {
  const response = await apiClient.get("/api/urls/myurls", {
    params: {
      page: 0,
      size: 10000,
    },
  });

  const page = response.data;
  const urls = page.content;
  const now = new Date();

  function isExpired(expirationDate) {
    return expirationDate !== null && new Date(expirationDate) <= now;
  }

  const totalUrls = page.totalElements;

  const activeUrls = urls.filter(
    (url) => url.active && !isExpired(url.expirationDate),
  ).length;

  const totalClicks = urls.reduce((sum, url) => sum + url.clickCount, 0);

  const unavailableUrls = urls.filter(
    (url) => !url.active || isExpired(url.expirationDate),
  ).length;

  return { totalUrls, activeUrls, totalClicks, unavailableUrls };
}

// Create a new short URL for the authenticated user.
//
// originalUrl    – required, the long URL to shorten
// expirationDate – optional JS Date; null means no expiration.
//
// The backend expects `expirationDate` as an ISO-8601 LocalDateTime string
// (e.g. "2026-12-31T23:59:59"). If null, the field is omitted entirely so
// the backend treats it as "no expiration".
async function createShortUrl(originalUrl, expirationDate = null) {
  const body = { originalUrl };

  if (expirationDate instanceof Date) {
    // Drop milliseconds — backend LocalDateTime doesn't use them.
    const pad = (value) => String(value).padStart(2, "0");
    body.expirationDate = `${expirationDate.getFullYear()}-${pad(
      expirationDate.getMonth() + 1,
    )}-${pad(expirationDate.getDate())}T${pad(expirationDate.getHours())}:${pad(
      expirationDate.getMinutes(),
    )}:${pad(expirationDate.getSeconds())}`;
  }

  const response = await apiClient.post("/api/urls/shorten", body);
  return response.data;
}

// Fetch paginated, sorted user URLs.
//
// Returns the full Spring Page object:
//   { content: UrlMappingDTO[], totalElements, totalPages, number, size }
//
// Accepted sortBy values (enforced by backend): createdDate, clickCount, originalUrl, shortUrl
// Accepted direction values: asc, desc
async function getUserUrls(page = 0, size = 10, sortBy = "createdDate", direction = "desc") {
  const response = await apiClient.get("/api/urls/myurls", {
    params: { page, size, sortBy, direction },
  });
  return response.data;
}

// Keyword search across originalUrl and shortUrl fields.
//
// Returns a flat UrlMappingDTO[] (not paginated — the backend returns List<UrlMappingDTO>).
// Caller must not send an empty query — the backend returns 400 for empty strings.
async function searchUrls(query) {
  const response = await apiClient.get("/api/urls/search", {
    params: { query },
  });
  return response.data;
}

// Toggle a URL's active/inactive status.
//
// PATCH /api/urls/{id}/toggle returns the updated UrlMappingDTO.
// The backend flips the current `active` value regardless of expiration state.
async function toggleUrlStatus(id) {
  const response = await apiClient.patch(`/api/urls/${id}/toggle`);
  return response.data;
}

// Soft-delete a URL by ID.
//
// DELETE /api/urls/{id} marks the record as deleted in the database.
// Returns 204 No Content on success.
async function deleteUrl(id) {
  await apiClient.delete(`/api/urls/${id}`);
}

const urlService = {
  getRecentUrls,
  getDashboardStats,
  createShortUrl,
  getUserUrls,
  searchUrls,
  toggleUrlStatus,
  deleteUrl,
};

export default urlService;
