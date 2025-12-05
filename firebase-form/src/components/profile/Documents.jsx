// src/components/profile/Documents.jsx - REFACTORED
import React from "react";
import { Box } from "@mui/material";
import { useWatch } from "react-hook-form";
import { FormSection, FileUploadBox } from "../global";

const Documents = ({ control, errors, setValue }) => {
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

  return (
    <Box sx={{ p: 2 }}>
      <FormSection
        icon="📄"
        title="Documents Upload"
        description="Upload your documents (JPEG, PNG, or PDF format). All documents are required."
      />

      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}
      >
        <FileUploadBox
          label="Profile Picture"
          field="profilePicture"
          file={profilePicture}
          error={errors.profilePicture?.message}
          onFileChange={handleFileUpload("profilePicture")}
        />

        <FileUploadBox
          label="CNIC Front"
          field="cnicFront"
          file={cnicFront}
          error={errors.cnicFront?.message}
          onFileChange={handleFileUpload("cnicFront")}
        />

        <FileUploadBox
          label="CNIC Back"
          field="cnicBack"
          file={cnicBack}
          error={errors.cnicBack?.message}
          onFileChange={handleFileUpload("cnicBack")}
        />
      </Box>
    </Box>
  );
};

export default Documents;
