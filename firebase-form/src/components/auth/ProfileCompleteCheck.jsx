import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../hooks/useAuth";
import { Box, CircularProgress, Alert, Paper, Button } from "@mui/material";
import { AlertCircle } from "lucide-react";

const ProfileCompleteCheck = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState(false);

  // ✅ Pages that don't require profile completion
  const allowedPaths = ["/profile", "/login", "/signup"];

  useEffect(() => {
    const checkProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        // Check if profile is completed
        const isComplete = userData?.profileCompleted === true;
        setProfileComplete(isComplete);

        // If profile not complete and trying to access protected pages
        if (!isComplete && !allowedPaths.includes(location.pathname)) {
          navigate("/profile");
        }
      } catch (error) {
        console.error("Error checking profile:", error);
      } finally {
        setLoading(false);
      }
    };

    checkProfile();
  }, [user, location.pathname]);

  // Show loading spinner while checking
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // If on allowed paths (like /profile), show the page
  if (allowedPaths.includes(location.pathname)) {
    return children;
  }

  // If profile not complete, show warning (shouldn't reach here due to redirect)
  if (!profileComplete) {
    return (
      <Box sx={{ p: 3, maxWidth: 600, mx: "auto", mt: 8 }}>
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <AlertCircle size={64} color="#f57c00" style={{ margin: "0 auto" }} />
          <Alert severity="warning" sx={{ mt: 2, mb: 3 }}>
            Please complete your profile to access the dashboard and other
            features.
          </Alert>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/profile")}
          >
            Complete Profile Now
          </Button>
        </Paper>
      </Box>
    );
  }

  // Profile is complete, show the page
  return children;
};

export default ProfileCompleteCheck;
