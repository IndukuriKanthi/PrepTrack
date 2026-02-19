const express = require("express");
const router = express.Router();

const {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/interviewQuestionController");

const { protect } = require("../middleware/authMiddleware");

// All routes protected
router.post("/", protect, createQuestion);
router.get("/", protect, getQuestions);
router.put("/:id", protect, updateQuestion);
router.delete("/:id", protect, deleteQuestion);

module.exports = router;
