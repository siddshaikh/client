import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setIsAuthenticate }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "sidd@email.com",
    password: "Sidd@123",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const togglePasswordVisibility = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const params = {
        email: values.email,
        password: values.password,
      };
      const response = await axiosInstance.get("/user", { params });
      if (response.status === 200) {
        localStorage.setItem("movieUser", "thisisthetesttoken");
        setIsAuthenticate(true);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        mt: 8,
        border: "1px solid",
        borderRadius: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={values.email}
        onChange={handleChange("email")}
        margin="normal"
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        label="Password"
        type={values.showPassword ? "text" : "password"}
        value={values.password}
        onChange={handleChange("password")}
        margin="normal"
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility}>
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
