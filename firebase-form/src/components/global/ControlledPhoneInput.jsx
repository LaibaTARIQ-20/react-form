// src/components/global/ControlledPhoneInput.jsx
import React from "react";
import { Controller } from "react-hook-form";
import { MuiTelInput } from "mui-tel-input";

const ControlledPhoneInput = ({
  name,
  control,
  errors,
  label,
  defaultCountry = "PK",
  preferredCountries = ["PK", "US", "GB", "AE", "SA"],
  fullWidth = true,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MuiTelInput
          {...field}
          fullWidth={fullWidth}
          label={label}
          defaultCountry={defaultCountry}
          preferredCountries={preferredCountries}
          forceCallingCode
          focusOnSelectCountry
          error={!!errors[name]}
          helperText={errors[name]?.message}
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  );
};

export default ControlledPhoneInput;
