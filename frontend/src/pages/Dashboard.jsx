import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [sessions, setSessions] = useState([]);

  const token = localStorage.getItem("token");

  // 🔹 FETCH TASKS
  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data.data);
  };

  // 🔹 FETCH SESSIONS
  const fetchSessions = async () => {
    const res = await axios.get("http://localhost:5000/api/sessions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSessions(res.data.data);
  };

  useEffect(() => {
    fetchTasks();
    fetchSessions();
  }, []);

  // 🔹 CALCULATIONS
  const totalTasks = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = tasks.filter(t => t.status === "pending").length;

  const progress = totalTasks
    ? Math.round((completed / totalTasks) * 100)
    : 0;

  const recentTasks = [...tasks].slice(-5).reverse();
  const recentSessions = [...sessions].slice(-5).reverse();

  // 🔹 PROGRESS COLOR
  const getProgressColor = () => {
    if (progress < 40) return "#d32f2f"; // red
    if (progress < 70) return "#ff9800"; // orange
    return "#4caf50"; // green
  };

  const taskScore = totalTasks ? completed / totalTasks : 0;
  const sessionScore = sessions.length / (sessions.length + 5);

  const overallProgress = Math.round(
    (taskScore * 0.7 + sessionScore * 0.3) * 100
  );

  const confidence = Math.min(
    Math.round((completed + sessions.length) * 10),
    100
  );

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Dashboard
      </h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
      
      {/* 🔹 OVERALL PROGRESS */}
      <div style={card}>
        <h3>Overall Progress</h3>

        <div style={barContainer}>
          <div
            style={{
              ...barFill,
              width: `${overallProgress}%`,
              backgroundColor: "#1976d2",
            }}
          />
        </div>

        <p style={{ textAlign: "right" }}>{overallProgress}%</p>
      </div>

      {/* 🔹 CONFIDENCE */}
      <div style={card}>
        <h3>Confidence Level</h3>

        <div style={barContainer}>
          <div
            style={{
              ...barFill,
              width: `${confidence}%`,
              backgroundColor: "#4caf50",
            }}
          />
        </div>

        <p style={{ textAlign: "right" }}>{confidence}%</p>
      </div>

    </div>

      {/* 🔹 TASK STATS */}
      <h2>Tasks Overview</h2>

      <div style={{ display: "flex", gap: "20px",justifyContent: "center", marginBottom: "20px" }}>
        <div style={card}>
          <h2>{totalTasks}</h2>
          <p>Total Tasks</p>
        </div>

        <div style={card}>
          <h2 style={{ color: "#4caf50" }}>{completed}</h2>
          <p>Completed</p>
        </div>

        <div style={card}>
          <h2 style={{ color: "#d32f2f" }}>{pending}</h2>
          <p>Pending</p>
        </div>
      </div>

      {/* 🔹 PROGRESS BAR (MATCHED UI) */}
      <div style={card}>
        <h3 style={{ marginBottom: "10px" }}>Progress</h3>

        <div
          style={{
            width: "100%",
            height: "20px",
            backgroundColor: "#eee",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: getProgressColor(),
              transition: "0.4s",
            }}
          />
        </div>

        <p style={{ marginTop: "10px", textAlign: "right" }}>
          {progress}% completed
        </p>
      </div>

      {/* 🔹 RECENT TASKS */}
      <h3 style={{ marginTop: "30px" }}>Recent Tasks</h3>

      {recentTasks.length === 0 ? (
        <p>No tasks yet 🚀</p>
      ) : (
        recentTasks.map((task) => (
          <div key={task._id} style={box}>
            <strong>{task.title}</strong>
            <p>Status: {task.status}</p>
          </div>
        ))
      )}

      <hr style={{ margin: "30px 0" }} />

      {/* 🔹 SESSION STATS */}
      <h2>Study Sessions</h2>

      <div style={{ display: "flex", gap: "20px",justifyContent: "center", marginBottom: "20px" }}>
        <div style={card}>
          <h2>{sessions.length}</h2>
          <p>Total Sessions</p>
        </div>
      </div>

      {/* 🔹 RECENT SESSIONS */}
      <h3>Recent Sessions</h3>

      {recentSessions.length === 0 ? (
        <p>No sessions yet 📚</p>
      ) : (
        recentSessions.map((session) => (
          <div key={session._id} style={box}>
            <strong>{session.subject}</strong>
            <p>{session.date?.split("T")[0]}</p>
            <p>
              {session.startTime} - {session.endTime}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

// 🔹 STYLES (consistent UI)
const card = {
  flex: 1,
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  backgroundColor: "#fafafa",
};

const box = {
  border: "1px solid #ccc",
  padding: "15px",
  marginTop: "10px",
  borderRadius: "10px",
  backgroundColor: "#fafafa",
};

const barContainer = {
  width: "100%",
  height: "20px",
  backgroundColor: "#eee",
  borderRadius: "10px",
  overflow: "hidden",
};

const barFill = {
  height: "100%",
  transition: "0.4s",
};

export default Dashboard;