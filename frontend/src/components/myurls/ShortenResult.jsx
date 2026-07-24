import { useState } from "react";
import { Copy, Check, ExternalLink, RotateCcw } from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";

const COPY_FEEDBACK_MS = 2000;

// Construct the full redirect URL from the base API URL and the short code.
//
// The backend `shortUrl` field is the 8-char code only (e.g. "HOpozTwU").
// The redirect endpoint lives at {VITE_API_BASE_URL}/{shortCode}.
function buildFullShortUrl(shortCode) {
  const base = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");
  return `${base}/${shortCode}`;
}

// Format an ISO-8601 string to a readable date (e.g. "Jul 25, 2026").
function formatDate(isoString) {
  if (!isoString) return null;
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Post-creation result panel displayed after a URL is successfully shortened.
//
// Props:
//   dto     – UrlMappingDTO returned by the backend
//   onClear – called when the user wants to create another URL
function ShortenResult({ dto, onClear }) {
  const [copied, setCopied] = useState(false);

  const fullShortUrl = buildFullShortUrl(dto.shortUrl);
  const expiresOn = formatDate(dto.expirationDate);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(fullShortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
    } catch {
      // Clipboard API may be unavailable in non-secure contexts; fail silently.
    }
  }

  function handleOpen() {
    window.open(fullShortUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <Card className="mt-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-text-muted)]">
            Short URL created
          </p>

          {/* Short URL — monospace, full width, truncated on overflow */}
          <p
            className="
              mt-2 break-all font-mono text-base font-semibold
              text-[var(--color-brand-hover)]
            "
            aria-label="Your short URL"
          >
            {fullShortUrl}
          </p>

          {/* Original URL */}
          <p
            className="mt-1 truncate text-sm text-[var(--color-text-muted)]"
            title={dto.originalUrl}
          >
            {dto.originalUrl}
          </p>

          {/* Metadata row */}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--color-text-muted)]">
            <span>
              Created{" "}
              <span className="text-[var(--color-text-secondary)]">
                {formatDate(dto.createdDate)}
              </span>
            </span>
            {expiresOn && (
              <span>
                Expires{" "}
                <span className="text-[var(--color-text-secondary)]">
                  {expiresOn}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="mt-5 flex flex-wrap gap-3">
        <Button
          onClick={handleCopy}
          variant="secondary"
          aria-label={copied ? "Copied to clipboard" : "Copy short URL to clipboard"}
          className="flex items-center gap-2"
        >
          {copied ? (
            <>
              <Check size={14} aria-hidden="true" className="text-[var(--color-success)]" />
              Copied!
            </>
          ) : (
            <>
              <Copy size={14} aria-hidden="true" />
              Copy
            </>
          )}
        </Button>

        <Button
          onClick={handleOpen}
          variant="secondary"
          aria-label="Open short URL in a new tab"
          className="flex items-center gap-2"
        >
          <ExternalLink size={14} aria-hidden="true" />
          Open
        </Button>

        <Button
          onClick={onClear}
          variant="secondary"
          aria-label="Dismiss result and create another URL"
          className="flex items-center gap-2 ml-auto"
        >
          <RotateCcw size={14} aria-hidden="true" />
          Create another
        </Button>
      </div>
    </Card>
  );
}

export default ShortenResult;
