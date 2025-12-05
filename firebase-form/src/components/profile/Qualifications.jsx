import React from "react";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  FormHelperText,
  Grid,
} from "@mui/material";
import { Controller } from "react-hook-form";

const Qualifications = ({ control, errors, userRole }) => {
  // If user is not a doctor, show message
  if (userRole !== "doctor") {
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

  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 3, mb: 4, bgcolor: "#f5f5f5" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          🎓 Professional Qualifications
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please provide your professional credentials and qualifications
        </Typography>
      </Paper>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Row 1: Degree + Specialization */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 3,
          }}
        >
          <Controller
            name="degree"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Medical Degree *"
                error={!!errors.degree}
                helperText={errors.degree?.message}
                InputLabelProps={{ shrink: true }}
                placeholder="e.g., MBBS, MD, DO"
              />
            )}
          />

          <Controller
            name="specialization"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.specialization}>
                <InputLabel shrink id="specialization-label">
                  Specialization *
                </InputLabel>
                <Select
                  {...field}
                  labelId="specialization-label"
                  label="Specialization *"
                  displayEmpty
                  notched
                >
                  <MenuItem value="">
                    <em>Select Specialization</em>
                  </MenuItem>
                  <MenuItem value="General Practitioner">
                    General Practitioner
                  </MenuItem>
                  <MenuItem value="Cardiology">Cardiology</MenuItem>
                  <MenuItem value="Dermatology">Dermatology</MenuItem>
                  <MenuItem value="Endocrinology">Endocrinology</MenuItem>
                  <MenuItem value="Gastroenterology">Gastroenterology</MenuItem>
                  <MenuItem value="Gynecology">Gynecology</MenuItem>
                  <MenuItem value="Hematology">Hematology</MenuItem>
                  <MenuItem value="Nephrology">Nephrology</MenuItem>
                  <MenuItem value="Neurology">Neurology</MenuItem>
                  <MenuItem value="Oncology">Oncology</MenuItem>
                  <MenuItem value="Ophthalmology">Ophthalmology</MenuItem>
                  <MenuItem value="Orthopedics">Orthopedics</MenuItem>
                  <MenuItem value="Pediatrics">Pediatrics</MenuItem>
                  <MenuItem value="Psychiatry">Psychiatry</MenuItem>
                  <MenuItem value="Pulmonology">Pulmonology</MenuItem>
                  <MenuItem value="Radiology">Radiology</MenuItem>
                  <MenuItem value="Rheumatology">Rheumatology</MenuItem>
                  <MenuItem value="Surgery">Surgery</MenuItem>
                  <MenuItem value="Urology">Urology</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {errors.specialization && (
                  <FormHelperText>
                    {errors.specialization.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
        </Box>

        {/* Row 2: License Number + Years of Experience */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 3,
          }}
        >
          <Controller
            name="licenseNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Medical License Number *"
                error={!!errors.licenseNumber}
                helperText={errors.licenseNumber?.message}
                InputLabelProps={{ shrink: true }}
                placeholder="Enter your license number"
              />
            )}
          />

          <Controller
            name="experience"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Years of Experience *"
                type="number"
                error={!!errors.experience}
                helperText={errors.experience?.message}
                InputLabelProps={{ shrink: true }}
                placeholder="Enter years of experience"
                inputProps={{ min: 0, max: 60 }}
              />
            )}
          />
        </Box>

        {/* Row 3: Hospital/Clinic Name + Consultation Fee */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 3,
          }}
        >
          <Controller
            name="hospitalName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Hospital/Clinic Name"
                error={!!errors.hospitalName}
                helperText={errors.hospitalName?.message}
                InputLabelProps={{ shrink: true }}
                placeholder="Enter hospital or clinic name"
              />
            )}
          />

          <Controller
            name="consultationFee"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Consultation Fee (PKR)"
                type="number"
                error={!!errors.consultationFee}
                helperText={errors.consultationFee?.message}
                InputLabelProps={{ shrink: true }}
                placeholder="Enter consultation fee"
                inputProps={{ min: 0 }}
              />
            )}
          />
        </Box>

        {/* Row 4: Availability - Full Width */}
        <Box>
          <Controller
            name="availability"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Availability/Working Hours"
                multiline
                rows={3}
                error={!!errors.availability}
                helperText={errors.availability?.message}
                InputLabelProps={{ shrink: true }}
                placeholder="e.g., Mon-Fri: 9AM-5PM, Sat: 10AM-2PM"
              />
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Qualifications;
