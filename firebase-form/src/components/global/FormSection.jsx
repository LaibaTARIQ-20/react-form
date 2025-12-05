// src/components/global/FormSection.jsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const FormSection = ({ icon, title, description }) => {
  return (
    <Paper sx={{ p: 3, mb: 4, bgcolor: "#f5f5f5" }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        {icon && `${icon} `}
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      )}
    </Paper>
  );
};

export default FormSection;
