import React, { useEffect, useState } from "react";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");

  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddOrUpdate = async () => {
    if (editId) {
      // UPDATE
      await axios.put(
        `http://localhost:5000/api/tasks/${editId}`,
        { title, description, priority, dueDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      // CREATE
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title, description, priority, dueDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    resetForm();
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditId(task._id);
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setDueDate(task.dueDate?.split("T")[0]);
  };

  const resetForm = () => {
    setEditId(null);
    setTitle("");
    setDescription("");
    setPriority("low");
    setDueDate("");
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  const toggleStatus = async (task) => {
    await axios.put(
      `http://localhost:5000/api/tasks/${task._id}`,
      {
        status: task.status === "completed" ? "pending" : "completed",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTasks();
  };

  const getPriorityColor = (priority) => {
    if (priority === "high") return "red";
    if (priority === "medium") return "orange";
    return "green";
  };

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Tasks
      </h1>

      {/* FORM */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: 2, padding: "10px" }}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ flex: 2, padding: "10px" }}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ padding: "10px" }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{ padding: "10px" }}
        />

        <button
          onClick={handleAddOrUpdate}
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
          }}
        >
          {editId ? "UPDATE" : "ADD"}
        </button>

        {editId && (
          <button onClick={resetForm}>Cancel</button>
        )}
      </div>

      <hr />

      {/* TASK LIST */}
      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "10px",
            backgroundColor: "#fafafa",
          }}
        >
          <h2>
            {task.title}{" "}
            <span style={{ color: getPriorityColor(task.priority) }}>
              ({task.priority})
            </span>
          </h2>

          <p>{task.description}</p>

          <p>
            <strong>Due:</strong> {task.dueDate?.split("T")[0]}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                color:
                  task.status === "completed" ? "green" : "red",
              }}
            >
              {task.status}
            </span>
          </p>

          <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
  <button
    onClick={() => handleEdit(task)}
    style={{
      padding: "8px 16px",
      borderRadius: "6px",
      border: "1px solid #1976d2",
      color: "#1976d2",
      backgroundColor: "white",
      cursor: "pointer",
    }}
  >
    EDIT
  </button>

  <button
    onClick={() => toggleStatus(task)}
    style={{
      padding: "8px 16px",
      borderRadius: "6px",
      border: "none",
      backgroundColor: "#ff9800",
      color: "white",
      cursor: "pointer",
    }}
  >
    TOGGLE
  </button>

  <button
    onClick={() => handleDelete(task._id)}
    style={{
      padding: "8px 16px",
      borderRadius: "6px",
      border: "none",
      backgroundColor: "#d32f2f",
      color: "white",
      cursor: "pointer",
    }}
  >
    DELETE
  </button>
</div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;