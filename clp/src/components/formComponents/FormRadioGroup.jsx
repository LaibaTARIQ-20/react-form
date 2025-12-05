import React from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  Box,
} from "@mui/material";

function FormRadioGroup({
  name,
  control,
  label,
  options = [],
  rules = {},
  row = false,
  ...props
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <Box sx={{ width: "100%" }}>
          <FormControl
            component="fieldset"
            error={!!error}
            fullWidth
            {...props}
          >
            <FormLabel
              component="legend"
              sx={{
                fontSize: "0.875rem",
                fontWeight: 500,
                mb: 0.5,
                color: "text.primary",
              }}
            >
              {label}
            </FormLabel>
            <RadioGroup
              {...field}
              row={row}
              sx={{
                display: "flex",
                gap: row ? 2 : 1,
                flexDirection: row ? "row" : "column",
              }}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={typeof option === "string" ? option : option.value}
                  value={typeof option === "string" ? option : option.value}
                  control={<Radio size="small" />}
                  label={typeof option === "string" ? option : option.label}
                  sx={{
                    fontSize: "0.875rem",
                    "& .MuiFormControlLabel-label": {
                      fontSize: "0.875rem",
                    },
                  }}
                />
              ))}
            </RadioGroup>
            {error && (
              <FormHelperText sx={{ color: "error.main", mt: 0.5 }}>
                {error.message}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
      )}
    />
  );
}

export default FormRadioGroup;
