import React from "react";
import { useForm } from "react-hook-form";
import { Button, Box, Typography } from "@mui/material";
import FormCheckboxGroup from "./formComponents/FormCheckboxGroup";

function Payment({ onSubmit, onBack, defaultValues, isSubmitting }) {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues || {
      paymentMethods: {
        creditCard: false,
        mailCheck: false,
        inPerson: false,
      },
    },
  });

  const formSubmit = (data) => {
    onSubmit(data);
  };

  const validatePaymentMethod = (value) => {
    const methods = value || {};
    const hasSelectedMethod =
      methods.creditCard || methods.mailCheck || methods.inPerson;
    return hasSelectedMethod || "Please select at least one payment method";
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <Typography variant="h5" gutterBottom>
        Application Fee
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Payment is due 3 days prior to the start of the class
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Payment Method:
      </Typography>

      <FormCheckboxGroup
        name="paymentMethods"
        control={control}
        options={[
          { value: "creditCard", label: "Credit Card" },
          { value: "mailCheck", label: "Mail a Check" },
          { value: "inPerson", label: "In-person at school" },
        ]}
        rules={{ validate: validatePaymentMethod }}
        sx={{ mb: 4 }}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button
          variant="outlined"
          size="large"
          onClick={onBack}
          disabled={isSubmitting}
          sx={{ minWidth: 120 }}
        >
          Back
        </Button>

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
          sx={{
            minWidth: 120,
            bgcolor: "success.main",
            "&:hover": {
              bgcolor: "success.dark",
            },
          }}
        >
          {isSubmitting ? "Please wait..." : "Submit Form"}
        </Button>
      </Box>
    </form>
  );
}

export default Payment;
