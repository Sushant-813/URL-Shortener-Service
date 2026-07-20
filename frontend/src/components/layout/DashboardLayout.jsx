import Navbar from "./Navbar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
