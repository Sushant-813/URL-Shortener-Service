import { useEffect, useState } from "react";

import urlService from "../../services/urlService";
import StatisticCard from "./StatisticCard";

// Stat definitions — titles and descriptions are fixed UI copy.
// Values are replaced by live data once the fetch resolves.
// On failure, values stay at 0 (no error UI in this phase).
const STAT_DEFINITIONS = [
  {
    key: "totalUrls",
    title: "Total URLs",
    description: "Short links in your workspace.",
  },
  {
    key: "activeUrls",
    title: "Active URLs",
    description: "Links currently available to visitors.",
  },
  {
    key: "totalClicks",
    title: "Total Clicks",
    description: "Visits across all of your short links.",
  },
  {
    key: "unavailableUrls",
    title: "Expired / Inactive URLs",
    description: "Links that are unavailable to visitors.",
  },
];

const EMPTY_STATS = {
  totalUrls: 0,
  activeUrls: 0,
  totalClicks: 0,
  unavailableUrls: 0,
};

function StatisticsGrid() {
  const [stats, setStats] = useState(EMPTY_STATS);

  useEffect(() => {
    let cancelled = false;

    urlService.getDashboardStats().then((data) => {
      if (!cancelled) {
        setStats(data);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const statistics = STAT_DEFINITIONS.map((def) => ({
    title: def.title,
    value: stats[def.key],
    description: def.description,
  }));

  return (
    <section className="mt-12" aria-labelledby="statistics-heading">
      <h2 id="statistics-heading" className="sr-only">
        Link statistics
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statistics.map((statistic) => (
          <StatisticCard key={statistic.title} {...statistic} />
        ))}
      </div>
    </section>
  );
}

export default StatisticsGrid;
