// Format an ISO-8601 LocalDateTime string (e.g. "2026-07-20T14:30:00")
// into a human-readable date (e.g. "Jul 20, 2026").
//
// Returns an empty string when isoString is falsy.
function formatDate(isoString) {
  if (!isoString) return "";

  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default formatDate;
