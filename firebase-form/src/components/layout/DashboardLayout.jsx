import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Button,
  Alert,
  AlertTitle,
  IconButton,
} from "@mui/material";
import {
  User,
  FileText,
  Settings,
  LogOut,
  LayoutDashboard,
  Stethoscope,
  Users,
  UserCog,
  Activity,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const drawerWidth = 280;

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileComplete, setProfileComplete] = useState(true);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ✅ Check if profile is complete
  useEffect(() => {
    const checkProfile = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const userData = userDoc.data();
          setProfileComplete(userData?.profileCompleted === true);
        } catch (error) {
          console.error("Error checking profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    checkProfile();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const avatarLetter = user?.email ? user.email[0].toUpperCase() : "U";
  const displayName = user?.email ? user.email.split("@")[0] : "User";

  // ✅ Role-based display name and type
  const getUserType = () => {
    if (user?.role === "moderator") return "Moderator";
    if (user?.role === "admin") return "Doctor";
    return "Patient";
  };

  const getUserColor = () => {
    if (user?.role === "moderator") return "#ed6c02";
    if (user?.role === "admin") return "#2e7d32";
    return "#1976d2";
  };

  // ✅ Role-based menu items
  const getMenuItems = () => {
    if (user?.role === "moderator") {
      return [
        {
          text: "Dashboard",
          icon: <LayoutDashboard size={20} />,
          path: "/moderator/dashboard",
        },
        {
          text: "Manage Users",
          icon: <Users size={20} />,
          path: "/moderator/users",
        },
        {
          text: "Manage Doctors",
          icon: <Stethoscope size={20} />,
          path: "/moderator/doctors",
        },
        {
          text: "Manage Patients",
          icon: <UserCog size={20} />,
          path: "/moderator/patients",
        },
        {
          text: "Reports",
          icon: <Activity size={20} />,
          path: "/moderator/reports",
        },
        { text: "Profile", icon: <User size={20} />, path: "/profile" },
        { text: "Settings", icon: <Settings size={20} />, path: "/settings" },
      ];
    }

    if (user?.role === "admin") {
      return [
        {
          text: "Dashboard",
          icon: <LayoutDashboard size={20} />,
          path: "/doctor/dashboard",
        },
        {
          text: "My Patients",
          icon: <Users size={20} />,
          path: "/doctor/patients",
        },
        {
          text: "Appointments",
          icon: <Stethoscope size={20} />,
          path: "/doctor/appointments",
        },
        { text: "Profile", icon: <User size={20} />, path: "/profile" },
        { text: "Settings", icon: <Settings size={20} />, path: "/settings" },
      ];
    }

    // Default: Patient menu
    return [
      {
        text: "Dashboard",
        icon: <LayoutDashboard size={20} />,
        path: "/patient/dashboard",
      },
      {
        text: "Medical Records",
        icon: <FileText size={20} />,
        path: "/patient/records",
      },
      {
        text: "Appointments",
        icon: <Stethoscope size={20} />,
        path: "/patient/appointments",
      },
      { text: "Profile", icon: <User size={20} />, path: "/profile" },
      { text: "Settings", icon: <Settings size={20} />, path: "/settings" },
    ];
  };

  const menuItems = getMenuItems();
  const userType = getUserType();
  const userColor = getUserColor();

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#1e293b",
            color: "white",
          },
        }}
        variant="temporary"
        anchor="left"
        open={sidebarOpen}
        onClose={toggleSidebar}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {/* Logo/Header with Close Button */}
        <Box
          sx={{
            p: 3,
            textAlign: "center",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            position: "relative",
          }}
        >
          <IconButton
            onClick={toggleSidebar}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "white",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <X size={20} />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
            🏥 Medics
          </Typography>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>
            Health Management System
          </Typography>
        </Box>

        {/* User Profile Section */}
        <Box sx={{ p: 3, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                bgcolor: userColor,
                width: 50,
                height: 50,
              }}
            >
              {avatarLetter}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {user?.role === "admin" ? `Dr. ${displayName}` : displayName}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  bgcolor: `${userColor}33`,
                  color: userColor,
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  display: "inline-block",
                }}
              >
                {userType}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Menu Items */}
        <List sx={{ px: 2, pt: 2, flex: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  toggleSidebar();
                }}
                sx={{
                  borderRadius: 2,
                  bgcolor:
                    location.pathname === item.path
                      ? "rgba(59, 130, 246, 0.2)"
                      : "transparent",
                  "&:hover": {
                    bgcolor: "rgba(59, 130, 246, 0.1)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Logout Button */}
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<LogOut size={20} />}
            onClick={handleLogout}
            sx={{
              borderColor: "rgba(239, 68, 68, 0.5)",
              color: "#f87171",
              "&:hover": {
                borderColor: "#ef4444",
                bgcolor: "rgba(239, 68, 68, 0.1)",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f8fafc",
          minHeight: "100vh",
          p: 3,
          width: "100%",
        }}
      >
        {/* Hamburger Menu Button */}
        <IconButton
          onClick={toggleSidebar}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            bgcolor: "#1e293b",
            color: "white",
            zIndex: 1200,
            "&:hover": {
              bgcolor: "#334155",
            },
            boxShadow: 3,
          }}
        >
          <Menu size={24} />
        </IconButton>

        {/* Profile Incomplete Warning Banner */}
        {!loading && !profileComplete && location.pathname !== "/profile" && (
          <Alert
            severity="warning"
            sx={{ mb: 3, mt: 7 }}
            action={
              <Button
                color="inherit"
                size="small"
                variant="outlined"
                onClick={() => navigate("/profile")}
                sx={{
                  borderColor: "currentColor",
                  "&:hover": {
                    borderColor: "currentColor",
                    bgcolor: "rgba(237, 108, 2, 0.1)",
                  },
                }}
              >
                Complete Now
              </Button>
            }
          >
            <AlertTitle sx={{ fontWeight: 600 }}>
              ⚠️ Profile Incomplete
            </AlertTitle>
            Please complete your profile to access all features and unlock the
            full functionality of the system.
          </Alert>
        )}

        {/* Page Content */}
        <Box sx={{ mt: 7 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
