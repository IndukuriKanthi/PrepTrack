const StudySession = require("../models/StudySession");
const asyncHandler = require("../utils/asyncHandler");

// CREATE Session
const createSession = asyncHandler(async (req, res) => {
  const session = await StudySession.create({
    userId: req.user._id,
    subject: req.body.subject,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    dailyGoal: req.body.dailyGoal,
    notes: req.body.notes,
  });

  res.status(201).json({
    success: true,
    data: session,
  });
});

// GET All Sessions (for logged-in user)
const getSessions = asyncHandler(async (req, res) => {
  const sessions = await StudySession.find({
    userId: req.user._id,
  });

  res.status(200).json({
    success: true,
    data: sessions,
  });
});

// UPDATE Session
const updateSession = asyncHandler(async (req, res) => {
  const session = await StudySession.findById(req.params.id);

  if (!session) {
    res.status(404);
    throw new Error("Session not found");
  }

  if (session.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  Object.assign(session, req.body);
  const updatedSession = await session.save();

  res.status(200).json({
    success: true,
    data: updatedSession,
  });
});

// DELETE Session
const deleteSession = asyncHandler(async (req, res) => {
  const session = await StudySession.findById(req.params.id);

  if (!session) {
    res.status(404);
    throw new Error("Session not found");
  }

  if (session.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await session.deleteOne();

  res.status(200).json({
    success: true,
    message: "Session deleted successfully",
  });
});

module.exports = {
  createSession,
  getSessions,
  updateSession,
  deleteSession,
};
