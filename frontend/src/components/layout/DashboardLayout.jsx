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

  const pageTitle = PAGE_TITLES[location.pathname] ?? "URL Shortener";

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
        <main className="mx-auto w-full max-w-[var(--dashboard-content-width)] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
