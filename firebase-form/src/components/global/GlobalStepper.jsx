import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";

const GlobalStepper = ({ steps, activeStep, orientation = "horizontal" }) => {
  return (
    <Stepper activeStep={activeStep} orientation={orientation} sx={{ mb: 4 }}>
      {steps.map((label, index) => (
        <Step key={index}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default GlobalStepper;
