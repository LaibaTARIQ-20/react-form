// src/components/profile/Review.jsx - REFACTORED
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
} from "@mui/material";
import { CheckCircle } from "lucide-react";
import { FormSection, ContentCard, InfoRow } from "../global";

const Review = ({ data, userRole }) => {
  const DocumentPreview = ({ label, file }) => (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        mb={1}
      >
        {label}
      </Typography>
      {file ? (
        <Box>
          <CheckCircle size={40} color="#4caf50" />
          <Typography variant="body2" color="success.main" mt={1}>
            {typeof file === "string" ? "Uploaded" : file.name}
          </Typography>
        </Box>
      ) : (
        <Typography variant="body2" color="error">
          Not uploaded
        </Typography>
      )}
    </Box>
  );

  return (
    <Box sx={{ p: 2 }}>
      <FormSection
        icon="✅"
        title="Review Your Information"
        description="Please review all information before submitting"
      />

      <Box sx={{ textAlign: "center", mb: 4 }}>
        {data.profilePicture ? (
          <Avatar
            src={
              typeof data.profilePicture === "string"
                ? data.profilePicture
                : URL.createObjectURL(data.profilePicture)
            }
            sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
          />
        ) : (
          <Avatar sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}>
            {data.fullName?.charAt(0) || "U"}
          </Avatar>
        )}
        <Typography variant="h6">{data.fullName}</Typography>
        <Typography variant="body2" color="text.secondary">
          {userRole === "doctor" ? "Doctor" : "Patient"}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ContentCard elevation={2}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              📝 Basic Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <TableContainer>
              <Table size="small">
                <TableBody>
                  <InfoRow label="Full Name" value={data.fullName} />
                  <InfoRow label="Father's Name" value={data.fatherName} />
                  <InfoRow label="Gender" value={data.gender} />
                  <InfoRow label="Date of Birth" value={data.dateOfBirth} />
                  <InfoRow label="CNIC" value={data.cnic} />
                  <InfoRow label="Mobile Number" value={data.mobileNo} />
                  <InfoRow label="Email" value={data.email} />
                  <InfoRow label="District" value={data.district} />
                  <InfoRow label="Postal Address" value={data.postalAddress} />
                </TableBody>
              </Table>
            </TableContainer>
          </ContentCard>
        </Grid>

        <Grid item xs={12}>
          <ContentCard elevation={2}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              📄 Documents
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <DocumentPreview
                  label="Profile Picture"
                  file={data.profilePicture}
                />
              </Grid>
              <Grid item xs={4}>
                <DocumentPreview label="CNIC Front" file={data.cnicFront} />
              </Grid>
              <Grid item xs={4}>
                <DocumentPreview label="CNIC Back" file={data.cnicBack} />
              </Grid>
            </Grid>
          </ContentCard>
        </Grid>

        {userRole === "doctor" && (
          <Grid item xs={12}>
            <ContentCard elevation={2}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                🎓 Professional Qualifications
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <InfoRow label="Medical Degree" value={data.degree} />
                    <InfoRow
                      label="Specialization"
                      value={data.specialization}
                    />
                    <InfoRow
                      label="License Number"
                      value={data.licenseNumber}
                    />
                    <InfoRow
                      label="Years of Experience"
                      value={data.experience}
                    />
                    <InfoRow
                      label="Hospital/Clinic"
                      value={data.hospitalName}
                    />
                    <InfoRow
                      label="Consultation Fee"
                      value={
                        data.consultationFee
                          ? `PKR ${data.consultationFee}`
                          : null
                      }
                    />
                    <InfoRow label="Availability" value={data.availability} />
                  </TableBody>
                </Table>
              </TableContainer>
            </ContentCard>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Review;
