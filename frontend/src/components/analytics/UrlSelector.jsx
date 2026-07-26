// Select element that lets the user choose a URL for per-URL analytics.
//
// Props:
//   urls        – UrlMappingDTO[] (non-deleted, from urlService.getUserUrls)
//   isLoading   – boolean; renders a skeleton while URL list is fetching
//   selectedUrl – the currently selected UrlMappingDTO, or null
//   onSelect    – (UrlMappingDTO | null) => void
function UrlSelector({ urls, isLoading, selectedUrl, onSelect }) {
  if (isLoading) {
    return (
      <div
        role="status"
        aria-label="Loading URL list"
        aria-busy="true"
        className="h-11 w-full max-w-xl animate-pulse rounded-md bg-[var(--color-surface-2)]"
      />
    );
  }

  const isEmpty = !urls?.length;

  function handleChange(e) {
    const shortUrl = e.target.value;
    if (!shortUrl) {
      onSelect(null);
      return;
    }
    const match = (urls ?? []).find((u) => u.shortUrl === shortUrl);
    onSelect(match ?? null);
  }

  return (
    <div>
      <label
        htmlFor="url-selector"
        className="mb-1.5 block text-sm font-medium text-[var(--color-text-secondary)]"
      >
        Select URL
      </label>
      <select
        id="url-selector"
        value={selectedUrl?.shortUrl ?? ""}
        onChange={handleChange}
        disabled={isEmpty}
        className="
          w-full max-w-xl rounded-md border border-[var(--color-border-hairline)]
          bg-[var(--color-surface-2)] px-3 py-2 text-sm text-[var(--color-text-primary)]
          focus:border-[var(--color-brand-primary)] focus:outline-none
          focus:ring-2 focus:ring-[var(--color-brand-focus)]
          disabled:cursor-not-allowed disabled:opacity-50
        "
      >
        <option value="">
          {isEmpty
            ? "No URLs found — shorten a link first."
            : "Choose a URL to inspect…"}
        </option>
        {(urls ?? []).map((url) => {
          const truncated =
            url.originalUrl.length > 60
              ? `${url.originalUrl.slice(0, 60)}…`
              : url.originalUrl;
          return (
            <option key={url.id} value={url.shortUrl}>
              {url.shortUrl} — {truncated}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default UrlSelector;
