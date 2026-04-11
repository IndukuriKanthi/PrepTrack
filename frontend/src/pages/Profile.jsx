import React, { useEffect, useState } from "react";
import API from "../services/api";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editing, setEditing] = useState(false);

  const fetchProfile = async () => {
    const res = await API.get("/users/profile");
    setName(res.data.name);
    setEmail(res.data.email);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    await API.put("/users/profile", { name });
    setEditing(false);
    fetchProfile();
  };

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        My Profile
      </h1>

      <div style={card}>
        <p><strong>Email:</strong> {email}</p>

        {editing ? (
          <>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <button style={saveBtn} onClick={handleUpdate}>
              SAVE
            </button>

            <button onClick={() => setEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {name}</p>

            <button style={editBtn} onClick={() => setEditing(true)}>
              EDIT PROFILE
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// 🔹 Styles
const card = {
  border: "1px solid #ccc",
  padding: "20px",
  borderRadius: "10px",
  backgroundColor: "#fafafa",
};

const editBtn = {
  padding: "10px 20px",
  borderRadius: "6px",
  border: "1px solid #1976d2",
  color: "#1976d2",
  backgroundColor: "white",
};

const saveBtn = {
  padding: "10px 20px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#1976d2",
  color: "white",
  marginRight: "10px",
};

export default Profile;