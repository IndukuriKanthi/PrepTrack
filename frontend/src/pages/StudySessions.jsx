import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent
} from "@mui/material";

const StudySessions = () => {
  // 🔹 State
  const [sessions, setSessions] = useState([]);

  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dailyGoal, setDailyGoal] = useState("");
  const [notes, setNotes] = useState("");

  // 🔹 Fetch Sessions
  const fetchSessions = async () => {
    try {
      const res = await API.get("/sessions");
      setSessions(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // 🔹 Add Session
  const handleAdd = async () => {
    try {
      if (!subject || !date || !startTime || !endTime) {
        alert("Please fill required fields");
        return;
      }

      await API.post("/sessions", {
        subject,
        date,
        startTime,
        endTime,
        dailyGoal,
        notes
      });

      // clear inputs
      setSubject("");
      setDate("");
      setStartTime("");
      setEndTime("");
      setDailyGoal("");
      setNotes("");

      fetchSessions();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Delete
  const handleDelete = async (id) => {
    try {
      await API.delete(`/sessions/${id}`);
      fetchSessions();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Simple Update (basic)
  const handleUpdate = async (id) => {
    const newSubject = prompt("Enter new subject");

    if (!newSubject) return;

    try {
      await API.put(`/sessions/${id}`, {
        subject: newSubject
      });

      fetchSessions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <Box sx={{ maxWidth: 800, margin: "auto", mt: 5 }}>

        <Typography variant="h4" sx={{ mb: 3 }}>
          Study Sessions
        </Typography>

        {/* 🔹 Add Form */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>

          <TextField
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <TextField
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <TextField
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />

          <TextField
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />

          <TextField
            label="Daily Goal"
            value={dailyGoal}
            onChange={(e) => setDailyGoal(e.target.value)}
          />

          <TextField
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <Button variant="contained" onClick={handleAdd}>
            Add Session
          </Button>
        </Box>

        {/* 🔹 List */}
        {sessions.length === 0 ? (
          <Typography>No sessions yet 🚀</Typography>
        ) : (
          sessions.map((s) => (
            <Card
              key={s._id}
              sx={{
                mb: 2,
                p: 1,
                transition: "0.2s",
                "&:hover": { boxShadow: 6 }
              }}
            >
              <CardContent>

                <Typography variant="h6" fontWeight="bold">
                  {s.subject}
                </Typography>

                <Typography color="text.secondary">
                  {new Date(s.date).toDateString()}
                </Typography>

                <Typography>
                  {s.startTime} - {s.endTime}
                </Typography>

                <Typography>
                  Goal: {s.dailyGoal}
                </Typography>

                <Typography>
                  Notes: {s.notes}
                </Typography>

                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleUpdate(s._id)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(s._id)}
                  >
                    Delete
                  </Button>
                </Box>

              </CardContent>
            </Card>
          ))
        )}

      </Box>
    </>
  );
};

export default StudySessions;