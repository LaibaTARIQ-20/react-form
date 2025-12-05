import React from "react";
import { Controller } from "react-hook-form";
import { FormControl, Select, MenuItem, Box, Typography } from "@mui/material";

function FormSelectField({
  name,
  control,
  label,
  options = [],
  placeholder = "Please Select",
  rules = {},
  helperText = "",
  size = "small",
  ...props
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <Typography
            variant="body2"
            sx={{
              mb: 0.3,
              fontWeight: 500,
              color: label ? "text.primary" : "transparent",
              fontSize: "0.875rem",
              minHeight: "0.875rem",
            }}
          >
            {label || ""}
          </Typography>
          <FormControl fullWidth error={!!error} size={size}>
            <Select
              {...field}
              displayEmpty
              variant="outlined"
              sx={{
                backgroundColor: "#f5f5f5",
                fontSize: "0.875rem",
                "& .MuiSelect-select": {
                  padding: "8px 12px",
                  color: field.value ? "inherit" : "#999",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: error ? "#d32f2f" : "#ccc",
                },
              }}
              {...props}
            >
              <MenuItem value="" disabled>
                {placeholder}
              </MenuItem>
              {options.map((option) => (
                <MenuItem
                  key={typeof option === "string" ? option : option.value}
                  value={typeof option === "string" ? option : option.value}
                >
                  {typeof option === "string" ? option : option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 0.2,
              color: error ? "error.main" : "text.secondary",
              fontSize: "0.7rem",
              minHeight: "10px",
            }}
          >
            {error ? error.message : helperText}
          </Typography>
        </Box>
      )}
    />
  );
}

export default FormSelectField;
