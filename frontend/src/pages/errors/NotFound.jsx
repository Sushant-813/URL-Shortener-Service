import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-canvas)] px-4 text-center text-[var(--color-text-primary)]">
      <div>
        <p className="text-sm font-medium text-[var(--color-brand-hover)]">404</p>
        <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">
          The page you requested does not exist or has moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex min-h-11 items-center rounded-md bg-[var(--color-brand-primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-brand-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-focus)]"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
