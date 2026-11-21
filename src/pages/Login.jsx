import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Alert
} from '@mui/material';

function Login({ onBack, onGoSignup, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // CORRECT API - /api/user/login
  const API_URL = 'http://localhost:5000/api/user/login';

  const handleLogin = async () => {
    setErrorMsg('');
    setSuccess(false);

    if (!email.includes('@')) {
      setErrorMsg('Please enter a valid Email!');
      return;
    }

    if (!pass) {
      setErrorMsg('Please enter Password!');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: pass
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || 'Login failed!');
        return;
      }

      // Local Storage Save
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        localStorage.setItem('user', JSON.stringify({ email: email }));
      }

      setSuccess(true);

      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(data.user);
        else if (onBack) onBack();
      }, 1000);

    } catch (error) {
      setErrorMsg('API Server not connected! Please start the backend. (node server.js)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg,#ede9fe,#fbcfe8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      p: 2
    }}>
      <Box sx={{ width: '100%', maxWidth: 440 }}>

        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 1
        }}>
          <Typography variant="h5" fontWeight={900}>
            🛍️ Gadget<span style={{ color: '#ec4899' }}>Zone</span>
          </Typography>

          <Button onClick={onBack}>✕</Button>
        </Box>

        {success && (
          <Alert severity="success" sx={{ mb: 1.5 }}>
            Login Success! Going to Home...
          </Alert>
        )}

        {errorMsg && (
          <Alert severity="error" sx={{ mb: 1.5 }}>
            {errorMsg}
          </Alert>
        )}

        <Card sx={{
          borderRadius: 4,
          p: 3,
          textAlign: 'center'
        }}>
          <Typography fontSize={50}>🛍️</Typography>

          <Typography variant="h5" fontWeight={900}>
            Welcome Back
          </Typography>

          <Typography fontSize={13} color="text.secondary" sx={{ mb: 2 }}>
            Login to GadgetZone
          </Typography>

          <TextField
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMsg('');
            }}
            placeholder="Enter Email"
            sx={{ mb: 1.5 }}
          />

          <TextField
            fullWidth
            type="password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
              setErrorMsg('');
            }}
            placeholder="Enter Password"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleLogin();
            }}
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            onClick={handleLogin}
            disabled={loading}
            variant="contained"
            sx={{
              py: 1.2,
              borderRadius: 3,
              background: 'linear-gradient(90deg,#7c3aed,#ec4899)',
              textTransform: 'none',
              fontSize: 17,
              fontWeight: 700
            }}
          >
            {loading ? 'Logging in...' : 'Login →'}
          </Button>

          <Typography sx={{ mt: 2, fontSize: 14 }}>
            Don't have an account?{' '}
            <span
              onClick={onGoSignup}
              style={{
                color: '#7c3aed',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Sign Up
            </span>
          </Typography>

        </Card>
      </Box>
    </Box>
  );
}

export default Login;