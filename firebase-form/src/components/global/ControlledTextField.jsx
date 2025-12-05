// src/components/global/ControlledTextField.jsx - WITH VALIDATION SUPPORT
import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const ControlledTextField = ({
  name,
  control,
  errors,
  label,
  placeholder,
  type = "text",
  multiline = false,
  rows = 4,
  rules = {}, // ✅ Accept validation rules
  sx = {},
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules} // ✅ Pass validation rules to Controller
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          placeholder={placeholder}
          type={type}
          multiline={multiline}
          rows={multiline ? rows : undefined}
          error={!!errors[name]}
          helperText={errors[name]?.message}
          variant="outlined"
          sx={sx}
          {...props}
        />
      )}
    />
  );
};

export default ControlledTextField;
