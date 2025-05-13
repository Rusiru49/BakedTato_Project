import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Dashboard,
  People,
  Inventory,
  LocalShipping,
  DeliveryDining,
} from "@mui/icons-material";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { text: "Users", icon: <People />, path: "/showUsers" },
    { text: "Products", icon: <Inventory />, path: "/products" },
    { text: "Suppliers", icon: <LocalShipping />, path: "/rawmaterial-stock-view-admin" },
    { text: "Deliveries", icon: <DeliveryDining />, path: "/deliverydetails" }, // Route path to Delivery.js
  ];

  return (
    <Box
      sx={{
        width: 240,
        height: "180vh",
        backgroundColor: "#FF5722",
        color: "white",
        paddingTop: 4,
        paddingLeft: 2,
        paddingRight: 2,
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)", mb: 2 }} />
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
              color: "white",
              mb: 2.5,
              borderRadius: 2,
              paddingLeft: 2,
              paddingRight: 2,
              paddingY: 1.2,
              ":hover": {
                backgroundColor: "rgba(255, 255, 255, 0.15)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
