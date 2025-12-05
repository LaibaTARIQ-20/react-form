import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AdmissionForm from "./pages/AdmissionForm";
import ThankYou from "./pages/ThankYou";
import Signin from "./pages/signin";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    success: {
      main: "#2e7d32",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<AdmissionForm />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/signin" element={<signin />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
