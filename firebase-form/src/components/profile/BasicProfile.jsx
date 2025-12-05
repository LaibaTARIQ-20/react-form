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
} from "@mui/material";
import { Controller } from "react-hook-form";
import { MuiTelInput } from "mui-tel-input";

const BasicProfile = ({ control, errors }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 3, mb: 4, bgcolor: "#f5f5f5" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          📝 Basic Information
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please provide your personal details and basic information
        </Typography>
      </Paper>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
          }}
        >
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Full Name (As per CNIC) *"
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                InputLabelProps={{ shrink: true }}
                placeholder="Enter your full name"
              />
            )}
          />

          <Controller
            name="fatherName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Father's Name *"
                error={!!errors.fatherName}
                helperText={errors.fatherName?.message}
                InputLabelProps={{ shrink: true }}
                placeholder="Enter father's name"
              />
            )}
          />

          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.gender}>
                <InputLabel shrink id="gender-label">
                  Gender *
                </InputLabel>
                <Select
                  {...field}
                  labelId="gender-label"
                  label="Gender *"
                  displayEmpty
                  notched
                >
                  <MenuItem value="">
                    <em>Select Gender</em>
                  </MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
                {errors.gender && (
                  <FormHelperText>{errors.gender.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
          }}
        >
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Date of Birth *"
                type="date"
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth?.message}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />

          <Controller
            name="cnic"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="CNIC/POR NO *"
                error={!!errors.cnic}
                helperText={errors.cnic?.message || "13 digits without dashes"}
                inputProps={{ maxLength: 13 }}
                InputLabelProps={{ shrink: true }}
                placeholder="Enter 13 digit CNIC"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 13);
                  field.onChange(value);
                }}
              />
            )}
          />

          <Controller
            name="mobileNo"
            control={control}
            render={({ field }) => (
              <MuiTelInput
                {...field}
                fullWidth
                label="Mobile No *"
                defaultCountry="PK"
                preferredCountries={["PK", "US", "GB", "AE", "SA"]}
                forceCallingCode
                focusOnSelectCountry
                error={!!errors.mobileNo}
                helperText={errors.mobileNo?.message}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
          }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                disabled
                InputLabelProps={{ shrink: true }}
                sx={{ bgcolor: "#f5f5f5" }}
              />
            )}
          />

          <Controller
            name="district"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="District of Residence *"
                error={!!errors.district}
                helperText={errors.district?.message}
                InputLabelProps={{ shrink: true }}
                placeholder="Enter your district"
              />
            )}
          />
        </Box>

        <Box>
          <Controller
            name="postalAddress"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Postal Address *"
                multiline
                rows={3}
                error={!!errors.postalAddress}
                helperText={errors.postalAddress?.message}
                InputLabelProps={{ shrink: true }}
                placeholder="Enter your complete postal address"
              />
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BasicProfile;
