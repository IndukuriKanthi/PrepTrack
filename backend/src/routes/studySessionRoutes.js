const express = require("express");
const router = express.Router();
const {
  createSession,
  getSessions,
  updateSession,
  deleteSession,
} = require("../controllers/studySessionController");

const { protect } = require("../middleware/authMiddleware");

// All routes protected
router.post("/", protect, createSession);
router.get("/", protect, getSessions);
router.put("/:id", protect, updateSession);
router.delete("/:id", protect, deleteSession);

module.exports = router;
