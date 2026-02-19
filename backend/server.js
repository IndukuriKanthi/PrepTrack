const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const studySessionRoutes = require("./src/routes/studySessionRoutes");
const interviewQuestionRoutes = require("./src/routes/interviewQuestionRoutes");
const { errorHandler } = require("./src/middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sessions", studySessionRoutes);
app.use("/api/questions", interviewQuestionRoutes);
app.use("/api/questions", interviewQuestionRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("PrepTrack API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
