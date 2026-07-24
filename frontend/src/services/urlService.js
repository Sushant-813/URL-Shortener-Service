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

const urlService = {
  getRecentUrls,
  getDashboardStats,
};

export default urlService;
