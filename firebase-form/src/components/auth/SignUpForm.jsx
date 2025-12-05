// src/components/auth/SignUpForm.jsx - REFACTORED
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { UserPlus } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import {
  AuthContainer,
  ControlledTextField,
  ControlledSelect,
} from "../global";

const SignUpForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
  });

  const password = watch("password");

  const validateRequired = (fieldName) => (value) => {
    if (!value || value.trim() === "") return `${fieldName} is required`;
    return true;
  };

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Invalid email address";
    return true;
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(value))
      return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(value))
      return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(value))
      return "Password must contain at least one number";
    return true;
  };

  const validateConfirmPassword = (value) => {
    if (!value) return "Please confirm your password";
    if (value !== password) return "Passwords do not match";
    return true;
  };

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);

    try {
      await signUp(data.email, data.password, data.role, {
        firstName: data.firstName,
        lastName: data.lastName,
        profileCompleted: false,
      });
      navigate("/profile");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: "patient", label: "Patient" },
    { value: "doctor", label: "Doctor" },
  ];

  return (
    <AuthContainer
      icon={<UserPlus size={40} color="white" />}
      title="Create Account"
      subtitle="Join Medical Portal today"
      error={error}
      footer={
        <Typography variant="body2" color="text.secondary">
          Already have an account?{" "}
          <Button
            onClick={() => navigate("/login")}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Sign In
          </Button>
        </Typography>
      }
    >
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <ControlledTextField
            name="firstName"
            control={control}
            errors={errors}
            label="First Name *"
            placeholder="Enter first name"
          />
          <ControlledTextField
            name="lastName"
            control={control}
            errors={errors}
            label="Last Name *"
            placeholder="Enter last name"
          />
        </Box>

        <ControlledTextField
          name="email"
          control={control}
          errors={errors}
          label="Email Address *"
          placeholder="Enter your email"
          type="email"
          sx={{ mb: 2 }}
        />

        <ControlledSelect
          name="role"
          control={control}
          errors={errors}
          label="Select Role *"
          options={roleOptions}
          placeholder="Choose your role"
          sx={{ mb: 2 }}
        />

        <ControlledTextField
          name="password"
          control={control}
          errors={errors}
          label="Password *"
          placeholder="Create a password"
          type="password"
          sx={{ mb: 2 }}
        />

        <ControlledTextField
          name="confirmPassword"
          control={control}
          errors={errors}
          label="Confirm Password *"
          placeholder="Confirm your password"
          type="password"
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          sx={{ py: 1.5, fontSize: "1rem" }}
        >
          {loading ? <CircularProgress size={24} /> : "CREATE ACCOUNT"}
        </Button>
      </Box>
    </AuthContainer>
  );
};

export default SignUpForm;
