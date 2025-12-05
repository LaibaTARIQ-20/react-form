import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { UserPlus } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 5, borderRadius: 3 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: "#1976d2",
                mb: 2,
              }}
            >
              <UserPlus size={40} color="white" />
            </Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Create Account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Join Medical Portal today
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Controller
                name="firstName"
                control={control}
                rules={{ validate: validateRequired("First name") }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="First Name *"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                rules={{ validate: validateRequired("Last name") }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Last Name *"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </Box>

            <Controller
              name="email"
              control={control}
              rules={{ validate: validateEmail }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email Address *"
                  type="email"
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />

            <Controller
              name="role"
              control={control}
              rules={{ validate: validateRequired("Role") }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.role} sx={{ mb: 2 }}>
                  <InputLabel>Select Role *</InputLabel>
                  <Select {...field} label="Select Role *">
                    <MenuItem value="">
                      <em>Choose your role</em>
                    </MenuItem>
                    <MenuItem value="patient">Patient</MenuItem>
                    <MenuItem value="doctor">Doctor</MenuItem>
                  </Select>
                  {errors.role && (
                    <FormHelperText>{errors.role.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{ validate: validatePassword }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Password *"
                  type="password"
                  margin="normal"
                  error={!!errors.password}
                  helperText={
                    errors.password?.message ||
                    "Minimum 8 characters, include uppercase, lowercase, and number"
                  }
                  sx={{ mb: 2 }}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              rules={{ validate: validateConfirmPassword }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Confirm Password *"
                  type="password"
                  margin="normal"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  sx={{ mb: 3 }}
                />
              )}
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

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Button
                onClick={() => navigate("/login")}
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                Sign In
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUpForm;
