import Button from "../ui/Button";
import useAuth from "../../hooks/useAuth";

function Topbar({ title, isSidebarOpen, onMenuClick }) {
  const { username } = useAuth();

  return (
    <header className="flex min-h-16 items-center justify-between border-b border-[var(--color-border-hairline)] px-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          variant="secondary"
          className="lg:hidden"
          onClick={onMenuClick}
          aria-label={isSidebarOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isSidebarOpen}
          aria-controls="mobile-sidebar"
        >
          Menu
        </Button>
        <h1 className="truncate text-xl font-semibold tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-2xl">
          {title}
        </h1>
      </div>

      <p className="ml-4 truncate text-sm text-[var(--color-text-secondary)]">
        {username}
      </p>
    </header>
  );
}

export default Topbar;
