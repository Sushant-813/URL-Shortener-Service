import Navbar from "./Navbar";

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)]">
      <a
        href="#main-content"
        className="
          sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50
          rounded-md bg-[var(--color-brand-primary)] px-4 py-2 text-sm font-medium text-white
          shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-focus)]
        "
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
    </div>
  );
}

export default PublicLayout;
