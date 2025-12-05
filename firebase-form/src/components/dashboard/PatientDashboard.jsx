// src/components/dashboard/PatientDashboard.jsx - REFACTORED
import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { User, Calendar, FileText, Activity } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  PageContainer,
  ContentCard,
  StatCard,
  DashboardHeader,
} from "../global";

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
    <PageContainer>
      <DashboardHeader
        avatarIcon={<User size={40} />}
        avatarBgColor="#1976d2"
        title={`Welcome, ${user?.firstName || "Patient"}!`}
        subtitle="Patient Dashboard"
        email={user?.email}
        onLogout={handleLogout}
      >
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <StatCard {...stat} />
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
      </DashboardHeader>

      <ContentCard>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Recent Activity
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No recent activity to display
        </Typography>
      </ContentCard>
    </PageContainer>
  );
};

export default PatientDashboard;
