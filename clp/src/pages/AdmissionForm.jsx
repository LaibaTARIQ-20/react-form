import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Paper, Box } from "@mui/material";
import PersonalInfo from "../components/PersonalInfo";
import Education from "../components/Education";
import Payment from "../components/Payment";

function AdmissionForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleNext = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = (data) => {
    const finalData = { ...formData, ...data };
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Form submitted:", finalData);
      navigate("/thank-you");
    }, 2000);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        px: { xs: 2, sm: 3 },
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, sm: 3 },
          width: "100%",
        }}
      >
        <Box mb={3}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 500,
              mb: 1,
            }}
          >
            COLLEGE ADMISSION FORM
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ fontSize: "0.875rem" }}
          >
            Enter your admission information below
          </Typography>
        </Box>

        {activeStep === 0 && (
          <PersonalInfo onNext={handleNext} defaultValues={formData} />
        )}

        {activeStep === 1 && (
          <Education
            onNext={handleNext}
            onBack={handleBack}
            defaultValues={formData}
          />
        )}

        {activeStep === 2 && (
          <Payment
            onBack={handleBack}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            defaultValues={formData}
          />
        )}
      </Paper>
    </Container>
  );
}

export default AdmissionForm;
