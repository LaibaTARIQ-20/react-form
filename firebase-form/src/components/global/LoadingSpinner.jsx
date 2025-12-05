// src/components/global/LoadingSpinner.jsx
import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = ({ fullHeight = true }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: fullHeight ? "100vh" : "auto",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
