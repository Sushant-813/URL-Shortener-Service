// Construct the full redirect URL from the base API URL and the short code.
//
// The backend `shortUrl` field is the 8-char code only (e.g. "HOpozTwU").
// The redirect endpoint lives at {VITE_API_BASE_URL}/{shortCode}.
function buildFullShortUrl(shortCode) {
  const base = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");
  return `${base}/${shortCode}`;
}

export default buildFullShortUrl;
