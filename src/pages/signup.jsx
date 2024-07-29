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

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    AuthService.create({ name, phone, email, password })
      .then((res) => {
        toast.success("Account Created Successfully");
        localStorage.setItem(
          "user",
          JSON.stringify({ token: res.token, email: res.email, name: res.name })
        );
        setName("");
        setPhone("");
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((err) => {
        toast.error(`Error ${err.message}`);
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
            SignUp
          </Typography>
          <Box mt={3}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Mobile"
              variant="outlined"
              fullWidth
              margin="normal"
              value={phone}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value) && value.length <= 10) {
                  setPhone(value);
                }
              }}
              inputProps={{
                maxLength: 10,
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
            />
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
                  !email ||
                  (email && !validateEmail(email)) ||
                  !password ||
                  !name ||
                  !phone ||
                  phone?.length !== 10
                }
              >
                SignUp
              </Button>
            </Box>
          </Box>
        </Box>
        <Typography
          variant="body2"
          align="center"
          style={{ marginTop: "10px" }}
        >
          Allready have an account? <Link to="/login">Login In</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default SignUp;
