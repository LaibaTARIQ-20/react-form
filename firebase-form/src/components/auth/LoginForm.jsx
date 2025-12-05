// src/components/auth/LoginForm.jsx - WITH PROPER VALIDATION
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { LogIn } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { AuthContainer, ControlledTextField } from "../global";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/dashboard";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ✅ VALIDATION RULES
  const validateEmail = (value) => {
    if (!value) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Invalid email address";
    return true;
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return true;
  };

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);

    try {
      await signIn(data.email, data.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer
      icon={<LogIn size={40} color="white" />}
      title="Welcome Back"
      subtitle="Sign in to continue to Medical Portal"
      error={error}
      footer={
        <Typography variant="body2" color="text.secondary">
          Don't have an account?{" "}
          <Button
            onClick={() => navigate("/signup")}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Create Account
          </Button>
        </Typography>
      }
    >
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          name="email"
          control={control}
          errors={errors}
          label="Email Address"
          placeholder="Enter your email"
          type="email"
          rules={{ validate: validateEmail }} // ✅ VALIDATION APPLIED
          sx={{ mb: 2 }}
        />

        <ControlledTextField
          name="password"
          control={control}
          errors={errors}
          label="Password"
          placeholder="Enter your password"
          type="password"
          rules={{ validate: validatePassword }} // ✅ VALIDATION APPLIED
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
          {loading ? <CircularProgress size={24} /> : "Sign In"}
        </Button>
      </Box>
    </AuthContainer>
  );
};

export default LoginForm;
