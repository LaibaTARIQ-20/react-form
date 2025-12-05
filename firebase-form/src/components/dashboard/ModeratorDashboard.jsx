import React from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  Avatar,
} from "@mui/material";
import { ShieldCheck, Users, UserCog, Activity, Stethoscope, User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const ModeratorDashboard = () => {
  const { user } = useAuth();

  const avatarLetter = user?.email ? user.email[0].toUpperCase() : "M";
  const displayName = user?.email ? user.email.split("@")[0] : "Moderator";

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
          pb: 2,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Avatar
          sx={{
            width: 56,
            height: 56,
            bgcolor: "#ed6c02",
            fontSize: "1.5rem",
            fontWeight: "bold",
            mr: 2,
          }}
        >
          {avatarLetter}
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {displayName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              bgcolor: "#fff3e0",
              color: "#e65100",
              px: 1,
              py: 0.5,
              borderRadius: 1,
              display: "inline-block",
              mt: 0.5,
              fontWeight: 600,
            }}
          >
            Moderator
          </Typography>
        </Box>
      </Box>

      {/* Dashboard Title - MODERATOR */}
      <Typography
        variant="h4"
        sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
      >
        <ShieldCheck size={32} /> Moderator Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: "#e3f2fd" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <User size={40} color="#1976d2" />
                <Box>
                  <Typography variant="h6">Patients</Typography>
                  <Typography variant="h4">156</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: "#e8f5e9" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Stethoscope size={40} color="#2e7d32" />
                <Box>
                  <Typography variant="h6">Doctors</Typography>
                  <Typography variant="h4">24</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: "#fff3e0" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <UserCog size={40} color="#ed6c02" />
                <Box>
                  <Typography variant="h6">Active Users</Typography>
                  <Typography variant="h4">180</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: "#f3e5f5" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Activity size={40} color="#9c27b0" />
                <Box>
                  <Typography variant="h6">Total Activity</Typography>
                  <Typography variant="h4">98%</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Overview Grid */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Manage Patients */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Users size={24} color="#1976d2" /> Manage Patients
            </Typography>
            <Typography sx={{ mt: 2, color: "text.secondary" }}>
              View all registered patients, approve new registrations, manage
              patient profiles, and monitor patient activity across the system.
            </Typography>
          </Paper>
        </Grid>

        {/* Manage Doctors */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Stethoscope size={24} color="#2e7d32" /> Manage Doctors
            </Typography>
            <Typography sx={{ mt: 2, color: "text.secondary" }}>
              Oversee doctor profiles, verify credentials, manage
              specializations, track appointments, and ensure compliance with
              medical standards.
            </Typography>
          </Paper>
        </Grid>

        {/* System Overview */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Activity size={24} color="#ed6c02" /> System Overview
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Welcome to the Moderator Control Panel! As a moderator, you have
              full oversight of the medical portal system. You can manage both
              patients and doctors, approve registrations, monitor system
              activity, and ensure smooth operation of the platform.
            </Typography>
            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: "#fff3e0",
                borderRadius: 2,
                borderLeft: "4px solid #ed6c02",
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                📊 Quick Stats Summary
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Total Registered Users: 180 (156 Patients + 24 Doctors)
                <br />
                • Pending Approvals: 5 new registrations
                <br />
                • System Health: All services operational
                <br />• Last Updated: Today at {new Date().toLocaleTimeString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ModeratorDashboard;