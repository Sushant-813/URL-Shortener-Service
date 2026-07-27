import Card from "../ui/Card";
import StatisticCard from "../dashboard/StatisticCard";
import Badge from "../ui/Badge";
import LandingSectionHeader from "./LandingSectionHeader";

const MOCK_STATS = [
  {
    title: "Total URLs",
    value: "124",
    description: "Short links in your workspace.",
  },
  {
    title: "Active URLs",
    value: "118",
    description: "Links currently available to visitors.",
  },
  {
    title: "Total Clicks",
    value: "45,290",
    description: "Visits across all of your short links.",
  },
  {
    title: "Expired / Inactive URLs",
    value: "6",
    description: "Links that are unavailable to visitors.",
  },
];

const MOCK_RECENT_URLS = [
  {
    id: 1,
    originalUrl: "https://github.com/Sushant-813/URL-Shortener-Service",
    shortUrl: "gh-repo",
    clickCount: 18420,
    status: "active",
    createdDate: "Jul 20, 2026",
  },
  {
    id: 2,
    originalUrl: "https://docs.spring.io/spring-boot/docs/current/reference/html/",
    shortUrl: "springboot",
    clickCount: 12850,
    status: "active",
    createdDate: "Jul 22, 2026",
  },
  {
    id: 3,
    originalUrl: "https://tailwindcss.com/docs/guides/vite",
    shortUrl: "tw-vite",
    clickCount: 8910,
    status: "active",
    createdDate: "Jul 25, 2026",
  },
  {
    id: 4,
    originalUrl: "https://react.dev/blog/2026/07/react-v19",
    shortUrl: "react-19",
    clickCount: 5110,
    status: "inactive",
    createdDate: "Jul 26, 2026",
  },
];

function DashboardPreview() {
  return (
    <section id="dashboard-preview" className="py-12 scroll-mt-20">
      <LandingSectionHeader
        badge="Preview"
        title="Experience the LinkFlow Dashboard"
        description="A fast, data-first management interface designed for speed and clarity."
      />

      {/* Frame container for realistic app preview */}
      <div className="mt-12 overflow-hidden rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-canvas)] p-4 shadow-2xl sm:p-6 lg:p-8">
        {/* Mock topbar / workspace status */}
        <div className="flex items-center justify-between border-b border-[var(--color-border-hairline)] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[var(--color-success)]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
              Workspace Active
            </span>
          </div>
          <span className="text-xs text-[var(--color-text-muted)] font-mono">
            demo.linkflow.app
          </span>
        </div>

        {/* Mock Dashboard Header */}
        <div>
          <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-2xl">
            Dashboard Overview
          </h3>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Welcome back. Here is your real-time link performance.
          </p>
        </div>

        {/* Mock Stat Cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_STATS.map((stat, i) => (
            <StatisticCard key={stat.title} index={i} {...stat} />
          ))}
        </div>

        {/* Mock Recent URLs Card */}
        <Card className="mt-8">
          <div className="flex items-center justify-between border-b border-[var(--color-border-hairline)] pb-4">
            <h4 className="text-base font-semibold text-[var(--color-text-primary)]">
              Recent URLs
            </h4>
            <span className="text-xs text-[var(--color-text-muted)]">
              Showing 4 items
            </span>
          </div>

          <ul className="divide-y divide-[var(--color-border-hairline)]">
            {MOCK_RECENT_URLS.map((url) => (
              <li key={url.id} className="py-3.5 first:pt-3 last:pb-0">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <p
                    className="min-w-0 flex-1 truncate text-sm font-medium text-[var(--color-text-primary)]"
                    title={url.originalUrl}
                  >
                    {url.originalUrl}
                  </p>
                  <div className="flex shrink-0 items-center gap-4 text-xs">
                    <span className="font-mono text-[var(--color-brand-hover)]">
                      {url.shortUrl}
                    </span>
                    <span className="tabular-nums text-[var(--color-text-muted)]">
                      {url.clickCount.toLocaleString()} clicks
                    </span>
                    <Badge status={url.status} />
                    <span className="text-[var(--color-text-muted)] hidden md:inline">
                      {url.createdDate}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}

export default DashboardPreview;
