import Card from "../ui/Card";
import Badge from "../ui/Badge";
import UrlSelector from "./UrlSelector";
import UrlClicksChart from "./UrlClicksChart";

// Resolve display status from raw UrlMappingDTO fields.
// Priority: expired > inactive > active  (mirrors UrlTableRow logic).
function resolveStatus(active, expirationDate) {
  if (expirationDate && new Date(expirationDate) <= new Date()) {
    return "expired";
  }
  return active ? "active" : "inactive";
}

// Metadata strip shown beneath the selector when a URL is selected.
function SelectedUrlMeta({ url }) {
  const status = resolveStatus(url.active, url.expirationDate);

  return (
    <div className="flex flex-col gap-2 rounded-md border border-[var(--color-border-hairline)] bg-[var(--color-surface-2)] px-4 py-3 sm:flex-row sm:items-center sm:gap-3">
      <div className="flex shrink-0 items-center gap-3">
        <Badge status={status} />
        <span className="font-mono text-sm text-[var(--color-brand-hover)]">
          {url.shortUrl}
        </span>
      </div>
      <span
        className="min-w-0 flex-1 truncate text-sm text-[var(--color-text-muted)]"
        title={url.originalUrl}
      >
        {url.originalUrl}
      </span>
      <span className="shrink-0 text-sm text-[var(--color-text-muted)]">
        {url.clickCount.toLocaleString()} total clicks
      </span>
    </div>
  );
}

// Composes the URL selector, selected-URL metadata, and the per-URL bar chart.
//
// Props:
//   urls         – UrlMappingDTO[] for the dropdown
//   urlsLoading  – boolean
//   selectedUrl  – UrlMappingDTO | null
//   onSelectUrl  – (UrlMappingDTO | null) => void
//   chartData    – [{ date, clicks }] from buildUrlClicksChartData()
//   isLoading    – boolean; true while URL analytics query is running
//   isError      – boolean
function UrlAnalyticsPanel({
  urls,
  urlsLoading,
  selectedUrl,
  onSelectUrl,
  chartData,
  isLoading,
  isError,
}) {
  return (
    <Card>
      <h3 className="mb-1 text-base font-semibold text-[var(--color-text-primary)]">
        URL Analytics
      </h3>
      <p className="mb-5 text-sm text-[var(--color-text-muted)]">
        Inspect click performance for an individual link.
      </p>

      <UrlSelector
        urls={urls}
        isLoading={urlsLoading}
        selectedUrl={selectedUrl}
        onSelect={onSelectUrl}
      />

      {selectedUrl && (
        <div className="mt-4">
          <SelectedUrlMeta url={selectedUrl} />
        </div>
      )}

      <div className="mt-6">
        <UrlClicksChart
          data={chartData}
          isLoading={isLoading}
          isError={isError}
          hasSelection={selectedUrl !== null}
        />
      </div>
    </Card>
  );
}

export default UrlAnalyticsPanel;
