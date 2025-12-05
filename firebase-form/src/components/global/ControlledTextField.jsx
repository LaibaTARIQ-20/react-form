// src/components/global/ControlledTextField.jsx
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
  rows = 1,
  disabled = false,
  inputProps = {},
  sx = {},
  fullWidth = true,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth={fullWidth}
          label={label}
          type={type}
          multiline={multiline}
          rows={rows}
          disabled={disabled}
          error={!!errors[name]}
          helperText={errors[name]?.message}
          InputLabelProps={{ shrink: true }}
          placeholder={placeholder}
          inputProps={inputProps}
          sx={sx}
        />
      )}
    />
  );
};

export default ControlledTextField;
