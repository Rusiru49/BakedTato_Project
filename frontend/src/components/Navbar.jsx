import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, IconButton, Popover, Menu, MenuItem } from "@mui/material";
import { Home, AddCircle, Login } from "@mui/icons-material";
import { motion } from "framer-motion";
import { FaArrowLeft, FaTimes, FaUser } from "react-icons/fa";
import Axios from "axios";
import Profile from "./Profile";
import * as Yup from 'yup';

const Navbar = () => {
  const location = useLocation();
  const [openlogin, setopenlogin] = useState(false);

  const [error, setError] = useState('');
  const [checkdata, setCheckdata] = useState({
    username: "",
    password: ""
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [step, setStep] = useState(1);

  const [username, setuname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confpassword, setconfpassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");


  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const userMail = user ? user.email : null;

  const validateSchema = Yup.object().shape({
    username: Yup.string().required('First name is required'),
    email: Yup.string()
      .email('Invalid email address') // Corrected error message
      .required('Email is required'), // Added required validation
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must be at most 20 characters')
      .matches(/[a-zA-Z]/, 'Password must contain letters'),
    confpassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match') // Validate password confirmation
      .required('Please re-type password'), // Added required validation
  });

  const handleNext = async () => {
    try {
      setStep(step + 1);
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const navigate = useNavigate();

  const checkUser = async (e) => {
    e.preventDefault();

    try {
      const { data: res } = await Axios.post('http://localhost:5000/api/checkLogin', checkdata);

      const { token, user } = res;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.email === 'rusiruxz@gmail.com') {
        navigate('/showusers');
      }else if(user.email === 'thiruniWije@gmail.com') {
        navigate('/supplierHome')
      }else{
        navigate('/')
      }


      setopenlogin(false);
      window.location.reload();
    } catch (error) {

      if (error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500) {
        setError(error.response.data.message)
      }
    }
  }

  const adduser = async () => {
    try {
      await validateSchema.validate({ username, email, password, confpassword }, { abortEarly: false });
      const response = await Axios.post('http://localhost:5000/api/addLogin', {
        email: email,
        username: username,
        password: password
      })

      console.log('Singup success', response.data);

      setemail('');
      setuname('');
      setpassword('');
      setconfpassword('');
      setStep(step - 1);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach(err => {
          errors[err.path] = err.message;
        });
        setErrorMessage(errors);
      } else if (error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500) {
        setError(error.response.data.message)
      }
    }

  }

  const admin = userMail === 'rusiruxz@gmail.com';

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(90deg, #8B4513, #D2691E)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Brand Name */}
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

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              startIcon={<Home />}
              sx={{
                color: location.pathname === "/" ? "#FFD700" : "#fff",
                fontWeight: 500,
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "rgba(255, 215, 0, 0.1)",
                },
              }}
            >
              View Products
            </Button>
          </Link>

          <Link to="/create" style={{ textDecoration: "none" }}>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              startIcon={<AddCircle />}
              sx={{
                color: location.pathname === "/create" ? "#FFD700" : "#fff",
                fontWeight: 500,
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "rgba(210, 105, 30, 0.1)",
                },
              }}
            >
              Create Product
            </Button>
          </Link>
          {admin && (
            <>
              <Link to="/showusers" style={{ textDecoration: "none" }}>
                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  startIcon={<FaUser />}
                  sx={{
                    color: 'black',
                    fontWeight: 500,
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: "rgba(255, 215, 0, 0.1)",
                    },
                  }}
                >
                  Manage users
                </Button>
              </Link>
            </>
          )}

          {user ? (
            <>
              <Link style={{ textDecoration: "none" }}>
                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  startIcon={<FaUser />}
                  sx={{
                    color: 'black',
                    fontWeight: 500,
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: "rgba(255, 215, 0, 0.1)",
                    },
                  }}
                  onClick={handleProfileClick}
                >
                  {user.username}
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link style={{ textDecoration: "none" }}>
                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  startIcon={<Login />}
                  sx={{
                    color: 'black',
                    fontWeight: 500,
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: "rgba(255, 215, 0, 0.1)",
                    },
                  }}
                  onClick={() => setopenlogin(true)}
                >
                  Login
                </Button>
              </Link></>
          )}

        </Box>
      </Toolbar>

      <Dialog open={openlogin} onClose={() => setopenlogin(false)} fullWidth>
        {step === 1 && (
          <>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
                  variant="outlined"
                  name="username"
                  value={checkdata.username}
                  onChange={(e) => setCheckdata({ ...checkdata, username: e.target.value })}
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={checkdata.password}
                  onChange={(e) => setCheckdata({ ...checkdata, password: e.target.value })}
                  required
                />
              </Box>
              <Grid container justifyContent="flex-end" sx={{ mt: 1 }}>
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <Link onClick={handleNext} style={{ color: "#D2691E", fontWeight: 600 }}>
                    Register here
                  </Link>
                </Typography>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="primary" onClick={checkUser} >
                Login
              </Button>
            </DialogActions>
          </>
        )}
        {step === 2 && (
          <>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <IconButton onClick={handleBack}>
                <FaArrowLeft />
              </IconButton>
              Sign up Form

            </DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                name="username"
                value={username}
                onChange={(e) => setuname(e.target.value)}
                sx={{ mb: 2 }}
              />
              {errorMessage.username && <div style={{ color: 'red' }}>{errorMessage.username}</div>}
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                sx={{ mb: 2 }}
              />
              {errorMessage.email && <div style={{ color: 'red' }}>{errorMessage.email}</div>}
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              {errorMessage.password && <div style={{ color: 'red' }}>{errorMessage.password}</div>}
              <TextField
                fullWidth
                label="Confirm Password"
                variant="outlined"
                type="password"
                name="confirmPassword"
                value={confpassword}
                onChange={(e) => setconfpassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              {errorMessage.confpassword && <div style={{ color: 'red' }}>{errorMessage.confpassword}</div>}
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="primary" onClick={adduser} >
                Register
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className="poppover"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Profile />
      </Popover>
    </AppBar>
  );
};

export default Navbar;
