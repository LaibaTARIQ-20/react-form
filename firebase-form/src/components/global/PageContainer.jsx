// src/components/global/PageContainer.jsx
import React from "react";
import { Box } from "@mui/material";

const PageContainer = ({ children, sx = {} }) => {
  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default PageContainer;
