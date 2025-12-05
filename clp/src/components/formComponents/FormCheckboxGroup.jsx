import React from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  FormGroup,
} from "@mui/material";

function FormCheckboxGroup({
  name,
  control,
  options = [],
  rules = {},
  ...props
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl component="fieldset" error={!!error} {...props}>
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={typeof option === "string" ? option : option.value}
                control={
                  <Checkbox
                    checked={
                      value?.[
                        typeof option === "string" ? option : option.value
                      ] || false
                    }
                    onChange={(e) => {
                      const optionValue =
                        typeof option === "string" ? option : option.value;
                      onChange({
                        ...value,
                        [optionValue]: e.target.checked,
                      });
                    }}
                  />
                }
                label={typeof option === "string" ? option : option.label}
              />
            ))}
          </FormGroup>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}

export default FormCheckboxGroup;
