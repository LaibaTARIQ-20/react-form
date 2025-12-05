import React from "react";
import { useForm } from "react-hook-form";
import { Button, Box, Grid, Typography } from "@mui/material";
import FormTextField from "./formComponents/FormTextField";
import FormSelectField from "./formComponents/FormSelectField";
import FormRadioGroup from "./formComponents/FormRadioGroup";

function PersonalInfo({ onNext, defaultValues }) {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues || {},
  });

  const onSubmit = (data) => {
    onNext(data);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 61 }, (_, i) => (2010 - i).toString());

  const countries = [
    "Pakistan",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "India",
    "China",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name Section */}
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
        Name
      </Typography>
      <Grid container spacing={0} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4} sx={{ pr: { sm: 1 }, mb: { xs: 2, sm: 0 } }}>
          <FormTextField
            name="firstName"
            control={control}
            placeholder="First Name"
            rules={{
              required: "First name is required",
              minLength: { value: 2, message: "Minimum 2 characters" },
            }}
            helperText="First Name"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          sx={{ px: { sm: 0.5 }, mb: { xs: 2, sm: 0 } }}
        >
          <FormTextField
            name="middleName"
            control={control}
            placeholder="Middle Name"
            helperText="Middle Name"
          />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ pl: { sm: 1 } }}>
          <FormTextField
            name="lastName"
            control={control}
            placeholder="Last Name"
            rules={{
              required: "Last name is required",
              minLength: { value: 2, message: "Minimum 2 characters" },
            }}
            helperText="Last Name"
          />
        </Grid>
      </Grid>

      {/* Birth Date */}
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
        Birth Date
      </Typography>
      <Grid container spacing={0} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4} sx={{ pr: { sm: 1 }, mb: { xs: 2, sm: 0 } }}>
          <FormSelectField
            name="birthMonth"
            control={control}
            options={months}
            placeholder="Please select a month"
            rules={{ required: "Please select a month" }}
            helperText="Month"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          sx={{ px: { sm: 0.5 }, mb: { xs: 2, sm: 0 } }}
        >
          <FormSelectField
            name="birthDay"
            control={control}
            options={days}
            placeholder="Please select a day"
            rules={{ required: "Please select a day" }}
            helperText="Day"
          />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ pl: { sm: 1 } }}>
          <FormSelectField
            name="birthYear"
            control={control}
            options={years}
            placeholder="Please select a year"
            rules={{ required: "Please select a year" }}
            helperText="Year"
          />
        </Grid>
      </Grid>

      {/* Gender and Country */}
      <Grid container spacing={0} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} sx={{ pr: { sm: 1 }, mb: { xs: 2, sm: 0 } }}>
          <FormRadioGroup
            name="gender"
            control={control}
            label="Gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
            rules={{ required: "Please select your gender" }}
            row
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ pl: { sm: 1 } }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Of which country are you a citizen?
          </Typography>
          <FormSelectField
            name="country"
            control={control}
            options={countries}
            placeholder="Please Select"
            rules={{ required: "Please select a country" }}
          />
        </Grid>
      </Grid>

      {/* Phone and Email */}
      <Grid container spacing={0} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} sx={{ pr: { sm: 1 }, mb: { xs: 2, sm: 0 } }}>
          <FormTextField
            name="phone"
            control={control}
            placeholder="(000) 000-0000"
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^[0-9\s()-]+$/,
                message: "Please enter a valid phone number",
              },
            }}
            helperText="Phone"
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ pl: { sm: 1 } }}>
          <FormTextField
            name="email"
            control={control}
            placeholder="ex: myname@example.com"
            type="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            }}
            helperText="E-mail Address"
          />
        </Grid>
      </Grid>

      {/* Mailing Address */}
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
        Mailing Address
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          <FormTextField
            name="streetAddress"
            control={control}
            placeholder="Street Address"
            rules={{ required: "Street address is required" }}
            helperText="Street Address"
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <FormTextField
            name="streetAddress2"
            control={control}
            placeholder="Street Address Line 2"
            helperText="Street Address Line 2"
          />
        </Box>

        <Grid container spacing={0} sx={{ mb: 2 }}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ pr: { sm: 1 }, mb: { xs: 2, sm: 0 } }}
          >
            <FormTextField
              name="city"
              control={control}
              placeholder="City"
              rules={{ required: "City is required" }}
              helperText="City"
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ pl: { sm: 1 } }}>
            <FormTextField
              name="stateProvince"
              control={control}
              placeholder="State / Province"
              rules={{ required: "State/Province is required" }}
              helperText="State / Province"
            />
          </Grid>
        </Grid>

        <FormTextField
          name="postalCode"
          control={control}
          placeholder="Postal / Zip Code"
          rules={{ required: "Postal code is required" }}
          helperText="Postal / Zip Code"
        />
      </Box>

      {/* Emergency Contact */}
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
        Emergency Contact
      </Typography>
      <Grid container spacing={0} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} sx={{ pr: { sm: 1 }, mb: 2 }}>
          <FormTextField
            name="emergencyFirstName"
            control={control}
            placeholder="First Name"
            rules={{ required: "Emergency contact first name is required" }}
            helperText="First Name"
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ pl: { sm: 1 }, mb: 2 }}>
          <FormTextField
            name="emergencyLastName"
            control={control}
            placeholder="Last Name"
            rules={{ required: "Emergency contact last name is required" }}
            helperText="Last Name"
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ pr: { sm: 1 }, mb: 2 }}>
          <FormTextField
            name="emergencyEmail"
            control={control}
            placeholder="example@example.com"
            type="email"
            rules={{
              required: "Emergency contact email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            }}
            helperText="Email"
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ pl: { sm: 1 }, mb: 2 }}>
          <FormTextField
            name="emergencyRelationship"
            control={control}
            placeholder="Relationship"
            rules={{ required: "Relationship is required" }}
            helperText="Relationship"
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            name="emergencyPhone"
            control={control}
            placeholder="Please enter a valid phone number"
            rules={{
              required: "Emergency contact phone is required",
              pattern: {
                value: /^[0-9\s()-]+$/,
                message: "Please enter a valid phone number",
              },
            }}
            helperText="Phone Number"
          />
        </Grid>
      </Grid>

      {/* Language Question */}
      <FormRadioGroup
        name="languages"
        control={control}
        label="Do you speak any languages other than English?"
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        rules={{ required: "Please select an option" }}
        row
        sx={{ mb: 3 }}
      />

      {/* Next Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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

export default PersonalInfo;
