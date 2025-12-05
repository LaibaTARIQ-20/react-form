import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../hooks/useAuth";
import { Box, CircularProgress } from "@mui/material";

const ProtectedRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState(false);

  const allowedPaths = ["/profile"];

  useEffect(() => {
    const checkProfile = async () => {
      if (!user) {
        setProfileLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        const isComplete = userData?.profileCompleted === true;
        setProfileComplete(isComplete);
      } catch (error) {
        console.error("Error checking profile:", error);
      } finally {
        setProfileLoading(false);
      }
    };

    checkProfile();
  }, [user]);

  if (authLoading || profileLoading) {
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

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (allowedPaths.includes(location.pathname)) {
    return children;
  }

  if (!profileComplete) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default ProtectedRoute;
