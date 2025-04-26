import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Dashboard,
  People,
  Inventory,
  LocalShipping,
} from "@mui/icons-material";

const Sidebar = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = user?.email === "rusiruxz@gmail.com";

  return (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        backgroundColor: "#FF5722",
        color: "white",
        paddingTop: 4,
      }}
    >
      <List>
        <ListItemButton
          component={Link}
          to="/dashboard"
          selected={location.pathname === "/dashboard"}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "rgba(255,255,255,0.15)",
            },
            color: "white",
            mb: 1,
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/showUsers"
          selected={location.pathname === "/showUsers"}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "rgba(255,255,255,0.15)",
            },
            color: "white",
            mb: 1,
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <People />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/products"
          selected={location.pathname === "/products"}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "rgba(255,255,255,0.15)",
            },
            color: "white",
            mb: 1,
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <Inventory />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/suppliers"
          selected={location.pathname === "/suppliers"}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "rgba(255,255,255,0.15)",
            },
            color: "white",
            mb: 1,
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <LocalShipping />
          </ListItemIcon>
          <ListItemText primary="Suppliers" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
