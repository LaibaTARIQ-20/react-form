import React from "react";
import { useForm } from "react-hook-form";
import { Button, Box, Grid, Typography } from "@mui/material";
import FormTextField from "./formComponents/FormTextField";
import FormSelectField from "./formComponents/FormSelectField";

function Education({ onNext, onBack, defaultValues }) {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues || {},
  });

  const onSubmit = (data) => {
    onNext(data);
  };

  const countries = [
    "United States",
    "Canada",
    "Pakistan",
    "United Kingdom",
    "Australia",
    "Germany",
    "India",
    "China",
    "Japan",
    "Italy",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Education
      </Typography>

      {/* School Name and Graduation Date */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <FormTextField
            name="schoolName"
            control={control}
            label="High School or Equivalent Name"
            rules={{
              required: "School name is required",
              minLength: { value: 2, message: "Minimum 2 characters" },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormTextField
            name="graduationDate"
            control={control}
            label="Graduation Date"
            placeholder="MM-DD-YYYY"
            rules={{
              required: "Graduation date is required",
              pattern: {
                value: /^\d{2}-\d{2}-\d{4}$/,
                message: "Please use MM-DD-YYYY format",
              },
            }}
            helperText="Date"
          />
        </Grid>
      </Grid>

      {/* School Address */}
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold" }}>
        School Address
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <FormTextField
            name="schoolCity"
            control={control}
            label="City"
            rules={{ required: "City is required" }}
            helperText="City"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormTextField
            name="schoolState"
            control={control}
            label="State / Province"
            rules={{ required: "State/Province is required" }}
            helperText="State / Province"
          />
        </Grid>

        <Grid item xs={12}>
          <FormSelectField
            name="schoolCountry"
            control={control}
            options={countries}
            rules={{ required: "Please select a country" }}
            helperText="Country"
          />
        </Grid>
      </Grid>

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          variant="outlined"
          size="large"
          onClick={onBack}
          sx={{ minWidth: 120 }}
        >
          Back
        </Button>

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ minWidth: 120 }}
        >
          Next
        </Button>
      </Box>
    </form>
  );
}

export default Education;
