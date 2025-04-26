import React from "react";
import { Box, Typography, Container, useTheme } from "@mui/material";

const FreshIngredients = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 10,
        backgroundColor: "#f8f1e4", // Soft warm beige background
      }}
    >
      <Container maxWidth="md">
        <Box textAlign="center" px={2}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#7b4f21", // Rich brown color for heading
            }}
          >
            Fresh Ingredients
          </Typography>
          <Typography
            variant="h6"
            paragraph
            sx={{
              color: "#a66b2d", // Warm golden-brown
              mt: 2,
              fontStyle: "italic",
            }}
          >
            Where every bite starts with nature's best.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "700px",
              margin: "0 auto",
              mt: 3,
              color: "#5c3d1e", // Deep earthy tone for body text
              lineHeight: 1.8,
            }}
          >
            At BAKEDTATO, we believe that great taste begins with the finest ingredients.
            Our premium potatoes and fresh toppings are carefully handpicked from
            trusted local farms to deliver authentic flavor, rich nutrition, and wholesome goodness in every bite.
            <br /><br />
            From farm to table, experience the natural magic of BAKEDTATO. 🌱🥔
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FreshIngredients;
