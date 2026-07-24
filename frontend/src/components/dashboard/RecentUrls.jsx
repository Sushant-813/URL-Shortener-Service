import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../ui/Card";
import urlService from "../../services/urlService";
import RecentUrlItem from "./RecentUrlItem";

// Map the backend UrlMappingDTO to the shape RecentUrlItem expects.
//
// Backend fields:
//   id            – Long
//   originalUrl   – String
//   shortUrl      – String (8-char code, e.g. "HOpozTwU")
//   clickCount    – int
//   active        – boolean
//   expirationDate – LocalDateTime | null  (ISO-8601 string after JSON serialization)
//   createdDate   – LocalDateTime (ISO-8601 string after JSON serialization)
function mapUrlToItem(dto) {
  return {
    id: dto.id,
    originalUrl: dto.originalUrl,
    shortUrl: dto.shortUrl,
    clickCount: dto.clickCount,
    status: resolveStatus(dto.active, dto.expirationDate),
    createdDate: formatDate(dto.createdDate),
  };
}

// Determine display status from the two backend fields that drive it.
// Priority: expired > inactive > active.
function resolveStatus(active, expirationDate) {
  if (expirationDate && new Date(expirationDate) <= new Date()) {
    return "expired";
  }

  return active ? "active" : "inactive";
}

// Format an ISO-8601 LocalDateTime string ("2026-07-20T14:30:00")
// into a human-readable date ("Jul 20, 2026").
function formatDate(isoString) {
  if (!isoString) {
    return "";
  }

  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// "View all" styled as a secondary button — semantic <Link> (anchor),
// not a <button>, because this is pure navigation.
// min-h-11 satisfies the 44px touch-target accessibility requirement.
const VIEW_ALL_CLASSES = `
  inline-flex min-h-11 items-center rounded-md
  bg-[var(--color-surface-2)] px-4 py-2
  text-sm font-medium text-[var(--color-text-primary)]
  transition-colors hover:bg-[var(--color-surface-3)]
  focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-focus)]
  focus:ring-offset-2 focus:ring-offset-[var(--color-canvas)]
  motion-reduce:transition-none
`;

// Primary CTA for empty state — navigates to the URL creation workflow.
// Uses brand colour to make the intended action clear.
const CREATE_URL_CLASSES = `
  inline-flex min-h-11 items-center rounded-md
  bg-[var(--color-brand-primary)] px-4 py-2
  text-sm font-medium text-white
  transition-colors hover:bg-[var(--color-brand-hover)]
  focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-focus)]
  focus:ring-offset-2 focus:ring-offset-[var(--color-canvas)]
  motion-reduce:transition-none
`;

function RecentUrls() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    let cancelled = false;

    urlService.getRecentUrls().then((items) => {
      if (!cancelled) {
        setUrls(items.map(mapUrlToItem));
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="mt-12" aria-labelledby="recent-urls-heading">

      {/* Section header — always visible, regardless of list state */}
      <div className="flex items-center justify-between gap-4">
        <h2
          id="recent-urls-heading"
          className="text-2xl font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]"
        >
          Recent URLs
        </h2>
        <Link to="/myurls" className={VIEW_ALL_CLASSES}>
          View all
        </Link>
      </div>

      <Card className="mt-6">
        {urls.length > 0 ? (
          // Populated state — URL list with hairline dividers between items.
          <ul
            className="divide-y divide-[var(--color-border-hairline)]"
            aria-label="Recently created URLs"
          >
            {urls.map((url) => (
              <RecentUrlItem key={url.id} {...url} />
            ))}
          </ul>
        ) : (
          // Empty state — shown when the API returns no URLs.
          <div className="flex flex-col items-center py-8 text-center">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">
              No URLs yet
            </p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Create your first short link to see it here.
            </p>
            <Link to="/myurls" className={`mt-6 ${CREATE_URL_CLASSES}`}>
              Create a short URL
            </Link>
          </div>
        )}
      </Card>

    </section>
  );
}

export default RecentUrls;
