import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 🔐 Auto redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert("Please enter email and password");
        return;
      }

      const res = await API.post('/auth/login', {
        email,
        password
      });

      localStorage.setItem('token', res.data.data.token);

      console.log("Login success");

      navigate('/dashboard');

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Login failed");
    }
  };

  return (
    <Box sx={{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      gap:4,
      marginTop:10
    }}>

      <Typography variant='h4'>Login</Typography>

      <TextField
        label='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label='Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="contained"
        onClick={handleLogin}   // ✅ clean
      >
        Login
      </Button>

    </Box>
  );
};

export default Login;