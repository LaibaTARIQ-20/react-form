const {
  getAssessmentInsightsByPatient,
} = require("../services/assessmentService");

const getPatientAssessmentInsights = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({
        success: false,
        message: "Patient ID is required",
      });
    }

    const insights = await getAssessmentInsightsByPatient(patientId);

    return res.status(200).json({
      success: true,
      data: insights,
    });
  } catch (error) {
    console.error("Error in getPatientAssessmentInsights:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getPatientAssessmentInsights,
};
