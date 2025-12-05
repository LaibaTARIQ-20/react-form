// src/components/dashboard/ModeratorDashboard.jsx - REFACTORED
import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { Shield, Users, UserCheck, Activity, FileText } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  PageContainer,
  ContentCard,
  StatCard,
  DashboardHeader,
} from "../global";

const ModeratorDashboard = () => {
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
      title: "Total Users",
      value: "1,234",
      icon: <Users size={40} color="#1976d2" />,
      bgColor: "#e3f2fd",
    },
    {
      title: "Total Doctors",
      value: "156",
      icon: <UserCheck size={40} color="#2e7d32" />,
      bgColor: "#e8f5e9",
    },
    {
      title: "Total Patients",
      value: "1,078",
      icon: <Activity size={40} color="#ed6c02" />,
      bgColor: "#fff3e0",
    },
    {
      title: "Pending Reports",
      value: "23",
      icon: <FileText size={40} color="#d32f2f" />,
      bgColor: "#ffebee",
    },
  ];

  return (
    <PageContainer>
      <DashboardHeader
        avatarIcon={<Shield size={40} />}
        avatarBgColor="#9c27b0"
        title={`Welcome, ${user?.firstName || "Moderator"}!`}
        subtitle="System Moderator Dashboard"
        email={user?.email}
        onLogout={handleLogout}
      />

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <ContentCard>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/moderator/users")}
            >
              Manage Users
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/moderator/doctors")}
            >
              Manage Doctors
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/moderator/patients")}
            >
              Manage Patients
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/moderator/reports")}
            >
              View Reports
            </Button>
          </Grid>
        </Grid>
      </ContentCard>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ContentCard elevation={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Recent Activities
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No recent activities to display
            </Typography>
          </ContentCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentCard elevation={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              System Status
            </Typography>
            <Typography variant="body2" color="success.main">
              ✓ All systems operational
            </Typography>
          </ContentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ModeratorDashboard;
