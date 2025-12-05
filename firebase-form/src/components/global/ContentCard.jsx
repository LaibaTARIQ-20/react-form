// src/components/global/ContentCard.jsx
import React from "react";
import { Paper } from "@mui/material";

const ContentCard = ({ children, sx = {}, elevation = 3 }) => {
  return (
    <Paper elevation={elevation} sx={{ p: 4, mb: 4, ...sx }}>
      {children}
    </Paper>
  );
};

export default ContentCard;
