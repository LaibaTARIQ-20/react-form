import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../config/firebase";
import { useAuth } from "../../hooks/useAuth";
import {
  Box,
  Paper,
  Typography,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import GlobalStepper from "../global/GlobalStepper";
import BasicProfile from "./BasicProfile";
import Documents from "./Documents";
import Qualifications from "./Qualifications";
import Review from "./Review";

const ProfileStepper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const steps = ["Basic Profile", "Documents", "Qualifications", "Review"];

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // Basic Profile Fields
      fullName: "",
      fatherName: "",
      gender: "",
      dateOfBirth: "",
      cnic: "",
      mobileNo: "",
      email: user?.email || "",
      district: "",
      postalAddress: "",

      // Document Fields
      profilePicture: null,
      cnicFront: null,
      cnicBack: null,

      // Doctor Qualification Fields
      degree: "",
      specialization: "",
      licenseNumber: "",
      experience: "",
      hospitalName: "",
      consultationFee: "",
      availability: "",
    },
  });

  // Load existing profile data on mount
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();

          // Set all non-file fields
          Object.keys(data).forEach((key) => {
            if (
              key !== "profilePicture" &&
              key !== "cnicFront" &&
              key !== "cnicBack" &&
              key !== "uid" &&
              key !== "role" &&
              key !== "createdAt" &&
              key !== "updatedAt" &&
              key !== "profileCompleted"
            ) {
              setValue(key, data[key]);
            }
          });
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };

    loadProfile();
  }, [user, setValue]);

  // Validation Functions
  const validateBasicProfile = () => {
    const data = watch();
    const validationErrors = {};

    if (!data.fullName?.trim()) {
      validationErrors.fullName = "Full name is required";
    }

    if (!data.fatherName?.trim()) {
      validationErrors.fatherName = "Father's name is required";
    }

    if (!data.gender) {
      validationErrors.gender = "Gender is required";
    }

    if (!data.dateOfBirth) {
      validationErrors.dateOfBirth = "Date of birth is required";
    }

    if (!data.cnic) {
      validationErrors.cnic = "CNIC is required";
    } else if (data.cnic.length !== 13) {
      validationErrors.cnic = "CNIC must be exactly 13 digits";
    }

    if (!data.mobileNo) {
      validationErrors.mobileNo = "Mobile number is required";
    }

    if (!data.district?.trim()) {
      validationErrors.district = "District is required";
    }

    if (!data.postalAddress?.trim()) {
      validationErrors.postalAddress = "Postal address is required";
    }

    return validationErrors;
  };

  const validateDocuments = () => {
    const data = watch();
    const validationErrors = {};

    if (!data.profilePicture) {
      validationErrors.profilePicture = "Profile picture is required";
    }

    if (!data.cnicFront) {
      validationErrors.cnicFront = "CNIC front image is required";
    }

    if (!data.cnicBack) {
      validationErrors.cnicBack = "CNIC back image is required";
    }

    return validationErrors;
  };

  const validateQualifications = () => {
    const data = watch();
    const validationErrors = {};

    // Only validate if user is a doctor
    if (user?.role === "doctor") {
      if (!data.degree?.trim()) {
        validationErrors.degree = "Degree is required";
      }

      if (!data.specialization?.trim()) {
        validationErrors.specialization = "Specialization is required";
      }

      if (!data.licenseNumber?.trim()) {
        validationErrors.licenseNumber = "License number is required";
      }

      if (!data.experience) {
        validationErrors.experience = "Years of experience is required";
      }
    }

    return validationErrors;
  };

  // Handle Next Button Click
  const handleNext = async () => {
    setError("");

    // Validate current step
    let stepErrors = {};
    if (activeStep === 0) {
      stepErrors = validateBasicProfile();
    } else if (activeStep === 1) {
      stepErrors = validateDocuments();
    } else if (activeStep === 2) {
      stepErrors = validateQualifications();
    }

    // Check if there are validation errors
    if (Object.keys(stepErrors).length > 0) {
      setError("Please fill in all required fields correctly");
      console.log("Validation errors:", stepErrors);
      return;
    }

    // If last step, submit the form
    if (activeStep === steps.length - 1) {
      await handleFinalSubmit();
    } else {
      // Move to next step
      setActiveStep((prev) => prev + 1);
    }
  };

  // Handle Back Button Click
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setError("");
  };

  // Final Form Submission
  const handleFinalSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const formData = watch();
      const userRef = doc(db, "users", user.uid);

      // Upload File Helper Function
      const uploadFile = async (file, path) => {
        // If file is already a URL string, return it
        if (!file || typeof file === "string") {
          return file;
        }

        try {
          const timestamp = Date.now();
          const fileName = `${user.uid}_${timestamp}_${file.name}`;
          const storageRef = ref(storage, `${path}/${fileName}`);

          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);

          return downloadURL;
        } catch (error) {
          console.error(`Error uploading ${path}:`, error);
          throw new Error(`Failed to upload ${path}`);
        }
      };

      // Upload all document files
      console.log("Uploading profile picture...");
      const profilePictureURL = await uploadFile(
        formData.profilePicture,
        "profile_pictures"
      );

      console.log("Uploading CNIC front...");
      const cnicFrontURL = await uploadFile(
        formData.cnicFront,
        "cnic_documents"
      );

      console.log("Uploading CNIC back...");
      const cnicBackURL = await uploadFile(formData.cnicBack, "cnic_documents");

      // Prepare data for Firestore
      const dataToSave = {
        // Basic Information
        fullName: formData.fullName,
        fatherName: formData.fatherName,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        cnic: formData.cnic,
        mobileNo: formData.mobileNo,
        district: formData.district,
        postalAddress: formData.postalAddress,

        // Documents
        profilePicture: profilePictureURL,
        cnicFront: cnicFrontURL,
        cnicBack: cnicBackURL,

        // Profile Status
        profileCompleted: true,
        updatedAt: new Date().toISOString(),
      };

      // Add doctor-specific fields if user is a doctor
      if (user?.role === "doctor") {
        dataToSave.degree = formData.degree;
        dataToSave.specialization = formData.specialization;
        dataToSave.licenseNumber = formData.licenseNumber;
        dataToSave.experience = formData.experience;
        dataToSave.hospitalName = formData.hospitalName || "";
        dataToSave.consultationFee = formData.consultationFee || "";
        dataToSave.availability = formData.availability || "";
      }

      console.log("Saving to Firestore...", dataToSave);

      // Save to Firestore
      await updateDoc(userRef, dataToSave);

      setSuccess("Profile completed successfully!");

      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Error saving profile:", err);
      setError(err.message || "Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Render Step Content
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <BasicProfile control={control} errors={errors} />;
      case 1:
        return (
          <Documents control={control} errors={errors} setValue={setValue} />
        );
      case 2:
        return (
          <Qualifications
            control={control}
            errors={errors}
            userRole={user?.role}
          />
        );
      case 3:
        return <Review data={watch()} userRole={user?.role} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", py: 4 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 3 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          {/* Header */}
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            textAlign="center"
          >
            Complete Your Profile
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            mb={4}
          >
            Please fill in all required information to access the dashboard
          </Typography>

          {/* Stepper */}
          <GlobalStepper steps={steps} activeStep={activeStep} />

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Success Alert */}
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          {/* Step Content */}
          <Box sx={{ minHeight: 400 }}>{renderStepContent()}</Box>

          {/* Navigation Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 4,
              pt: 3,
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 0 || loading}
              sx={{ minWidth: 120 }}
            >
              Back
            </Button>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Step {activeStep + 1} of {steps.length}
              </Typography>

              <Button
                variant="contained"
                onClick={handleNext}
                disabled={loading}
                sx={{ minWidth: 120 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : activeStep === steps.length - 1 ? (
                  "Submit"
                ) : (
                  "Next"
                )}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProfileStepper;
