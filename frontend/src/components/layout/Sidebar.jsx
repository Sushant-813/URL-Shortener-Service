import { NavLink } from "react-router-dom";

import Button from "../ui/Button";

const NAVIGATION_ITEMS = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "My URLs", to: "/myurls" },
  { label: "Analytics", to: "/analytics" },
];

function Sidebar({ isOpen, onNavigate, onLogout }) {
  return (
    <aside
      id="mobile-sidebar"
      className={`
        fixed inset-y-0 left-0 z-50 flex w-[var(--sidebar-width)] shrink-0
        flex-col border-r border-[var(--color-border-hairline)]
        bg-[var(--color-surface-1)] p-6 transition-transform duration-200
        motion-reduce:transition-none lg:sticky lg:top-0 lg:h-screen lg:visible
        lg:translate-x-0 ${
          isOpen ? "visible translate-x-0" : "invisible -translate-x-full"
        }
      `}
      aria-label="Primary navigation"
    >
      <NavLink
        className="flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-focus)]"
        to="/dashboard"
        onClick={onNavigate}
      >
        <span
          className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-brand-primary)] text-xs font-bold text-white"
          aria-hidden="true"
        >
          US
        </span>
        <span>URL Shortener</span>
      </NavLink>

      <nav className="mt-8" aria-label="Workspace">
        <ul className="space-y-2">
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                className={({ isActive }) => `
                  flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium
                  transition-colors focus:outline-none focus:ring-2
                  focus:ring-[var(--color-brand-focus)] ${
                    isActive
                      ? "bg-[var(--color-surface-3)] text-[var(--color-text-primary)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)]"
                  }
                `}
                to={item.to}
                onClick={onNavigate}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto border-t border-[var(--color-border-hairline)] pt-6">
        <Button
          variant="secondary"
          className="w-full text-left"
          onClick={onLogout}
        >
          Log out
        </Button>
      </div>
    </aside>
  );
}

export default Sidebar;
