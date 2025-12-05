import React from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  Avatar,
  Button,
} from "@mui/material";
import { User, Calendar, FileText, Activity, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const stats = [
    {
      title: "Appointments",
      value: "5",
      icon: <Calendar size={40} color="#1976d2" />,
      bgColor: "#e3f2fd",
    },
    {
      title: "Medical Records",
      value: "12",
      icon: <FileText size={40} color="#2e7d32" />,
      bgColor: "#e8f5e9",
    },
    {
      title: "Health Score",
      value: "85%",
      icon: <Activity size={40} color="#ed6c02" />,
      bgColor: "#fff3e0",
    },
  ];

  return (
    <Box sx={{ p: 4, minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: "#1976d2",
                fontSize: "2rem",
                mr: 3,
              }}
            >
              <User size={40} />
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Welcome, {user?.firstName || "Patient"}!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Patient Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogOut size={20} />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  bgcolor: stat.bgColor,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    {stat.icon}
                    <Typography variant="h6" fontWeight="bold" sx={{ ml: 2 }}>
                      {stat.title}
                    </Typography>
                  </Box>
                  <Typography variant="h3" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="contained" size="large">
                Book Appointment
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" size="large">
                View Medical Records
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/profile")}
              >
                Edit Profile
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Recent Activity
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No recent activity to display
        </Typography>
      </Paper>
    </Box>
  );
};

export default PatientDashboard;
