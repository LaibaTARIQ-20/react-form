// src/components/profile/BasicProfile.jsx - REFACTORED
import React from "react";
import { Box } from "@mui/material";
import {
  FormSection,
  ControlledTextField,
  ControlledSelect,
  ControlledPhoneInput,
} from "../global";

const BasicProfile = ({ control, errors }) => {
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <FormSection
        icon="📝"
        title="Basic Information"
        description="Please provide your personal details and basic information"
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
          }}
        >
          <ControlledTextField
            name="fullName"
            control={control}
            errors={errors}
            label="Full Name (As per CNIC) *"
            placeholder="Enter your full name"
          />

          <ControlledTextField
            name="fatherName"
            control={control}
            errors={errors}
            label="Father's Name *"
            placeholder="Enter father's name"
          />

          <ControlledSelect
            name="gender"
            control={control}
            errors={errors}
            label="Gender *"
            options={genderOptions}
            placeholder="Select Gender"
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
          }}
        >
          <ControlledTextField
            name="dateOfBirth"
            control={control}
            errors={errors}
            label="Date of Birth *"
            type="date"
          />

          <ControlledTextField
            name="cnic"
            control={control}
            errors={errors}
            label="CNIC/POR NO *"
            placeholder="Enter 13 digit CNIC"
            inputProps={{ maxLength: 13 }}
          />

          <ControlledPhoneInput
            name="mobileNo"
            control={control}
            errors={errors}
            label="Mobile No *"
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
          }}
        >
          <ControlledTextField
            name="email"
            control={control}
            errors={errors}
            label="Email"
            disabled
            sx={{ bgcolor: "#f5f5f5" }}
          />

          <ControlledTextField
            name="district"
            control={control}
            errors={errors}
            label="District of Residence *"
            placeholder="Enter your district"
          />
        </Box>

        <Box>
          <ControlledTextField
            name="postalAddress"
            control={control}
            errors={errors}
            label="Postal Address *"
            placeholder="Enter your complete postal address"
            multiline
            rows={3}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BasicProfile;
