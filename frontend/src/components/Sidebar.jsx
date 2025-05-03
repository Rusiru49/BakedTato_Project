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

  return (
    <Box
      sx={{
        width: 240,
        height: "120vh",
        backgroundColor: "#FF5722", // Primary color for sidebar background
        color: "white",
        paddingTop: 4,
        paddingLeft: 2,
        paddingRight: 2,
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.15)",
      }}
    >
      <List>
        {/* Dashboard */}
        <ListItemButton
          component={Link}
          to="/dashboard"
          selected={location.pathname === "/dashboard"}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "rgba(255,255,255,0.15)",
            },
            color: "white",
            mb: 1.5,
            borderRadius: 1,
            paddingLeft: 2,
            paddingRight: 2,
            ":hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {/* Users */}
        <ListItemButton
          component={Link}
          to="/showUsers"
          selected={location.pathname === "/showUsers"}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "rgba(255,255,255,0.15)",
            },
            color: "white",
            mb: 1.5,
            borderRadius: 1,
            paddingLeft: 2,
            paddingRight: 2,
            ":hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <People />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>

        {/* Products */}
        <ListItemButton
          component={Link}
          to="/products"
          selected={location.pathname === "/products"}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "rgba(255,255,255,0.15)",
            },
            color: "white",
            mb: 1.5,
            borderRadius: 1,
            paddingLeft: 2,
            paddingRight: 2,
            ":hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <Inventory />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItemButton>

        {/* Suppliers */}
        <ListItemButton
          component={Link}
          to="/rawmaterial-stock-view-admin"
          selected={location.pathname === "/rawmaterial-stock-view-admin"}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "rgba(255,255,255,0.15)",
            },
            color: "white",
            mb: 1.5,
            borderRadius: 1,
            paddingLeft: 2,
            paddingRight: 2,
            ":hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
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
