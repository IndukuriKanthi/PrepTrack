import React, { useEffect, useState } from "react";
import axios from "axios";

const StudySessions = () => {
  const [sessions, setSessions] = useState([]);

  // ADD FORM STATE
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dailyGoal, setDailyGoal] = useState("");
  const [notes, setNotes] = useState("");

  // EDIT STATE
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    subject: "",
    date: "",
    startTime: "",
    endTime: "",
    dailyGoal: "",
    notes: "",
  });

  const token = localStorage.getItem("token");

  // FETCH SESSIONS
  const fetchSessions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sessions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSessions(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // ADD SESSION
  const handleAdd = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/sessions",
        { subject, date, startTime, endTime, dailyGoal, notes },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // reset form
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

  // DELETE SESSION
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/sessions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchSessions();
    } catch (err) {
      console.error(err);
    }
  };

  // CLICK EDIT
  const handleEditClick = (session) => {
    setEditingId(session._id);
    setEditData({
      subject: session.subject,
      date: session.date.split("T")[0],
      startTime: session.startTime,
      endTime: session.endTime,
      dailyGoal: session.dailyGoal,
      notes: session.notes,
    });
  };

  // UPDATE SESSION
  const handleUpdate = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/sessions/${id}`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditingId(null);
      fetchSessions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Study Sessions
      </h1>

      {/* ADD FORM */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
        <input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ flex: 1, padding: "10px" }}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: "10px" }}
        />

        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          style={{ padding: "10px" }}
        />

        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          style={{ padding: "10px" }}
        />

        <input
          placeholder="Daily Goal"
          value={dailyGoal}
          onChange={(e) => setDailyGoal(e.target.value)}
          style={{ flex: 1, padding: "10px" }}
        />

        <input
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ flex: 2, padding: "10px" }}
        />

        <button
          onClick={handleAdd}
          style={{
            background: "#1976d2",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ADD
        </button>
      </div>

      <hr style={{ marginBottom: "20px" }} />

      {/* LIST */}
      {sessions.length === 0 ? (
        <p style={{ textAlign: "center" }}>No sessions yet !!!</p>
      ) : (
        sessions.map((session) => (
          <div
            key={session._id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            {editingId === session._id ? (
              <>
                <input
                  value={editData.subject}
                  onChange={(e) =>
                    setEditData({ ...editData, subject: e.target.value })
                  }
                  style={{ width: "100%", marginBottom: "8px", padding: "8px" }}
                />

                <input
                  type="date"
                  value={editData.date}
                  onChange={(e) =>
                    setEditData({ ...editData, date: e.target.value })
                  }
                  style={{ marginBottom: "8px", padding: "8px" }}
                />

                <input
                  type="time"
                  value={editData.startTime}
                  onChange={(e) =>
                    setEditData({ ...editData, startTime: e.target.value })
                  }
                  style={{ marginBottom: "8px", padding: "8px" }}
                />

                <input
                  type="time"
                  value={editData.endTime}
                  onChange={(e) =>
                    setEditData({ ...editData, endTime: e.target.value })
                  }
                  style={{ marginBottom: "8px", padding: "8px" }}
                />

                <input
                  value={editData.dailyGoal}
                  onChange={(e) =>
                    setEditData({ ...editData, dailyGoal: e.target.value })
                  }
                  style={{ width: "100%", marginBottom: "8px", padding: "8px" }}
                />

                <textarea
                  value={editData.notes}
                  onChange={(e) =>
                    setEditData({ ...editData, notes: e.target.value })
                  }
                  style={{ width: "100%", marginBottom: "8px", padding: "8px" }}
                />

                <button
                  onClick={() => handleUpdate(session._id)}
                  style={{
                    background: "#1976d2",
                    color: "white",
                    padding: "8px 15px",
                    border: "none",
                    borderRadius: "6px",
                    marginRight: "10px",
                  }}
                >
                  Save
                </button>

                <button
                  onClick={() => setEditingId(null)}
                  style={{
                    padding: "8px 15px",
                    borderRadius: "6px",
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3>{session.subject}</h3>
                <p>{new Date(session.date).toDateString()}</p>
                <p>
                  {session.startTime} - {session.endTime}
                </p>
                <p>Goal: {session.dailyGoal}</p>
                <p>Notes: {session.notes}</p>

                <button
                  onClick={() => handleEditClick(session)}
                  style={{
                    background: "#e3f2fd",
                    color: "#1976d2",
                    padding: "8px 15px",
                    border: "1px solid #1976d2",
                    borderRadius: "6px",
                    marginRight: "10px",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(session._id)}
                  style={{
                    background: "#d32f2f",
                    color: "white",
                    padding: "8px 15px",
                    border: "none",
                    borderRadius: "6px",
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default StudySessions;

