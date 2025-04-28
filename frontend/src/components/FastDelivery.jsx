import React from "react";
import { Box, Typography, Container } from "@mui/material";

const FastDelivery = () => {
  return (
    <Box
      sx={{
        py: 10,
        backgroundColor: "#fef5e7",
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
            Fast Delivery
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
            Craving baked potatoes? We've got you covered! 🚀
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
            Our speedy delivery service ensures that your favorite BAKEDTATO meals
            arrive piping hot, fresh, and full of flavor — right at your doorstep.
            <br /><br />
            Fast. Fresh. Flavorful. Always.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FastDelivery;
