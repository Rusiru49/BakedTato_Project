import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import {
  FaEdit,
  FaSignOutAlt,
  FaTrash,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import Axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const userMail = user?.email || "";
  const userId = user?.userId || "";
  const userName = user?.username || "";

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState(userName);
  const [email, setEmail] = useState(userMail);

  const signOutUser = async () => {
    try {
      if (window.confirm("Are you sure you want to sign out?")) {
        await signOut(auth);
        localStorage.clear();
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async () => {
    try {
      if (window.confirm("Are you sure you want to delete your account?")) {
        await Axios.post("http://localhost:5000/api/deleteUser", {
          _id: userId,
        });
        localStorage.clear();
        window.location.reload();
        console.log("User deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = async () => {
    try {
      if (window.confirm("You will need to log in again after update. Continue?")) {
        const response = await Axios.post("http://localhost:5000/api/updateuser", {
          _id: userId,
          username,
          email,
        });
        console.log("User update successful", response.data);
        localStorage.clear();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper
        elevation={5}
        sx={{
          borderRadius: 3,
          padding: 4,
          backgroundColor: "#fefefe",
          textAlign: "center",
        }}
      >
        <Stack spacing={2} alignItems="center">
          {user?.photoURL ? (
            <Avatar src={user.photoURL} sx={{ width: 80, height: 80 }} />
          ) : (
            <Avatar sx={{ width: 80, height: 80 }}>
              <FaUserCircle size={40} />
            </Avatar>
          )}
          <Typography variant="h5" fontWeight={600}>
            {userName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userMail}
          </Typography>

          <Stack spacing={2} sx={{ width: "100%", mt: 3 }}>
            <Button
              variant="outlined"
              startIcon={<FaEdit />}
              onClick={() => setOpen(true)}
              disabled={!!user.displayName}
            >
              Update Account
            </Button>

            <Button
              variant="outlined"
              color="error"
              startIcon={<FaTrash />}
              onClick={deleteUser}
              disabled={!!user.displayName}
            >
              Delete Account
            </Button>

            <Button
              variant="contained"
              color="primary"
              startIcon={<FaSignOutAlt />}
              onClick={signOutUser}
              sx={{ fontWeight: 600 }}
            >
              Logout
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {/* Update Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          Update Account
          <IconButton onClick={() => setOpen(false)}>
            <FaTimes />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              label="Username"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={updateUser}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
