// src/components/global/StatCard.jsx
import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";

const StatCard = ({ title, value, icon, bgColor = "#e3f2fd" }) => {
  return (
    <Card
      sx={{
        bgcolor: bgColor,
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          {icon}
          <Typography variant="h6" fontWeight="bold" sx={{ ml: 2 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h3" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;
