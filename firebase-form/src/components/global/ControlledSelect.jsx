// src/components/global/ControlledSelect.jsx
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
  placeholder = "Select an option",
  fullWidth = true,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth={fullWidth} error={!!errors[name]}>
          <InputLabel shrink id={`${name}-label`}>
            {label}
          </InputLabel>
          <Select
            {...field}
            labelId={`${name}-label`}
            label={label}
            displayEmpty
            notched
          >
            <MenuItem value="">
              <em>{placeholder}</em>
            </MenuItem>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {errors[name] && (
            <FormHelperText>{errors[name].message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default ControlledSelect;
