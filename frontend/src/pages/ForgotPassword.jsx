import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async () => {
    try {
      await API.post("/auth/forgot-password", {
        email,
        newPassword,
      });

      alert("Password updated successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div style={container}>
      <h1>Reset Password</h1>

      <input
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={input}
      />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={input}
      />

      <button onClick={handleReset} style={btn}>
        RESET PASSWORD
      </button>

      <p>
        Back to{" "}
        <span onClick={() => navigate("/login")} style={link}>
          Login
        </span>
      </p>
    </div>
  );
};

// styles
const container = {
  maxWidth: "400px",
  margin: "100px auto",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  textAlign: "center",
};

const input = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const btn = {
  padding: "10px",
  borderRadius: "6px",
  backgroundColor: "#1976d2",
  color: "white",
  border: "none",
};

const link = {
  color: "#1976d2",
  cursor: "pointer",
};

export default ForgotPassword;