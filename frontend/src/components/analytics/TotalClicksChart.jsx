import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import ChartSkeleton from "./ChartSkeleton";

// Custom tooltip rendered by Recharts. Uses Tailwind + CSS-var classes so it
// inherits the design system without hardcoding colours in JSX.
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

// Axis / grid colours must be plain hex values because Recharts renders SVG
// attributes that do not resolve CSS custom properties.
const AXIS_TICK_COLOR = "#8a8f98"; // --color-text-muted
const GRID_COLOR = "#23252a"; // --color-border-hairline
const BRAND_COLOR = "#5e6ad2"; // --color-brand-primary
const CANVAS_COLOR = "#010102"; // --color-canvas

// Area chart for total clicks across all user URLs over the selected date range.
//
// Props:
//   data       – [{ date: "Jul 20", clicks: 5 }, ...] from buildTotalClicksChartData()
//   isLoading  – boolean
//   isError    – boolean
function TotalClicksChart({ data, isLoading, isError }) {
  if (isLoading) return <ChartSkeleton />;

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-[var(--color-border-hairline)] bg-[var(--color-surface-1)]">
        <p className="text-sm text-[var(--color-text-muted)]">
          Unable to load click data. Please try again.
        </p>
      </div>
    );
  }

  const hasData = data.some((d) => d.clicks > 0);

  if (!hasData) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-[var(--color-border-hairline)] bg-[var(--color-surface-1)]">
        <p className="text-sm text-[var(--color-text-muted)]">
          No clicks recorded in this date range.
        </p>
      </div>
    );
  }

  // Limit x-axis labels to ~7 ticks regardless of range length.
  const xInterval = Math.max(0, Math.ceil(data.length / 7) - 1);

  return (
    <div className="h-64" aria-label="Total clicks over time chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -12 }}>
          <defs>
            <linearGradient id="totalClicksGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={BRAND_COLOR} stopOpacity={0.25} />
              <stop offset="95%" stopColor={BRAND_COLOR} stopOpacity={0} />
            </linearGradient>
          </defs>

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
            cursor={{ stroke: "#34343a", strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="clicks"
            stroke={BRAND_COLOR}
            strokeWidth={2}
            fill="url(#totalClicksGradient)"
            dot={false}
            activeDot={{
              r: 4,
              fill: BRAND_COLOR,
              stroke: CANVAS_COLOR,
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TotalClicksChart;
