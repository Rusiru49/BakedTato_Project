import React from "react";
import { Box, Typography, Container, Divider } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const FastDelivery = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#fef5e7",
      }}
    >
      <Container maxWidth="md">
        <Box textAlign="center" px={2}>
          <LocalShippingIcon sx={{ fontSize: 50, color: "#ff5722", mb: 1 }} />
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "#7b4f21",
            }}
          >
            Lightning-Fast Delivery
          </Typography>

          <Divider
            sx={{
              width: 80,
              height: 4,
              backgroundColor: "#ff5722",
              mx: "auto",
              my: 2,
              borderRadius: 2,
            }}
          />

          <Typography
            variant="subtitle1"
            sx={{
              color: "#a66b2d",
              fontStyle: "italic",
              mb: 3,
            }}
          >
            Craving baked potatoes? We’re already on our way! 🚀
          </Typography>

          <Typography
            variant="body1"
            sx={{
              maxWidth: "700px",
              margin: "0 auto",
              color: "#5c3d1e",
              lineHeight: 1.75,
              fontSize: "1.05rem",
            }}
          >
            At <strong>BAKEDTATO</strong>, we don’t just bake potatoes — we deliver
            satisfaction. Count on our ultra-reliable, lightning-fast delivery to get your
            meal to you hot, fresh, and packed with flavor — exactly when you need it.
            <br /><br />
            Fast. Fresh. Flavorful. Always.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FastDelivery;
