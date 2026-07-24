import QuickActions from "../../components/dashboard/QuickActions";
import RecentUrls from "../../components/dashboard/RecentUrls";
import StatisticsGrid from "../../components/dashboard/StatisticsGrid";

function Dashboard() {
  return (
    <section aria-labelledby="dashboard-heading">
      <h2
        id="dashboard-heading"
        className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]"
      >
        Dashboard
      </h2>
      <p className="mt-3 text-base text-[var(--color-text-secondary)]">
        Welcome back. Your link workspace is ready.
      </p>
      <StatisticsGrid />
      <QuickActions />
      <RecentUrls />
    </section>
  );
}

export default Dashboard;
