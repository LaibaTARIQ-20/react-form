import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Alert,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const RoleBasedRoute = ({
  allowedRoles = [],
  children,
  redirectTo = "/dashboard",
}) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

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

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = allowedRoles.includes(user.role);

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
        <Paper sx={{ p: 5, maxWidth: 500, textAlign: "center", boxShadow: 3 }}>
          <ShieldAlert size={80} color="#d32f2f" style={{ marginBottom: 16 }} />
          <Alert severity="error" sx={{ mb: 3 }}>
            <strong>Access Denied</strong>
          </Alert>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              You don't have permission to access this page
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Your current role: <strong>{user.role || "user"}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Required role(s): <strong>{allowedRoles.join(", ")}</strong>
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate(redirectTo)}
            sx={{ mt: 2 }}
          >
            Go to Your Dashboard
          </Button>
        </Paper>
      </Box>
    );
  }

  return children;
};

export default RoleBasedRoute;
