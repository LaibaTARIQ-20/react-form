import React from "react";
import { Controller } from "react-hook-form";
import { TextField, Box } from "@mui/material";

function FormTextField({
  name,
  control,
  label,
  placeholder,
  type = "text",
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
      render={({ field, fieldState: { error } }) => (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <TextField
            {...field}
            fullWidth
            label={label}
            placeholder={placeholder}
            type={type}
            error={!!error}
            helperText={error ? error.message : helperText}
            size={size}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#f5f5f5",
              },
              "& .MuiOutlinedInput-input": {
                padding: "8px 12px",
              },
              "& .MuiFormHelperText-root": {
                marginX: 0,
                marginTop: "2px",
                fontSize: "0.7rem",
              },
              "& .MuiInputBase-root": {
                fontSize: "0.875rem",
              },
              "& label": {
                fontSize: "0.875rem",
              },
            }}
            {...props}
          />
        </Box>
      )}
    />
  );
}

export default FormTextField;
