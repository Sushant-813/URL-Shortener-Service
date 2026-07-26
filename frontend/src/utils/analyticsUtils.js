// Helpers for transforming backend analytics API responses into
// Recharts-friendly data arrays and derived summary statistics.

// Format a JS Date to "YYYY-MM-DD" using local time (not UTC).
// Used to initialise date-range state and to produce chart data keys.
function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Build a continuous array of { key, label } objects for every calendar day
// between startStr and endStr (inclusive). Parses strings as local time to
// avoid UTC-midnight off-by-one issues.
//
// key   – "YYYY-MM-DD" matching backend Map<LocalDate, Long> keys
// label – "Mon D" short label for chart x-axis (e.g. "Jul 20")
function generateDateRange(startStr, endStr) {
  const [sy, sm, sd] = startStr.split("-").map(Number);
  const [ey, em, ed] = endStr.split("-").map(Number);

  const current = new Date(sy, sm - 1, sd);
  const end = new Date(ey, em - 1, ed);
  const dates = [];

  while (current <= end) {
    const y = current.getFullYear();
    const mo = String(current.getMonth() + 1).padStart(2, "0");
    const da = String(current.getDate()).padStart(2, "0");
    dates.push({
      key: `${y}-${mo}-${da}`,
      label: current.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    });
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

// Normalise the sparse Map<LocalDate, Long> returned by
// GET /api/urls/totalClicks into a continuous Recharts data array.
// Days absent from the map are filled with 0.
//
// clickMap shape: { "2026-07-20": 5, "2026-07-22": 3 }
// Output:        [{ date: "Jul 20", clicks: 5 }, { date: "Jul 21", clicks: 0 }, ...]
function buildTotalClicksChartData(clickMap, startStr, endStr) {
  const dates = generateDateRange(startStr, endStr);
  return dates.map(({ key, label }) => ({
    date: label,
    clicks: clickMap[key] ?? 0,
  }));
}

// Normalise the List<ClickEventDTO> returned by
// GET /api/urls/analytics/{shortUrl} into a continuous Recharts data array.
// Days absent from the list are filled with 0.
//
// clickEvents shape: [{ clickDate: "2026-07-20", count: 5 }, ...]
// Output:           [{ date: "Jul 20", clicks: 5 }, { date: "Jul 21", clicks: 0 }, ...]
function buildUrlClicksChartData(clickEvents, startStr, endStr) {
  const eventMap = {};
  for (const event of clickEvents) {
    eventMap[event.clickDate] = Number(event.count);
  }
  const dates = generateDateRange(startStr, endStr);
  return dates.map(({ key, label }) => ({
    date: label,
    clicks: eventMap[key] ?? 0,
  }));
}

// Derive summary statistics from a normalised chart data array.
// Returns safe default values when the array is empty or all-zero.
function computeSummaryStats(chartData) {
  if (!chartData.length) {
    return { total: 0, peakLabel: "—", peakCount: 0, average: "0.0" };
  }

  const total = chartData.reduce((sum, d) => sum + d.clicks, 0);
  const peak = chartData.reduce(
    (max, d) => (d.clicks > max.clicks ? d : max),
    chartData[0],
  );
  const average = (total / chartData.length).toFixed(1);

  return {
    total,
    peakLabel: total > 0 ? peak.date : "—",
    peakCount: peak.clicks,
    average,
  };
}

export {
  toISODate,
  buildTotalClicksChartData,
  buildUrlClicksChartData,
  computeSummaryStats,
};
