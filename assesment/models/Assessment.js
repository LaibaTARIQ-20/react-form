const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema({
  assessmentA: [
    {
      category: String,
      questions: [
        {
          response: mongoose.Schema.Types.Mixed,
          type: String,
          fieldname: String,
          title: String,
          allowMultiple: Boolean,
        },
      ],
    },
  ],
  assessmentB: [
    {
      category: String,
      questions: [
        {
          response: mongoose.Schema.Types.Mixed,
          type: String,
          fieldname: String,
          title: String,
          allowMultiple: Boolean,
        },
      ],
    },
  ],
  user: String,
  doctor: mongoose.Schema.Types.ObjectId,
  patient: mongoose.Schema.Types.ObjectId,
  category: String, // Pre, Mid, Post
  requestedAt: Date,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("Assessment", assessmentSchema);
