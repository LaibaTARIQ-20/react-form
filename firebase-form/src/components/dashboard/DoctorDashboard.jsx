import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  Avatar,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import {
  Stethoscope,
  Users,
  Calendar,
  Activity,
  LogOut,
  Award,
  MapPin,
  Phone,
  Mail,
  Clock,
  DollarSign,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorData = async () => {
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setDoctorData(userDoc.data());
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [user]);

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
      title: "Total Patients",
      value: "127",
      icon: <Users size={40} color="#1976d2" />,
      bgColor: "#e3f2fd",
    },
    {
      title: "Today's Appointments",
      value: "8",
      icon: <Calendar size={40} color="#2e7d32" />,
      bgColor: "#e8f5e9",
    },
    {
      title: "Consultations",
      value: "342",
      icon: <Activity size={40} color="#ed6c02" />,
      bgColor: "#fff3e0",
    },
  ];

  const upcomingAppointments = [
    { id: 1, patient: "Ahmed Ali", time: "10:00 AM", type: "Consultation" },
    { id: 2, patient: "Fatima Khan", time: "11:30 AM", type: "Follow-up" },
    { id: 3, patient: "Hassan Raza", time: "2:00 PM", type: "Check-up" },
  ];

  return (
    <Box sx={{ p: 4, minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Header Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            {doctorData?.profilePicture ? (
              <Avatar
                src={doctorData.profilePicture}
                sx={{ width: 100, height: 100, mr: 3 }}
              />
            ) : (
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "#2e7d32",
                  fontSize: "2.5rem",
                  mr: 3,
                }}
              >
                <Stethoscope size={50} />
              </Avatar>
            )}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Dr.{" "}
                {doctorData?.fullName || `${user?.firstName} ${user?.lastName}`}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Chip
                  icon={<Award size={16} />}
                  label={doctorData?.specialization || "General Practitioner"}
                  color="primary"
                  size="small"
                />
                <Chip
                  label={`${doctorData?.experience || "0"} Years Experience`}
                  size="small"
                  variant="outlined"
                />
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
              >
                <Mail size={16} /> {user?.email}
              </Typography>
              {doctorData?.mobileNo && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 0.5,
                  }}
                >
                  <Phone size={16} /> {doctorData.mobileNo}
                </Typography>
              )}
              {doctorData?.hospitalName && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <MapPin size={16} /> {doctorData.hospitalName}
                </Typography>
              )}
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

        <Divider sx={{ my: 3 }} />

        {/* Professional Details */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Award size={20} color="#1976d2" />
              <Typography variant="body2">
                <strong>Degree:</strong> {doctorData?.degree || "Not specified"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Activity size={20} color="#1976d2" />
              <Typography variant="body2">
                <strong>License:</strong>{" "}
                {doctorData?.licenseNumber || "Not specified"}
              </Typography>
            </Box>
          </Grid>
          {doctorData?.consultationFee && (
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <DollarSign size={20} color="#2e7d32" />
                <Typography variant="body2">
                  <strong>Consultation Fee:</strong> PKR{" "}
                  {doctorData.consultationFee}
                </Typography>
              </Box>
            </Grid>
          )}
          {doctorData?.availability && (
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Clock size={20} color="#ed6c02" />
                <Typography variant="body2">
                  <strong>Available:</strong> {doctorData.availability}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* Stats Cards */}
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

      {/* Quick Actions */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained" size="large">
              View All Appointments
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" size="large">
              Patient Records
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" size="large">
              Add Prescription
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
      </Paper>

      {/* Today's Schedule */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Today's Appointments
        </Typography>
        <List>
          {upcomingAppointments.map((appointment) => (
            <ListItem
              key={appointment.id}
              sx={{
                bgcolor: "#f9f9f9",
                mb: 1,
                borderRadius: 2,
                "&:hover": { bgcolor: "#f0f0f0" },
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "#1976d2" }}>
                  {appointment.patient.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={appointment.patient}
                secondary={`${appointment.time} - ${appointment.type}`}
              />
              <Button variant="outlined" size="small">
                View Details
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default DoctorDashboard;
