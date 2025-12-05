require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const assessmentRoutes = require("./routes/assessmentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/assessments", assessmentRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `API endpoint: http://localhost:${PORT}/api/assessments/insights/:patientId`
  );
});
