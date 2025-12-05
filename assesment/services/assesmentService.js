const Assessment = require("../models/Assessment");

// Helper function to get assessments by patient
const getAssessmentByPatients = async (patientId) => {
  try {
    const assessments = await Assessment.find({
      patient: patientId,
    }).sort({ createdAt: 1 });
    return assessments;
  } catch (error) {
    throw new Error(`Error fetching assessments: ${error.message}`);
  }
};

// Main function to get assessment insights
const getAssessmentInsightsByPatient = async (pid) => {
  try {
    // 1) Fetch all assessments for patient
    const assessments = await getAssessmentByPatients(pid);

    if (!Array.isArray(assessments) || assessments.length === 0) {
      return {
        assessmentA: null,
        assessmentB: [],
        dates: { pre: null, mid: null, post: null },
      };
    }

    // ✅ Group by category (e.g., "Sounds", "General Comments")
    const categoryMap = {};
    let assessmentA = null;
    const dates = { pre: null, mid: null, post: null };

    assessments.forEach((assessment) => {
      const phase = assessment.category?.toLowerCase(); // pre | mid | post
      if (!["pre", "mid", "post"].includes(phase)) return;

      // ✅ Track phase date
      if (assessment.createdAt) {
        dates[phase] = assessment.createdAt;
      }

      // ✅ Capture Assessment A (only once from 'pre' phase)
      if (phase === "pre" && assessment.assessmentA) {
        assessmentA = assessment.assessmentA;
      }

      // ✅ Process Assessment B
      (assessment.assessmentB || []).forEach((block) => {
        const catName = block.category || "Uncategorized";

        // Ensure category exists
        if (!categoryMap[catName]) {
          categoryMap[catName] = { category: catName, data: {} };
        }

        (block.questions || []).forEach((q) => {
          const key = `${q.title}_${q.type}`; // unique per question

          if (!categoryMap[catName].data[key]) {
            categoryMap[catName].data[key] = {
              type:
                q.type === "word-level" || q.type === "checkbox"
                  ? "table"
                  : "text",
              title: q.title,
              pre: [],
              mid: [],
              post: [],
            };
          }

          // ✅ Handle different response types
          let resp;

          if (q.type === "word-level") {
            // For word-level (like sounds), keep the object structure
            resp = q.response || {};
          } else if (Array.isArray(q.response)) {
            resp = q.response;
          } else if (
            q.response !== null &&
            q.response !== undefined &&
            q.response !== ""
          ) {
            resp = [q.response];
          } else {
            resp = [];
          }

          // Fill in the correct phase
          categoryMap[catName].data[key][phase] = resp;
        });
      });
    });

    // ✅ Convert to final array format
    const assessmentB = Object.values(categoryMap).map((cat) => ({
      category: cat.category,
      data: Object.values(cat.data),
    }));

    return {
      assessmentA,
      assessmentB,
      dates,
    };
  } catch (error) {
    throw new Error(
      `Error in getAssessmentInsightsByPatient: ${error.message}`
    );
  }
};

module.exports = {
  getAssessmentInsightsByPatient,
  getAssessmentByPatients,
};
