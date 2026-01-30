const mongoose = require("mongoose");

const interviewQuestionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    question: {
      type: String,
      required: true
    },
    topic: {
      type: String,
      required: true
    },
    company: {
      type: String
    },
    revisionStatus: {
      type: String,
      enum: ["Not Started", "In Progress", "Revised"],
      default: "Not Started"
    },
    confidenceLevel: {
      type: Number,
      min: 1,
      max: 5
    },
    notes: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("InterviewQuestion", interviewQuestionSchema);
