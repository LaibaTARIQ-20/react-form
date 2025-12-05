// src/components/profile/Qualifications.jsx - FIXED ROLE DETECTION
import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { FormSection, ControlledTextField, ControlledSelect } from "../global";

const Qualifications = ({ control, errors }) => {
  const { user } = useAuth();

  // Check if user is a doctor based on ACTUAL role stored in Firebase
  // role can be "admin" (doctor) or "doctor"
  const isDoctor =
    user?.role === "admin" ||
    user?.role === "doctor" ||
    user?.displayRole === "doctor";

  console.log("User role in Qualifications:", user?.role); // Debug
  console.log("Is Doctor:", isDoctor); // Debug

  const specializationOptions = [
    { value: "General Practitioner", label: "General Practitioner" },
    { value: "Cardiology", label: "Cardiology" },
    { value: "Dermatology", label: "Dermatology" },
    { value: "Endocrinology", label: "Endocrinology" },
    { value: "Gastroenterology", label: "Gastroenterology" },
    { value: "Gynecology", label: "Gynecology" },
    { value: "Hematology", label: "Hematology" },
    { value: "Nephrology", label: "Nephrology" },
    { value: "Neurology", label: "Neurology" },
    { value: "Oncology", label: "Oncology" },
    { value: "Ophthalmology", label: "Ophthalmology" },
    { value: "Orthopedics", label: "Orthopedics" },
    { value: "Pediatrics", label: "Pediatrics" },
    { value: "Psychiatry", label: "Psychiatry" },
    { value: "Pulmonology", label: "Pulmonology" },
    { value: "Radiology", label: "Radiology" },
    { value: "Rheumatology", label: "Rheumatology" },
    { value: "Surgery", label: "Surgery" },
    { value: "Urology", label: "Urology" },
    { value: "Other", label: "Other" },
  ];

  // If NOT a doctor, show this message
  if (!isDoctor) {
    return (
      <Box sx={{ p: 2 }}>
        <Paper sx={{ p: 4, textAlign: "center", bgcolor: "#f5f5f5" }}>
          <Typography variant="h6" gutterBottom>
            ℹ️ No Additional Qualifications Required
          </Typography>
          <Typography variant="body2" color="text.secondary">
            As a patient, you don't need to provide professional qualifications.
            Please proceed to the next step.
          </Typography>
        </Paper>
      </Box>
    );
  }

  // If IS a doctor, show qualification form
  return (
    <Box sx={{ p: 2 }}>
      <FormSection
        icon="🎓"
        title="Professional Qualifications"
        description="Please provide your professional credentials and qualifications"
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 3,
          }}
        >
          <ControlledTextField
            name="degree"
            control={control}
            errors={errors}
            label="Medical Degree *"
            placeholder="e.g., MBBS, MD, DO"
          />

          <ControlledSelect
            name="specialization"
            control={control}
            errors={errors}
            label="Specialization *"
            options={specializationOptions}
            placeholder="Select Specialization"
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 3,
          }}
        >
          <ControlledTextField
            name="licenseNumber"
            control={control}
            errors={errors}
            label="Medical License Number *"
            placeholder="Enter your license number"
          />

          <ControlledTextField
            name="experience"
            control={control}
            errors={errors}
            label="Years of Experience *"
            placeholder="Enter years of experience"
            type="number"
            inputProps={{ min: 0, max: 60 }}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 3,
          }}
        >
          <ControlledTextField
            name="hospitalName"
            control={control}
            errors={errors}
            label="Hospital/Clinic Name"
            placeholder="Enter hospital or clinic name"
          />

          <ControlledTextField
            name="consultationFee"
            control={control}
            errors={errors}
            label="Consultation Fee (PKR)"
            placeholder="Enter consultation fee"
            type="number"
            inputProps={{ min: 0 }}
          />
        </Box>

        <Box>
          <ControlledTextField
            name="availability"
            control={control}
            errors={errors}
            label="Availability/Working Hours"
            placeholder="e.g., Mon-Fri: 9AM-5PM, Sat: 10AM-2PM"
            multiline
            rows={3}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Qualifications;
