import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { useWatch } from "react-hook-form";

const Documents = ({ control, errors, setValue }) => {
  // Use useWatch to get current form values
  const profilePicture = useWatch({ control, name: "profilePicture" });
  const cnicFront = useWatch({ control, name: "cnicFront" });
  const cnicBack = useWatch({ control, name: "cnicBack" });

  const handleFileUpload = (field) => (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
      ];
      if (!validTypes.includes(file.type)) {
        alert("Only JPEG, PNG, and PDF files are allowed");
        return;
      }

      setValue(field, file);
    }
  };

  const DocumentUploadBox = ({ label, field, file }) => (
    <Paper
      sx={{
        p: 3,
        textAlign: "center",
        border: "2px dashed #e0e0e0",
        borderRadius: 2,
        transition: "all 0.3s",
        borderColor: errors[field] ? "#d32f2f" : "#e0e0e0",
        "&:hover": {
          borderColor: errors[field] ? "#d32f2f" : "#1976d2",
          boxShadow: 2,
        },
      }}
    >
      <Box sx={{ mb: 2 }}>
        {file ? (
          <CheckCircle size={48} color="#4caf50" />
        ) : (
          <Upload size={48} color={errors[field] ? "#d32f2f" : "#9e9e9e"} />
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
      {errors[field] && (
        <Typography
          variant="caption"
          color="error"
          display="block"
          sx={{ mb: 1 }}
        >
          {errors[field].message}
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
          onChange={handleFileUpload(field)}
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

  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 3, mb: 4, bgcolor: "#f5f5f5" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          📄 Documents Upload
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Upload your documents (JPEG, PNG, or PDF format). All documents are
          required.
        </Typography>
      </Paper>

      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}
      >
        <DocumentUploadBox
          label="Profile Picture"
          field="profilePicture"
          file={profilePicture}
        />

        <DocumentUploadBox
          label="CNIC Front"
          field="cnicFront"
          file={cnicFront}
        />

        <DocumentUploadBox label="CNIC Back" field="cnicBack" file={cnicBack} />
      </Box>
    </Box>
  );
};

export default Documents;
