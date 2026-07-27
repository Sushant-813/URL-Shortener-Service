import { useState } from "react";
import { Copy, Check } from "lucide-react";

import Badge from "../ui/Badge";
import UrlActionButtons from "./UrlActionButtons";
import formatDate from "../../utils/formatDate";
import buildFullShortUrl from "../../utils/urlUtils";

const COPY_FEEDBACK_MS = 1500;

// Determine display status from the two backend fields.
// Priority: expired > inactive > active.
function resolveStatus(active, expirationDate) {
  if (expirationDate && new Date(expirationDate) <= new Date()) {
    return "expired";
  }
  return active ? "active" : "inactive";
}

// Renders a single data row for one UrlMappingDTO.
//
// Props: the raw UrlMappingDTO fields plus action callbacks from useUrlActions.
function UrlTableRow({
  id,
  originalUrl,
  shortUrl,
  clickCount,
  active,
  expirationDate,
  createdDate,
  isToggling,
  isDeleting,
  onToggle,
  onDelete,
}) {
  const [copied, setCopied] = useState(false);

  const fullShortUrl = buildFullShortUrl(shortUrl);
  const status = resolveStatus(active, expirationDate);
  const isExpired = status === "expired";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(fullShortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
    } catch {
      // Clipboard API may be unavailable in non-secure contexts; fail silently.
    }
  }

  return (
    <tr className="border-b border-[var(--color-border-hairline)] transition-colors duration-150 hover:bg-[var(--color-surface-2)]">

      {/* Original URL — always visible, truncated */}
      <td className="max-w-[240px] px-4 py-3">
        <p
          className="truncate text-sm text-[var(--color-text-primary)]"
          title={originalUrl}
        >
          {originalUrl}
        </p>
      </td>

      {/* Short URL — monospace; click to copy */}
      <td className="px-4 py-3">
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied to clipboard" : `Copy ${fullShortUrl} to clipboard`}
          className="
            group inline-flex items-center gap-1.5 rounded font-mono
            text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand-hover)]
            focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-focus)]
            focus:ring-offset-1 focus:ring-offset-[var(--color-canvas)]
            transition-colors duration-150
          "
        >
          <span className="transition-colors duration-150 group-hover:text-[var(--color-brand-hover)]">{shortUrl}</span>
          {copied ? (
            <Check size={12} aria-hidden="true" className="text-[var(--color-success)]" />
          ) : (
            <Copy
              size={12}
              aria-hidden="true"
              className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
            />
          )}
        </button>
      </td>

      {/* Clicks — hidden on mobile */}
      <td className="hidden px-4 py-3 md:table-cell">
        <span className="tabular-nums text-sm text-[var(--color-text-muted)]">
          {clickCount.toLocaleString()}
        </span>
      </td>

      {/* Created — hidden on mobile */}
      <td className="hidden px-4 py-3 md:table-cell">
        <span className="text-sm text-[var(--color-text-muted)]">
          {formatDate(createdDate)}
        </span>
      </td>

      {/* Expires — hidden below lg */}
      <td className="hidden px-4 py-3 lg:table-cell">
        <span className="text-sm text-[var(--color-text-muted)]">
          {formatDate(expirationDate) || "—"}
        </span>
      </td>

      {/* Status badge — always visible */}
      <td className="px-4 py-3">
        <Badge status={status} />
      </td>

      {/* Actions — always visible */}
      <td className="px-2 py-1">
        <UrlActionButtons
          active={active}
          isExpired={isExpired}
          isToggling={isToggling}
          isDeleting={isDeleting}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      </td>

    </tr>
  );
}

export default UrlTableRow;

