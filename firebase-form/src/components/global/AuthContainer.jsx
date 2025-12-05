// src/components/global/AuthContainer.jsx
import React from "react";
import { Box, Container, Paper, Typography, Alert } from "@mui/material";

const AuthContainer = ({ icon, title, subtitle, error, children, footer }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 5, borderRadius: 3 }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: "#1976d2",
                mb: 2,
              }}
            >
              {icon}
            </Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Form Content */}
          {children}

          {/* Footer */}
          {footer && <Box sx={{ mt: 3, textAlign: "center" }}>{footer}</Box>}
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthContainer;
