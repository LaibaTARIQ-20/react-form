// src/components/profile/ProfileStepper.jsx - ENSURE ROLE IS PASSED
import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../config/firebase";
import { useAuth } from "../../hooks/useAuth";
import BasicProfile from "./BasicProfile";
import Documents from "./Documents";
import Qualifications from "./Qualifications";
import Review from "./Review";

const ProfileStepper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  // Determine if user is a doctor
  const isDoctor =
    user?.role === "admin" ||
    user?.role === "doctor" ||
    user?.displayRole === "doctor";

  console.log("ProfileStepper - User:", user);
  console.log("ProfileStepper - Is Doctor:", isDoctor);

  const steps = ["Basic Profile", "Documents", "Qualifications", "Review"];

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      fatherName: "",
      gender: "",
      dateOfBirth: "",
      cnic: "",
      mobileNo: "",
      email: user?.email || "",
      district: "",
      postalAddress: "",
      profilePicture: null,
      cnicFront: null,
      cnicBack: null,
      // Doctor fields
      degree: "",
      specialization: "",
      licenseNumber: "",
      experience: "",
      hospitalName: "",
      consultationFee: "",
      availability: "",
    },
  });

  const formData = watch();

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const uploadFile = async (file, path) => {
    if (!file || typeof file === "string") return file;
    const storageRef = ref(storage, `${path}/${user.uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // Upload files
      const profilePictureURL = await uploadFile(
        data.profilePicture,
        "profile-pictures"
      );
      const cnicFrontURL = await uploadFile(data.cnicFront, "cnic-front");
      const cnicBackURL = await uploadFile(data.cnicBack, "cnic-back");

      // Prepare user data
      const userData = {
        fullName: data.fullName,
        fatherName: data.fatherName,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        cnic: data.cnic,
        mobileNo: data.mobileNo,
        district: data.district,
        postalAddress: data.postalAddress,
        profilePicture: profilePictureURL,
        cnicFront: cnicFrontURL,
        cnicBack: cnicBackURL,
        profileCompleted: true,
        updatedAt: new Date().toISOString(),
      };

      // Add doctor fields if user is a doctor
      if (isDoctor) {
        userData.degree = data.degree;
        userData.specialization = data.specialization;
        userData.licenseNumber = data.licenseNumber;
        userData.experience = data.experience;
        userData.hospitalName = data.hospitalName || "";
        userData.consultationFee = data.consultationFee || "";
        userData.availability = data.availability || "";
      }

      // Update Firestore
      await updateDoc(doc(db, "users", user.uid), userData);

      alert("Profile completed successfully!");

      // Redirect to appropriate dashboard
      if (isDoctor) {
        navigate("/doctor/dashboard");
      } else {
        navigate("/patient/dashboard");
      }
    } catch (error) {
      console.error("Error submitting profile:", error);
      alert("Failed to complete profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <BasicProfile control={control} errors={errors} />;
      case 1:
        return (
          <Documents control={control} errors={errors} setValue={setValue} />
        );
      case 2:
        return <Qualifications control={control} errors={errors} />;
      case 3:
        return (
          <Review data={formData} userRole={isDoctor ? "doctor" : "patient"} />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Complete Your Profile
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          gutterBottom
          align="center"
          sx={{ mb: 4 }}
        >
          Please fill in all required information to access the dashboard
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {getStepContent(activeStep)}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              size="large"
              variant="outlined"
            >
              Back
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ alignSelf: "center" }}
            >
              Step {activeStep + 1} of {steps.length}
            </Typography>

            {activeStep === steps.length - 1 ? (
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            ) : (
              <Button onClick={handleNext} variant="contained" size="large">
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfileStepper;
