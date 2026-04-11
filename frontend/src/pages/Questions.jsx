import React, { useEffect, useState } from "react";
import API from "../services/api";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [topic, setTopic] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editTopic, setEditTopic] = useState("");

  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  const fetchQuestions = async () => {
    const res = await API.get("/questions");
    setQuestions(res.data.data);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAdd = async () => {
    await API.post("/questions", {
      question: newQuestion,
      topic,
    });

    setNewQuestion("");
    setTopic("");
    fetchQuestions();
  };

  const handleDelete = async (id) => {
    await API.delete(`/questions/${id}`);
    fetchQuestions();
  };

  const handleUpdate = async (id) => {
    await API.put(`/questions/${id}`, {
      question: editQuestion,
      topic: editTopic,
    });

    setEditingId(null);
    fetchQuestions();
  };

  const handleEditClick = (q) => {
    setEditingId(q._id);
    setEditQuestion(q.question);
    setEditTopic(q.topic);
  };

  const filteredQuestions = questions.filter((q) => {
    return (
      q.question.toLowerCase().includes(search.toLowerCase()) &&
      q.topic.toLowerCase().includes(selectedTopic.toLowerCase())
    );
  });

  const uniqueTopics = [...new Set(questions.map((q) => q.topic))];

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        My Questions
      </h1>

      {/* 🔹 ADD */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          placeholder="Question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          style={{ flex: 2, padding: "10px" }}
        />

        <input
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{ flex: 1, padding: "10px" }}
        />

        <button style={addBtn} onClick={handleAdd}>
          ADD
        </button>
      </div>

      <hr />

      {/* 🔹 SEARCH + FILTER */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: "10px" }}
        />

        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          style={{ padding: "10px" }}
        >
          <option value="">All Topics</option>
          {uniqueTopics.map((t, i) => (
            <option key={i} value={t}>
              {t}
            </option>
          ))}
        </select>

        <button
          style={clearBtn}
          onClick={() => {
            setSearch("");
            setSelectedTopic("");
          }}
        >
          CLEAR
        </button>
      </div>

      {/* 🔹 LIST */}
      {filteredQuestions.length === 0 ? (
        <p>No questions yet !!!</p>
      ) : (
        filteredQuestions.map((q) => (
          <div key={q._id} style={card}>
            {editingId === q._id ? (
              <>
                <input
                  value={editQuestion}
                  onChange={(e) => setEditQuestion(e.target.value)}
                  style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                />

                <input
                  value={editTopic}
                  onChange={(e) => setEditTopic(e.target.value)}
                  style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                />

                <button style={addBtn} onClick={() => handleUpdate(q._id)}>
                  SAVE
                </button>

                <button onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3>{q.question}</h3>
                <p>Topic: {q.topic}</p>

                <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                  <button style={editBtn} onClick={() => handleEditClick(q)}>
                    EDIT
                  </button>

                  <button
                    style={deleteBtn}
                    onClick={() => handleDelete(q._id)}
                  >
                    DELETE
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

// 🔹 STYLES
const card = {
  border: "1px solid #ccc",
  padding: "15px",
  marginTop: "10px",
  borderRadius: "10px",
  backgroundColor: "#fafafa",
};

const addBtn = {
  backgroundColor: "#1976d2",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "6px",
};

const editBtn = {
  padding: "8px 16px",
  borderRadius: "6px",
  border: "1px solid #1976d2",
  color: "#1976d2",
  backgroundColor: "white",
};

const deleteBtn = {
  padding: "8px 16px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#d32f2f",
  color: "white",
};

const clearBtn = {
  padding: "8px 16px",
  borderRadius: "6px",
  border: "1px solid #1976d2",
  color: "#1976d2",
  backgroundColor: "white",
};

export default Questions;