import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();
  const [values, setValues] = React.useState({ email: "", password: "" });
  const [error, setError] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!values.email || !values.password) {
      setError("Please enter email and password.");
      return;
    }

    console.log("Signing in with", values);
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            width: "100%",
            maxWidth: "450px",
            margin: "0 auto",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "#FF5722",
              width: 56,
              height: 56,
            }}
          >
            <LockOutlinedIcon />
          </Avatar>

          <Typography
            component="h1"
            variant="h5"
            sx={{
              mt: 1,
              mb: 2,
              color: "#333",
              fontWeight: "bold",
            }}
          >
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={values.email}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ddd",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FF5722",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF5722",
                  },
                },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#FF5722' }

              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ddd",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FF5722",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF5722",
                  },
                },
                 '& .MuiInputLabel-root.Mui-focused': { color: '#FF5722' }

              }}
            />
            <Grid container spacing={2} justifyContent="space-between" alignItems="center">
               <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  sx={{
                    color: "#FF5722",
                    "&.Mui-checked": {
                      color: "#FF5722",
                    },
                  }}
                />
              }
              label="Remember me"
              />
               <Grid item xs>
                <Link
                  href="/forgot-password"
                  variant="body2"
                  sx={{
                    color: "#e91616a1",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot password?
                </Link>
              </Grid>
              

            </Grid>
           
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#FF5722",
                color: "white",
                padding: "12px",
                fontSize: "1rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                "&:hover": {
                  backgroundColor: "#FF5722",
                },
              }}
            >
              Sign In
            </Button>

            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item>
                <Link
                  href="/signup"
                  variant="body2"
                  sx={{
                    color: "#FF5722",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
