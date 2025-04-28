import React from "react";
import { Box, Typography, Container } from "@mui/material";

const CustomizeOptions = () => {
  return (
    <Box
      sx={{
        py: 10,
        backgroundColor: "#fff7ec",
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
              color: "#7b4f21",
            }}
          >
            Customizable Options
          </Typography>
          <Typography
            variant="h6"
            paragraph
            sx={{
              color: "#a66b2d",
              mt: 2,
              fontStyle: "italic",
            }}
          >
            Your baked potato, your rules! 🥔🎨
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "700px",
              margin: "0 auto",
              mt: 3,
              color: "#5c3d1e",
              lineHeight: 1.8,
            }}
          >
            Choose from a mouthwatering variety of toppings, sauces, and styles to craft 
            the ultimate baked potato experience tailored exactly to your cravings.
            <br /><br />
            Make it cheesy, make it spicy, make it vegan — at BAKEDTATO, it's all about your perfect meal, your way!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default CustomizeOptions;
