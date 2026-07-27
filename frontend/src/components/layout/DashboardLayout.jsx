import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/myurls": "My URLs",
  "/analytics": "Analytics",
};

function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const pageTitle = PAGE_TITLES[location.pathname] ?? "LinkFlow";

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleLogout() {
    setIsSidebarOpen(false);
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] lg:flex">
      {/* Skip to main content link for keyboard / screen-reader accessibility */}
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

      <Sidebar
        isOpen={isSidebarOpen}
        onNavigate={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
      />

      {isSidebarOpen && (
        <button
          className="fixed inset-0 z-40 bg-[var(--color-overlay)] lg:hidden"
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="min-w-0 flex-1">
        <Topbar
          title={pageTitle}
          isSidebarOpen={isSidebarOpen}
          onMenuClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
        />
        <main
          id="main-content"
          tabIndex={-1}
          className="mx-auto w-full max-w-[var(--dashboard-content-width)] p-4 outline-none sm:p-6 lg:p-8"
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
