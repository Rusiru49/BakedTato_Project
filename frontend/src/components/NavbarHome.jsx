import { Login } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Popover,
  TextField,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaArrowLeft, FaTimes, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import LoginG from "./googlelogin";
import Profile from "./Profile";

const Navbar = () => {
  const [openlogin, setopenlogin] = useState(false);
  const [errorl, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [step, setStep] = useState(1);

  const [username, setuname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confpassword, setconfpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [usernamel, setunamel] = useState("");
  const [passwordl, setpasswordl] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userMail = user ? user.email : null;

  const validateSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters")
      .matches(/[a-zA-Z]/, "Password must contain letters"),
    confpassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Please re-type password"),
  });

  const validateSchema2 = Yup.object().shape({
    usernamel: Yup.string().required("Username is required"),
    passwordl: Yup.string().required("Password is required"),
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const navigate = useNavigate();

  const checkUser = async (e) => {
    e.preventDefault();
    try {
      await validateSchema2.validate(
        { usernamel, passwordl },
        { abortEarly: false },
      );
      const { data: res } = await Axios.post(
        "http://localhost:5000/api/checkLogin",
        {
          username: usernamel,
          password: passwordl,
        },
      );

      const { token, user } = res;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.email === "rus@gmail.com") {
        navigate("/dashboard");
      } else if (user.email === "thiruniWije@gmail.com") {
        navigate("/supplierHome");
      } else {
        navigate("/");
      }

      setopenlogin(false);
      window.location.reload();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
        setErrorMessage2(errors);
      } else if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const adduser = async () => {
    try {
      await validateSchema.validate(
        { username, email, password, confpassword },
        { abortEarly: false },
      );
      const response = await Axios.post("http://localhost:5000/api/addLogin", {
        email: email,
        username: username,
        password: password,
      });

      console.log("Signup success", response.data);
      setemail("");
      setuname("");
      setpassword("");
      setconfpassword("");
      setStep(step - 1);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
        setErrorMessage(errors);
      } else if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const admin = userMail === "rusiruxz@gmail.com";

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(90deg, #FF5722, #FF5722)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "#FFD700",
            letterSpacing: 1,
            fontFamily: "Poppins, sans-serif",
          }}
        >
          BAKEDTATO Management
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {admin && (
            <Link to="/showusers" style={{ textDecoration: "none" }}>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                startIcon={<FaUser />}
                sx={{
                  color: "black",
                  fontWeight: 500,
                  "&:hover": { backgroundColor: "rgba(255, 215, 0, 0.1)" },
                }}
              >
                Manage users
              </Button>
            </Link>
          )}

          {user ? (
            <Button
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              startIcon={<FaUser />}
              onClick={handleProfileClick}
              sx={{
                color: "black",
                fontWeight: 500,
                "&:hover": { backgroundColor: "rgba(255, 215, 0, 0.1)" },
              }}
            >
              {user.username || user.displayName}
            </Button>
          ) : (
            <Button
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              startIcon={<Login />}
              onClick={() => setopenlogin(true)}
              sx={{
                color: "black",
                fontWeight: 500,
                "&:hover": { backgroundColor: "rgba(255, 215, 0, 0.1)" },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>

      {/* Login/Register Dialog */}
      <Dialog open={openlogin} onClose={() => setopenlogin(false)} fullWidth>
        {step === 1 && (
          <>
            <DialogTitle
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              Login
              <IconButton onClick={() => setopenlogin(false)}>
                <FaTimes />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Username"
                  value={usernamel}
                  onChange={(e) => setunamel(e.target.value)}
                  sx={{ mb: 2 }}
                />
                {errorMessage2.usernamel && (
                  <div style={{ color: "red" }}>{errorMessage2.usernamel}</div>
                )}
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={passwordl}
                  onChange={(e) => setpasswordl(e.target.value)}
                />
                {errorMessage2.passwordl && (
                  <div style={{ color: "red" }}>{errorMessage2.passwordl}</div>
                )}
                {errorl && <Typography color="error">{errorl}</Typography>}
              </Box>
              <Grid
                container
                justifyContent="flex-end"
                sx={{ mt: 1, gap: "43%" }}
              >
                <LoginG />
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <Link
                    onClick={handleNext}
                    style={{ color: "#D2691E", fontWeight: 600 }}
                  >
                    Register here
                  </Link>
                </Typography>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="primary" onClick={checkUser}>
                Login
              </Button>
            </DialogActions>
          </>
        )}

        {step === 2 && (
          <>
            <DialogTitle
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <IconButton onClick={handleBack}>
                <FaArrowLeft />
              </IconButton>
              Sign up Form
            </DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setuname(e.target.value)}
                sx={{ mb: 2 }}
              />
              {errorMessage.username && (
                <div style={{ color: "red" }}>{errorMessage.username}</div>
              )}
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                sx={{ mb: 2 }}
              />
              {errorMessage.email && (
                <div style={{ color: "red" }}>{errorMessage.email}</div>
              )}
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              {errorMessage.password && (
                <div style={{ color: "red" }}>{errorMessage.password}</div>
              )}
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={confpassword}
                onChange={(e) => setconfpassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              {errorMessage.confpassword && (
                <div style={{ color: "red" }}>{errorMessage.confpassword}</div>
              )}
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="primary" onClick={adduser}>
                Register
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Profile Popover */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Profile />
      </Popover>
    </AppBar>
  );
};

export default Navbar;
