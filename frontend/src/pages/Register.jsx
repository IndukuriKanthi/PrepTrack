import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      // ⚠️ IMPORTANT (your backend format)
      localStorage.setItem("token", res.data.data.token);

      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Registration failed");
    }
  };

  return (
    <div style={container}>
      <h1>Register</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={input}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={input}
      />

      <button onClick={handleRegister} style={btn}>
        REGISTER
      </button>

      <p>
        Already have an account?{" "}
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

export default Register;