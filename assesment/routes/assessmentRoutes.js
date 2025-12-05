const express = require("express");
const router = express.Router();
const {
  getPatientAssessmentInsights,
} = require("../controllers/assessmentController");

// GET /api/assessments/insights/:patientId
router.get("/insights/:patientId", getPatientAssessmentInsights);

module.exports = router;
