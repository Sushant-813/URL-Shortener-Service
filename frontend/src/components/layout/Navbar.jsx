import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function handleSectionClick(sectionId) {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate(`/${sectionId}`);
    } else {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border-hairline)] bg-[var(--color-surface-1)]">
      <div className="mx-auto flex min-h-16 max-w-[var(--dashboard-content-width)] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-focus)]"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-brand-primary)] text-xs font-bold text-white"
            aria-hidden="true"
          >
            LF
          </span>
          <span className="text-sm font-semibold tracking-[-0.01em] text-[var(--color-text-primary)]">
            LinkFlow
          </span>
        </Link>

        {/* Desktop Navigation Links & Actions */}
        <div className="hidden items-center gap-6 md:flex">
          <nav aria-label="Landing page sections" className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => handleSectionClick("#features")}
              className="text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-focus)] rounded px-2 py-1"
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => handleSectionClick("#tech-stack")}
              className="text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-focus)] rounded px-2 py-1"
            >
              Tech Stack
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              onClick={() => navigate("/login")}
              className="text-sm"
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate("/register")}
              className="text-sm"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-md p-2 text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-focus)] md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Collapsible Navigation Menu */}
      {isOpen && (
        <div className="border-t border-[var(--color-border-hairline)] bg-[var(--color-surface-1)] px-4 py-4 md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => handleSectionClick("#features")}
              className="text-left text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] py-2 px-3 rounded hover:bg-[var(--color-surface-2)]"
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => handleSectionClick("#tech-stack")}
              className="text-left text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] py-2 px-3 rounded hover:bg-[var(--color-surface-2)]"
            >
              Tech Stack
            </button>
            <div className="mt-2 flex flex-col gap-2 pt-2 border-t border-[var(--color-border-hairline)]">
              <Button
                variant="secondary"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/login");
                }}
                className="w-full text-center"
              >
                Sign In
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/register");
                }}
                className="w-full text-center"
              >
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
