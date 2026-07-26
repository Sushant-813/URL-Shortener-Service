import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import ChartSkeleton from "./ChartSkeleton";

// Custom tooltip styled for the dark design system.
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-[var(--color-border-hairline)] bg-[var(--color-surface-3)] px-3 py-2">
      <p className="mb-0.5 text-xs text-[var(--color-text-muted)]">{label}</p>
      <p className="text-sm font-semibold text-[var(--color-text-primary)]">
        {payload[0].value.toLocaleString()} clicks
      </p>
    </div>
  );
}

// Recharts SVG attributes do not resolve CSS custom properties.
const AXIS_TICK_COLOR = "#8a8f98"; // --color-text-muted
const GRID_COLOR = "#23252a"; // --color-border-hairline
const BRAND_COLOR = "#5e6ad2"; // --color-brand-primary
const BAR_HOVER_COLOR = "#1d1e20"; // --color-surface-4 (cursor fill)

// Bar chart for clicks on a single URL over the selected date range.
//
// Props:
//   data         – [{ date: "Jul 20", clicks: 5 }, ...] from buildUrlClicksChartData()
//   isLoading    – boolean; only relevant when hasSelection is true
//   isError      – boolean
//   hasSelection – boolean; false when no URL has been chosen yet
function UrlClicksChart({ data, isLoading, isError, hasSelection }) {
  // No URL selected yet — prompt the user.
  if (!hasSelection) {
    return (
      <div className="flex h-56 items-center justify-center rounded-lg border border-dashed border-[var(--color-border-hairline)]">
        <p className="text-sm text-[var(--color-text-muted)]">
          Select a URL above to view its click breakdown.
        </p>
      </div>
    );
  }

  if (isLoading) return <ChartSkeleton height="h-56" />;

  if (isError) {
    return (
      <div className="flex h-56 items-center justify-center rounded-lg border border-[var(--color-border-hairline)] bg-[var(--color-surface-1)]">
        <p className="text-sm text-[var(--color-text-muted)]">
          Unable to load URL analytics. Please try again.
        </p>
      </div>
    );
  }

  const hasData = data.some((d) => d.clicks > 0);

  if (!hasData) {
    return (
      <div className="flex h-56 items-center justify-center rounded-lg border border-[var(--color-border-hairline)] bg-[var(--color-surface-1)]">
        <p className="text-sm text-[var(--color-text-muted)]">
          No clicks recorded for this URL in the selected range.
        </p>
      </div>
    );
  }

  const xInterval = Math.max(0, Math.ceil(data.length / 7) - 1);

  return (
    <div className="h-56" aria-label="URL clicks over time chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 4, right: 4, bottom: 0, left: -12 }}
        >
          <CartesianGrid
            stroke={GRID_COLOR}
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            interval={xInterval}
            tick={{ fill: AXIS_TICK_COLOR, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: AXIS_TICK_COLOR, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ fill: BAR_HOVER_COLOR }}
          />
          <Bar
            dataKey="clicks"
            fill={BRAND_COLOR}
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UrlClicksChart;
