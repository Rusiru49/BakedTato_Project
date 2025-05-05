import React from "react";
import { Box, Typography, Container, Divider } from "@mui/material";
import SpaIcon from "@mui/icons-material/Spa";

const FreshIngredients = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#f8f1e4",
      }}
    >
      <Container maxWidth="md">
        <Box textAlign="center" px={2}>
          <SpaIcon sx={{ fontSize: 50, color: "#4caf50", mb: 1 }} />
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "#7b4f21",
            }}
          >
            Farm-Fresh Ingredients
          </Typography>

          <Divider
            sx={{
              width: 80,
              height: 4,
              backgroundColor: "#4caf50",
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
            Where every bite begins with nature’s best. 🌱🥔
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
            At <strong>BAKEDTATO</strong>, we believe the secret to unforgettable flavor
            lies in the ingredients. That’s why we source our potatoes and toppings
            directly from trusted local farms — ensuring maximum freshness, nutrition, and natural goodness in every serving.
            <br /><br />
            From soil to soul, experience what real freshness tastes like.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FreshIngredients;
