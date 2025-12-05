// src/components/auth/RoleBasedRoute.jsx - FIXED AUTO-REDIRECT
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

const RoleBasedRoute = ({ allowedRoles = [], children }) => {
  const { user, loading } = useAuth();

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

  console.log("RoleBasedRoute Check:", {
    userRole: user.role,
    allowedRoles,
    hasAccess,
  });

  // If user doesn't have access, redirect to their correct dashboard
  if (!hasAccess) {
    // Determine correct dashboard based on role
    let redirectPath = "/dashboard"; // Default fallback

    if (user.role === "moderator") {
      redirectPath = "/moderator/dashboard";
    } else if (user.role === "admin" || user.role === "doctor") {
      redirectPath = "/doctor/dashboard";
    } else if (user.role === "user" || user.role === "patient") {
      redirectPath = "/patient/dashboard";
    }

    console.log("Access denied, redirecting to:", redirectPath);

    // Auto-redirect to correct dashboard instead of showing error
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default RoleBasedRoute;
