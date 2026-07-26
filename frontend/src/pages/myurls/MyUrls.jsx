import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import ShortenForm from "../../components/myurls/ShortenForm";
import ShortenResult from "../../components/myurls/ShortenResult";
import UrlTable from "../../components/myurls/UrlTable";

function MyUrls() {
  const [result, setResult] = useState(null);
  const queryClient = useQueryClient();

  function handleSuccess(dto) {
    setResult(dto);
    // Invalidate all URL queries so the table refreshes immediately
    // after a new short link is created.
    queryClient.invalidateQueries({ queryKey: ["urls"] });
  }

  function handleClear() {
    setResult(null);
  }

  return (
    <section aria-labelledby="myurls-heading">
      <h2
        id="myurls-heading"
        className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]"
      >
        My URLs
      </h2>
      <p className="mt-3 text-base text-[var(--color-text-secondary)]">
        Shorten and manage your links.
      </p>

      <ShortenForm onSuccess={handleSuccess} />

      {result && (
        <ShortenResult dto={result} onClear={handleClear} />
      )}

      <UrlTable className="mt-12" />
    </section>
  );
}

export default MyUrls;
