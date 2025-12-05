import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Typography } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RoleBasedRoute from "./components/auth/RoleBasedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import PatientDashboard from "./components/dashboard/PatientDashboard";
import DoctorDashboard from "./components/dashboard/DoctorDashboard";
import ModeratorDashboard from "./components/dashboard/ModeratorDashboard";
import ProfileStepper from "./components/profile/ProfileStepper";
import { useAuth } from "./hooks/useAuth";

// ✅ Smart Dashboard Component - Redirects to correct dashboard based on role
const SmartDashboard = () => {
  const { user } = useAuth();

  // Redirect to role-specific dashboard
  if (user?.role === "moderator") {
    return <Navigate to="/moderator/dashboard" replace />;
  } else if (user?.role === "admin") {
    return <Navigate to="/doctor/dashboard" replace />;
  } else if (user?.role === "user") {
    return <Navigate to="/patient/dashboard" replace />;
  }

  // Fallback
  return <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ========== PUBLIC ROUTES ========== */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />

          {/* ========== SMART DASHBOARD REDIRECT ========== */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <SmartDashboard />
              </ProtectedRoute>
            }
          />

          {/* ========== PATIENT ROUTES (role: "user") ========== */}
          <Route
            path="/patient/dashboard"
            element={
              <RoleBasedRoute allowedRoles={["user"]}>
                <DashboardLayout>
                  <PatientDashboard />
                </DashboardLayout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/patient/records"
            element={
              <RoleBasedRoute allowedRoles={["user"]}>
                <DashboardLayout>
                  <Typography variant="h4">Patient Medical Records</Typography>
                </DashboardLayout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/patient/appointments"
            element={
              <RoleBasedRoute allowedRoles={["user"]}>
                <DashboardLayout>
                  <Typography variant="h4">Patient Appointments</Typography>
                </DashboardLayout>
              </RoleBasedRoute>
            }
          />

          {/* ========== DOCTOR ROUTES (role: "admin") ========== */}
          <Route
            path="/doctor/dashboard"
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <DashboardLayout>
                  <DoctorDashboard />
                </DashboardLayout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/doctor/patients"
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <DashboardLayout>
                  <Typography variant="h4">Manage Patients</Typography>
                </DashboardLayout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/doctor/appointments"
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <DashboardLayout>
                  <Typography variant="h4">Doctor Appointments</Typography>
                </DashboardLayout>
              </RoleBasedRoute>
            }
          />

          {/* ========== MODERATOR ROUTES (role: "moderator") ========== */}
          <Route
            path="/moderator/dashboard"
            element={
              <RoleBasedRoute allowedRoles={["moderator"]}>
                <DashboardLayout>
                  <ModeratorDashboard />
                </DashboardLayout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/moderator/users"
            element={
              <RoleBasedRoute allowedRoles={["moderator"]}>
                <DashboardLayout>
                  <Typography variant="h4">Manage All Users</Typography>
                </DashboardLayout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/moderator/doctors"
            element={
              <RoleBasedRoute allowedRoles={["moderator"]}>
                <DashboardLayout>
                  <Typography variant="h4">Manage All Doctors</Typography>
                </DashboardLayout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/moderator/patients"
            element={
              <RoleBasedRoute allowedRoles={["moderator"]}>
                <DashboardLayout>
                  <Typography variant="h4">Manage All Patients</Typography>
                </DashboardLayout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/moderator/reports"
            element={
              <RoleBasedRoute allowedRoles={["moderator"]}>
                <DashboardLayout>
                  <Typography variant="h4">System Reports</Typography>
                </DashboardLayout>
              </RoleBasedRoute>
            }
          />

          {/* ========== SHARED ROUTES (All authenticated users) ========== */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ProfileStepper />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Typography variant="h4">Settings</Typography>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* ========== DEFAULT ROUTE ========== */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* ========== 404 NOT FOUND ========== */}
          <Route
            path="*"
            element={
              <DashboardLayout>
                <Typography variant="h4">404 - Page Not Found</Typography>
              </DashboardLayout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
