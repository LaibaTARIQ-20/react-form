// src/components/global/ControlledSelect.jsx - WITH VALIDATION SUPPORT
import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";

const ControlledSelect = ({
  name,
  control,
  errors,
  label,
  options = [],
  placeholder = "",
  rules = {},
  sx = {},
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules} // ✅ Pass validation rules to Controller
      render={({ field }) => (
        <FormControl fullWidth error={!!errors[name]} sx={sx}>
          <InputLabel>{label}</InputLabel>
          <Select {...field} label={label} {...props}>
            {placeholder && (
              <MenuItem value="" disabled>
                {placeholder}
              </MenuItem>
            )}
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {errors[name] && (
            <FormHelperText>{errors[name]?.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default ControlledSelect;
