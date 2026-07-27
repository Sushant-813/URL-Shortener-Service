import { Code2 } from "lucide-react";

function LandingFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--color-border-hairline)] bg-[var(--color-surface-1)]">
      <div className="mx-auto max-w-[var(--dashboard-content-width)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-brand-primary)] text-xs font-bold text-white">
              LF
            </span>
            <div>
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                LinkFlow
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">
                Shorten • Share • Track
              </p>
            </div>
          </div>

          {/* Links & Version info */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-text-muted)]">
            <a
              href="https://github.com/Sushant-813/URL-Shortener-Service"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-focus)] rounded px-1 py-0.5"
              aria-label="LinkFlow GitHub Repository"
            >
              <Code2 size={16} aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <span aria-hidden="true" className="text-[var(--color-border-hairline)]">|</span>
            <span className="font-mono text-xs">Version 1.0</span>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="mt-8 border-t border-[var(--color-border-hairline)] pt-6 text-center text-xs text-[var(--color-text-muted)]">
          <p>© {new Date().getFullYear()} LinkFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;
