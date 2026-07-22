import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";
import useAuth from "../../hooks/useAuth";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <div className="flex justify-end px-6 pt-4">
        <Button onClick={handleLogout} aria-label="Log out of your account">
          Log out
        </Button>
      </div>
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
