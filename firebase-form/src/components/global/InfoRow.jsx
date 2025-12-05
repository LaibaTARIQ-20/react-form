// src/components/global/InfoRow.jsx
import React from "react";
import { TableRow, TableCell } from "@mui/material";

const InfoRow = ({ label, value, labelWidth = "40%" }) => {
  return (
    <TableRow>
      <TableCell sx={{ fontWeight: 600, width: labelWidth }}>{label}</TableCell>
      <TableCell>{value || "Not provided"}</TableCell>
    </TableRow>
  );
};

export default InfoRow;
