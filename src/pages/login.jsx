import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import AuthService from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    AuthService.login(email, password)
      .then((res) => {
        toast.success("Logged In Successfully");
        localStorage.setItem(
          "user",
          JSON.stringify({ token: res.token, email: res.email })
        );
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((err) => {
        toast.error("Invalid credentials");
      });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Box mt={3}>
          <Typography variant="h4" align="center">
            Login
          </Typography>
          <Box mt={3}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
                disabled={
                  !email || (email && !validateEmail(email)) || !password
                }
              >
                Login
              </Button>
            </Box>
          </Box>
        </Box>
        <Typography variant="body2" align="center" style={{ marginTop: "10px" }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
