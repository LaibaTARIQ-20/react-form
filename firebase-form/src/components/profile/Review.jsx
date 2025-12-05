// src/components/profile/Review.jsx - REFACTORED WITH GLOBAL COMPONENTS
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  Table,
  TableBody,
  TableContainer,
  Avatar,
  Chip,
  Paper,
} from "@mui/material";
import { CheckCircle, User, FileText, Award } from "lucide-react";
import { FormSection, ContentCard, InfoRow } from "../global";
import { useAuth } from "../../hooks/useAuth";

const Review = ({ data }) => {
  const { user } = useAuth();
  const isDoctor = user?.role === "admin" || user?.role === "doctor";

  // Helper function to display values properly
  const displayValue = (value) => {
    if (value === undefined || value === null || value === "") {
      return "Not provided";
    }
    if (typeof value === "object" && value.name) {
      return value.name; // For file objects
    }
    return value;
  };

  // Document Preview Component
  const DocumentPreview = ({ label, file }) => (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        textAlign: "center",
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        minHeight: "200px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s",
        "&:hover": {
          borderColor: "#4caf50",
          boxShadow: 2,
        },
      }}
    >
      <Box sx={{ mb: 2 }}>
        {file ? (
          <CheckCircle size={40} color="#4caf50" />
        ) : (
          <CheckCircle size={40} color="#e0e0e0" />
        )}
      </Box>
      <Typography variant="subtitle2" fontWeight={600} gutterBottom>
        {label}
      </Typography>
      <Typography
        variant="caption"
        color={file ? "success.main" : "text.secondary"}
        sx={{ mt: 1, mb: 2, wordBreak: "break-word", maxWidth: "100%" }}
      >
        {displayValue(file)}
      </Typography>
      <Chip
        label={file ? "Uploaded" : "Not Uploaded"}
        color={file ? "success" : "default"}
        size="small"
        sx={{ fontSize: "0.7rem" }}
      />
    </Paper>
  );

  return (
    <Box sx={{ p: 2 }}>
      {/* Header Section */}
      <FormSection
        icon="📋"
        title="Review Your Information"
        description="Please review all information before submitting. Make sure everything is accurate."
      />

      {/* Profile Picture & Name Section */}
      <ContentCard elevation={2} sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            py: 2,
          }}
        >
          <Avatar
            src={
              data.profilePicture
                ? typeof data.profilePicture === "string"
                  ? data.profilePicture
                  : URL.createObjectURL(data.profilePicture)
                : undefined
            }
            sx={{
              width: 120,
              height: 120,
              border: "4px solid #1976d2",
              boxShadow: 3,
            }}
          >
            {!data.profilePicture && (data.fullName?.charAt(0) || "U")}
          </Avatar>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" fontWeight={600}>
              {data.fullName || "Not Provided"}
            </Typography>
            <Chip
              label={isDoctor ? "Doctor" : "Patient"}
              color="primary"
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>
      </ContentCard>

      {/* Basic Information Section */}
      <ContentCard elevation={2} sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <User size={24} color="#1976d2" />
          <Typography variant="h6" fontWeight={600} color="#1976d2">
            Basic Information
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <TableContainer>
          <Table>
            <TableBody>
              <InfoRow label="Full Name" value={data.fullName} />
              <InfoRow label="Father's Name" value={data.fatherName} />
              <InfoRow label="Gender" value={data.gender} />
              <InfoRow label="Date of Birth" value={data.dateOfBirth} />
              <InfoRow label="CNIC" value={data.cnic} />
              <InfoRow label="Mobile Number" value={data.phone} />
              <InfoRow label="Email" value={data.email} />
              <InfoRow label="District" value={data.district} />
              <InfoRow label="Postal Address" value={data.address} />
            </TableBody>
          </Table>
        </TableContainer>
      </ContentCard>

      {/* Documents Section */}
      <ContentCard elevation={2} sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <FileText size={24} color="#1976d2" />
          <Typography variant="h6" fontWeight={600} color="#1976d2">
            Documents
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3} sx={{ display: "flex", flexWrap: "wrap" }}>
          <Grid item xs={12} sm={6} md={4}>
            <DocumentPreview
              label="Profile Picture"
              file={data.profilePicture}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DocumentPreview label="CNIC Front" file={data.cnicFront} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DocumentPreview label="CNIC Back" file={data.cnicBack} />
          </Grid>
        </Grid>
      </ContentCard>

      {/* Professional Qualifications Section (Only for Doctors) */}
      {isDoctor ? (
        <ContentCard elevation={2}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
            <Award size={24} color="#1976d2" />
            <Typography variant="h6" fontWeight={600} color="#1976d2">
              Professional Qualifications
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <TableContainer>
            <Table>
              <TableBody>
                <InfoRow label="Medical Degree" value={data.medicalDegree} />
                <InfoRow label="Specialization" value={data.specialization} />
                <InfoRow label="License Number" value={data.licenseNumber} />
                <InfoRow label="Years of Experience" value={data.experience} />
                <InfoRow label="Hospital/Clinic" value={data.hospital} />
                <InfoRow
                  label="Consultation Fee"
                  value={
                    data.consultationFee ? `PKR ${data.consultationFee}` : null
                  }
                />
                <InfoRow label="Availability" value={data.availability} />
              </TableBody>
            </Table>
          </TableContainer>
        </ContentCard>
      ) : (
        <ContentCard
          elevation={2}
          sx={{
            textAlign: "center",
            bgcolor: "#f5f5f5",
            py: 4,
          }}
        >
          <Award size={48} color="#9e9e9e" style={{ marginBottom: 16 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Additional Qualifications Required
          </Typography>
          <Typography variant="body2" color="text.secondary">
            As a patient, you don't need professional qualifications to complete
            your profile.
          </Typography>
        </ContentCard>
      )}

      {/* Footer Note */}
      <Box
        sx={{
          mt: 4,
          p: 3,
          bgcolor: "#e3f2fd",
          borderRadius: 2,
          borderLeft: "4px solid #1976d2",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          ℹ️ <strong>Note:</strong> Once you submit, your profile will be sent
          for verification. You'll receive a notification once it's approved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Review;
