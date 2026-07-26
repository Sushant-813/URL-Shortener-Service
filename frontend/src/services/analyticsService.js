import apiClient from "./apiClient";

// Fetch total clicks per day across all the authenticated user's URLs.
//
// Calls GET /api/urls/totalClicks which expects dates in yyyy-MM-dd format.
// Returns Map<LocalDate, Long> serialised as { "2026-07-20": 5, ... }.
//
// startDate / endDate – "YYYY-MM-DD" strings (as stored in Analytics page state).
async function getTotalClicks(startDate, endDate) {
  const response = await apiClient.get("/api/urls/totalClicks", {
    params: { startDate, endDate },
  });
  return response.data;
}

// Fetch click events for a single short URL within a date range.
//
// Calls GET /api/urls/analytics/{shortUrl} which expects ISO local date-times
// (yyyy-MM-ddTHH:mm:ss). startDate / endDate are "YYYY-MM-DD" strings; this
// function appends T00:00:00 / T23:59:59 to cover the full day boundaries.
//
// Returns List<ClickEventDTO>: [{ clickDate: "2026-07-20", count: 5 }, ...]
async function getUrlAnalytics(shortUrl, startDate, endDate) {
  const response = await apiClient.get(`/api/urls/analytics/${shortUrl}`, {
    params: {
      startDate: `${startDate}T00:00:00`,
      endDate: `${endDate}T23:59:59`,
    },
  });
  return response.data;
}

const analyticsService = { getTotalClicks, getUrlAnalytics };

export default analyticsService;
