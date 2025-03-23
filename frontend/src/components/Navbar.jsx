import React from "react";
import { Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Box } from "@mui/material";
import { Home, AddCircle } from "@mui/icons-material";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();

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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
