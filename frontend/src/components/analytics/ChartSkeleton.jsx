// A pulsing placeholder block rendered while a chart's data is loading.
// Prefer this over full-page spinners, following the project loading strategy.
//
// Props:
//   height – Tailwind height class, defaults to "h-64" to match TotalClicksChart.
function ChartSkeleton({ height = "h-64" }) {
  return (
    <div
      role="status"
      aria-label="Loading chart"
      aria-busy="true"
      className={`animate-pulse rounded-lg bg-[var(--color-surface-2)] ${height}`}
    />
  );
}

export default ChartSkeleton;
