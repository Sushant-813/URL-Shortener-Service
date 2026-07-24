import { useState } from "react";

import ShortenForm from "../../components/myurls/ShortenForm";
import ShortenResult from "../../components/myurls/ShortenResult";

function MyUrls() {
  const [result, setResult] = useState(null);

  function handleSuccess(dto) {
    setResult(dto);
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

      {/* Phase P: URL table will be assembled here */}
    </section>
  );
}

export default MyUrls;
