import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
} from "@mui/material";
import { Facebook, Instagram, Twitter, Email } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        color: "white",
        py: 4, // Reduced padding
        mt: 6, // Slightly reduced top margin
        borderTop: "1px solid #333",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: "primary.main" }}>
              BAKEDTATO
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
              Crispy on the outside, fluffy on the inside — delivered hot and fresh.
            </Typography>
          </Grid>

          <Grid item xs={6} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: "secondary.main" }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Link href="/" color="inherit" underline="hover" sx={{ fontSize: "0.85rem" }}>Home</Link>
              <Link href="/orders" color="inherit" underline="hover" sx={{ fontSize: "0.85rem" }}>Order Now</Link>
              <Link href="/customize-options" color="inherit" underline="hover" sx={{ fontSize: "0.85rem" }}>Customize</Link>
              <Link href="/contact" color="inherit" underline="hover" sx={{ fontSize: "0.85rem" }}>Contact</Link>
            </Box>
          </Grid>

          <Grid item xs={6} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: "secondary.main" }}>
              Connect With Us
            </Typography>
            <Box>
              <IconButton color="primary" href="https://facebook.com" target="_blank" sx={{ fontSize: "1.2rem" }}>
                <Facebook />
              </IconButton>
              <IconButton color="primary" href="https://instagram.com" target="_blank" sx={{ fontSize: "1.2rem" }}>
                <Instagram />
              </IconButton>
              <IconButton color="primary" href="https://twitter.com" target="_blank" sx={{ fontSize: "1.2rem" }}>
                <Twitter />
              </IconButton>
              <IconButton color="primary" href="mailto:support@bakedtato.com" sx={{ fontSize: "1.2rem" }}>
                <Email />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box mt={3} textAlign="center">
          <Typography variant="body2" sx={{ color: "#aaa", fontSize: "0.85rem" }}>
            © {new Date().getFullYear()} BAKEDTATO. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
