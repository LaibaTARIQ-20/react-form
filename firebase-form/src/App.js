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
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import RoleBasedRoute from "./components/routes/RoleBasedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import PatientDashboard from "./components/dashboard/PatientDashboard";
import DoctorDashboard from "./components/dashboard/DoctorDashboard";
import ModeratorDashboard from "./components/dashboard/ModeratorDashboard";
import ProfileStepper from "./components/profile/ProfileStepper";
import { useAuth } from "./hooks/useAuth";
import { LoadingSpinner } from "./components/global";

// Smart Dashboard - Redirects based on user role
const SmartDashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  console.log("User role:", user.role); // Debug log

  // Handle all possible role variations
  switch (user.role) {
    case "moderator":
      return <Navigate to="/moderator/dashboard" replace />;
    case "admin":
    case "doctor":
      return <Navigate to="/doctor/dashboard" replace />;
    case "user":
    case "patient":
      return <Navigate to="/patient/dashboard" replace />;
    default:
      // If role is not recognized, default to patient
      console.warn("Unknown role:", user.role, "- defaulting to patient");
      return <Navigate to="/patient/dashboard" replace />;
  }
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ========== PUBLIC ROUTES ========== */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginForm />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUpForm />
              </PublicRoute>
            }
          />

          {/* ========== SMART DASHBOARD REDIRECT ========== */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <SmartDashboard />
              </ProtectedRoute>
            }
          />

          {/* ========== PATIENT ROUTES ========== */}
          <Route
            path="/patient/dashboard"
            element={
              <RoleBasedRoute allowedRoles={["user", "patient"]}>
                <DashboardLayout>
                  <PatientDashboard />
                </DashboardLayout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/patient/records"
            element={
              <RoleBasedRoute allowedRoles={["user", "patient"]}>
                <DashboardLayout>
                  <Typography variant="h4">Patient Medical Records</Typography>
                </DashboardLayout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/patient/appointments"
            element={
              <RoleBasedRoute allowedRoles={["user", "patient"]}>
                <DashboardLayout>
                  <Typography variant="h4">Patient Appointments</Typography>
                </DashboardLayout>
              </RoleBasedRoute>
            }
          />

          {/* ========== DOCTOR ROUTES ========== */}
          <Route
            path="/doctor/dashboard"
            element={
              <RoleBasedRoute allowedRoles={["admin", "doctor"]}>
                <DashboardLayout>
                  <DoctorDashboard />
                </DashboardLayout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/doctor/patients"
            element={
              <RoleBasedRoute allowedRoles={["admin", "doctor"]}>
                <DashboardLayout>
                  <Typography variant="h4">Manage Patients</Typography>
                </DashboardLayout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/doctor/appointments"
            element={
              <RoleBasedRoute allowedRoles={["admin", "doctor"]}>
                <DashboardLayout>
                  <Typography variant="h4">Doctor Appointments</Typography>
                </DashboardLayout>
              </RoleBasedRoute>
            }
          />

          {/* ========== MODERATOR ROUTES ========== */}
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

          {/* ========== SHARED ROUTES ========== */}
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
