// src/components/global/FileUploadBox.jsx
import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { Upload, FileText, CheckCircle } from "lucide-react";

const FileUploadBox = ({ label, field, file, error, onFileChange }) => {
  return (
    <Paper
      sx={{
        p: 3,
        textAlign: "center",
        border: "2px dashed #e0e0e0",
        borderRadius: 2,
        transition: "all 0.3s",
        borderColor: error ? "#d32f2f" : "#e0e0e0",
        "&:hover": {
          borderColor: error ? "#d32f2f" : "#1976d2",
          boxShadow: 2,
        },
      }}
    >
      <Box sx={{ mb: 2 }}>
        {file ? (
          <CheckCircle size={48} color="#4caf50" />
        ) : (
          <Upload size={48} color={error ? "#d32f2f" : "#9e9e9e"} />
        )}
      </Box>
      <Typography variant="subtitle1" gutterBottom fontWeight={600}>
        {label}
      </Typography>
      <Typography
        variant="body2"
        color={file ? "success.main" : "text.secondary"}
        sx={{ mb: 2 }}
      >
        {file
          ? typeof file === "string"
            ? "File uploaded"
            : file.name
          : "No file chosen"}
      </Typography>
      {error && (
        <Typography
          variant="caption"
          color="error"
          display="block"
          sx={{ mb: 1 }}
        >
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        component="label"
        startIcon={<FileText size={20} />}
        sx={{ textTransform: "none" }}
      >
        Choose File
        <input
          type="file"
          hidden
          accept="image/*,.pdf"
          onChange={onFileChange}
        />
      </Button>
      <Typography
        variant="caption"
        display="block"
        sx={{ mt: 1, color: "text.secondary" }}
      >
        JPEG, PNG, or PDF (Max 5MB)
      </Typography>
    </Paper>
  );
};

export default FileUploadBox;
