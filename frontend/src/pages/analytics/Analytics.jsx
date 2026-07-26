import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import analyticsService from "../../services/analyticsService";
import urlService from "../../services/urlService";
import {
  toISODate,
  buildTotalClicksChartData,
  buildUrlClicksChartData,
  computeSummaryStats,
} from "../../utils/analyticsUtils";

import Card from "../../components/ui/Card";
import DateRangePicker from "../../components/analytics/DateRangePicker";
import AnalyticsSummaryCards from "../../components/analytics/AnalyticsSummaryCards";
import TotalClicksChart from "../../components/analytics/TotalClicksChart";
import UrlAnalyticsPanel from "../../components/analytics/UrlAnalyticsPanel";

// Compute the default start date: 6 days before today → last 7 days.
function defaultStartDate() {
  const d = new Date();
  d.setDate(d.getDate() - 6);
  return toISODate(d);
}

function Analytics() {
  // Date range state — stored as "YYYY-MM-DD" strings (matched to <input type="date">).
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(() => toISODate(new Date()));

  // URL selected for per-URL analytics; null = none chosen yet.
  const [selectedUrl, setSelectedUrl] = useState(null);

  // --- Total clicks across all user URLs ---
  // Query key includes dates so the query automatically refetches on date change.
  const totalClicksQuery = useQuery({
    queryKey: ["analytics", "totalClicks", startDate, endDate],
    queryFn: () => analyticsService.getTotalClicks(startDate, endDate),
  });

  // --- URL list for the selector dropdown ---
  // Uses a large page to return all URLs in one call. The `select` option
  // transforms the Spring Page object to a plain array before caching.
  const urlListQuery = useQuery({
    queryKey: ["analytics", "urlList"],
    queryFn: () => urlService.getUserUrls(0, 1000, "createdDate", "desc"),
    select: (data) => data.content,
  });

  // --- Per-URL analytics ---
  // Disabled until a URL is selected. Query key includes dates so changing the
  // date range automatically re-fetches for the already-selected URL.
  const urlAnalyticsQuery = useQuery({
    queryKey: [
      "analytics",
      "url",
      selectedUrl?.shortUrl,
      startDate,
      endDate,
    ],
    queryFn: () =>
      analyticsService.getUrlAnalytics(
        selectedUrl.shortUrl,
        startDate,
        endDate,
      ),
    enabled: selectedUrl !== null,
  });

  // --- Derived chart data (memoised to avoid redundant array allocations) ---

  const totalClicksChartData = useMemo(
    () =>
      buildTotalClicksChartData(
        totalClicksQuery.data ?? {},
        startDate,
        endDate,
      ),
    [totalClicksQuery.data, startDate, endDate],
  );

  const urlClicksChartData = useMemo(
    () =>
      selectedUrl
        ? buildUrlClicksChartData(
            urlAnalyticsQuery.data ?? [],
            startDate,
            endDate,
          )
        : [],
    [urlAnalyticsQuery.data, selectedUrl, startDate, endDate],
  );

  const summaryStats = useMemo(
    () => computeSummaryStats(totalClicksChartData),
    [totalClicksChartData],
  );

  return (
    <section aria-labelledby="analytics-heading">
      {/* Page header */}
      <h2
        id="analytics-heading"
        className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]"
      >
        Analytics
      </h2>
      <p className="mt-3 text-base text-[var(--color-text-secondary)]">
        Track clicks and performance across your shortened URLs.
      </p>

      {/* Date range controls */}
      <div className="mt-8">
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>

      {/* Summary stat cards */}
      <div className="mt-8">
        <AnalyticsSummaryCards
          stats={summaryStats}
          isLoading={totalClicksQuery.isLoading}
        />
      </div>

      {/* Total clicks area chart */}
      <div className="mt-6">
        <Card>
          <h3 className="mb-1 text-base font-semibold text-[var(--color-text-primary)]">
            Total Clicks Over Time
          </h3>
          <p className="mb-5 text-sm text-[var(--color-text-muted)]">
            Aggregate clicks across all your URLs in the selected period.
          </p>
          <TotalClicksChart
            data={totalClicksChartData}
            isLoading={totalClicksQuery.isLoading}
            isError={totalClicksQuery.isError}
          />
        </Card>
      </div>

      {/* Per-URL analytics panel */}
      <div className="mt-6 pb-8">
        <UrlAnalyticsPanel
          urls={urlListQuery.data ?? []}
          urlsLoading={urlListQuery.isLoading}
          selectedUrl={selectedUrl}
          onSelectUrl={setSelectedUrl}
          chartData={urlClicksChartData}
          isLoading={urlAnalyticsQuery.isLoading}
          isError={urlAnalyticsQuery.isError}
        />
      </div>
    </section>
  );
}

export default Analytics;
