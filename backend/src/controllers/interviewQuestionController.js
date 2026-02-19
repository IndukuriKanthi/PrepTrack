const InterviewQuestion = require("../models/InterviewQuestion");
const asyncHandler = require("../utils/asyncHandler");

// CREATE Question
const createQuestion = asyncHandler(async (req, res) => {
  const { question, topic, company, revisionStatus, confidenceLevel, notes } = req.body;

  const newQuestion = await InterviewQuestion.create({
    userId: req.user._id,
    question,
    topic,
    company,
    revisionStatus,
    confidenceLevel,
    notes,
  });

  res.status(201).json({
    success: true,
    data: newQuestion,
  });
});

// GET All Questions
const getQuestions = asyncHandler(async (req, res) => {
  const questions = await InterviewQuestion.find({
    userId: req.user._id,
  });

  res.status(200).json({
    success: true,
    data: questions,
  });
});

// UPDATE Question
const updateQuestion = asyncHandler(async (req, res) => {
  const question = await InterviewQuestion.findById(req.params.id);

  if (!question) {
    res.status(404);
    throw new Error("Question not found");
  }

  if (question.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  Object.assign(question, req.body);
  const updatedQuestion = await question.save();

  res.status(200).json({
    success: true,
    data: updatedQuestion,
  });
});

// DELETE Question
const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await InterviewQuestion.findById(req.params.id);

  if (!question) {
    res.status(404);
    throw new Error("Question not found");
  }

  if (question.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await question.deleteOne();

  res.status(200).json({
    success: true,
    message: "Question deleted successfully",
  });
});

module.exports = {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
};
