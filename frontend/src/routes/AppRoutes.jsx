import { Navigate, Route, Routes } from "react-router-dom";

import PublicLayout from "../components/layout/PublicLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import MyUrls from "../pages/myurls/MyUrls";
import Analytics from "../pages/analytics/Analytics";
import NotFound from "../pages/errors/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route element={<PublicRoute />}>
        <Route
          path="/login"
          element={
            <PublicLayout>
              <Login />
            </PublicLayout>
          }
        />
        <Route
          path="/register"
          element={
            <PublicLayout>
              <Register />
            </PublicLayout>
          }
        />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/myurls"
          element={
            <DashboardLayout>
              <MyUrls />
            </DashboardLayout>
          }
        />
        <Route
          path="/analytics"
          element={
            <DashboardLayout>
              <Analytics />
            </DashboardLayout>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
