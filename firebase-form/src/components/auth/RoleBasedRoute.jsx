import React from "react";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress, Alert, Paper, Button } from "@mui/material";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

/**
 * RoleBasedRoute Component
 * Protects routes based on user roles
 *
 * @param {Array} allowedRoles - Array of roles that can access this route (e.g., ['moderator', 'doctor', 'patient'])
 * @param {ReactNode} children - Child components to render if authorized
 * @param {string} redirectTo - Path to redirect unauthorized users (default: '/dashboard')
 */
const RoleBasedRoute = ({
  allowedRoles = [],
  children,
  redirectTo = "/dashboard",
}) => {
  const { user, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user's role is in the allowed roles
  const hasAccess = allowedRoles.includes(user.role);

  // If user doesn't have access, show unauthorized page
  if (!hasAccess) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "#f5f5f5",
          p: 3,
        }}
      >
        <Paper
          sx={{
            p: 5,
            maxWidth: 500,
            textAlign: "center",
            boxShadow: 3,
          }}
        >
          <ShieldAlert size={80} color="#d32f2f" style={{ marginBottom: 16 }} />

          <Alert severity="error" sx={{ mb: 3 }}>
            <strong>Access Denied</strong>
          </Alert>

          <Box sx={{ mb: 3 }}>
            <strong style={{ fontSize: "1.2rem" }}>
              You don't have permission to access this page
            </strong>
            <p style={{ color: "#666", marginTop: 8 }}>
              Your current role: <strong>{user.role || "user"}</strong>
            </p>
            <p style={{ color: "#666" }}>
              Required role(s): <strong>{allowedRoles.join(", ")}</strong>
            </p>
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={() => (window.location.href = redirectTo)}
            sx={{ mt: 2 }}
          >
            Go to Dashboard
          </Button>
        </Paper>
      </Box>
    );
  }

  // User has access, render the protected content
  return children;
};

export default RoleBasedRoute;
