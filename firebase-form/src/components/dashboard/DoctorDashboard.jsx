// src/components/dashboard/DoctorDashboard.jsx - REFACTORED
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import {
  Stethoscope,
  Users,
  Calendar,
  Activity,
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
import {
  PageContainer,
  ContentCard,
  StatCard,
  DashboardHeader,
} from "../global";

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

  const chips = [
    {
      icon: <Award size={16} />,
      label: doctorData?.specialization || "General Practitioner",
      color: "primary",
    },
    {
      label: `${doctorData?.experience || "0"} Years Experience`,
      variant: "outlined",
    },
  ];

  const additionalInfo = [
    <>
      <Mail size={16} /> {user?.email}
    </>,
    doctorData?.mobileNo && (
      <>
        <Phone size={16} /> {doctorData.mobileNo}
      </>
    ),
    doctorData?.hospitalName && (
      <>
        <MapPin size={16} /> {doctorData.hospitalName}
      </>
    ),
  ].filter(Boolean);

  const professionalDetails = [
    {
      icon: <Award size={20} color="#1976d2" />,
      label: "Degree",
      value: doctorData?.degree,
    },
    {
      icon: <Activity size={20} color="#1976d2" />,
      label: "License",
      value: doctorData?.licenseNumber,
    },
    doctorData?.consultationFee && {
      icon: <DollarSign size={20} color="#2e7d32" />,
      label: "Consultation Fee",
      value: `PKR ${doctorData.consultationFee}`,
    },
    doctorData?.availability && {
      icon: <Clock size={20} color="#ed6c02" />,
      label: "Available",
      value: doctorData.availability,
    },
  ].filter(Boolean);

  return (
    <PageContainer>
      <DashboardHeader
        avatarSrc={doctorData?.profilePicture}
        avatarIcon={<Stethoscope size={50} />}
        avatarBgColor="#2e7d32"
        title={`Dr. ${
          doctorData?.fullName || `${user?.firstName} ${user?.lastName}`
        }`}
        chips={chips}
        additionalInfo={additionalInfo}
        onLogout={handleLogout}
      >
        <Grid container spacing={2}>
          {professionalDetails.map((detail, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {detail.icon}
                <Typography variant="body2">
                  <strong>{detail.label}:</strong>{" "}
                  {detail.value || "Not specified"}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DashboardHeader>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
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
      </ContentCard>

      <ContentCard>
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
      </ContentCard>
    </PageContainer>
  );
};

export default DoctorDashboard;
