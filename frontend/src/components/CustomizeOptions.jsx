import React from "react";
import { Box, Typography, Container, Divider } from "@mui/material";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";

const CustomizeOptions = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#fff7ec",
      }}
    >
      <Container maxWidth="md">
        <Box textAlign="center" px={2}>
          <EmojiFoodBeverageIcon sx={{ fontSize: 50, color: "#ff5722", mb: 1 }} />
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "#7b4f21",
            }}
          >
            Customize Your Baked Potato
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
            Your baked potato, your rules! 🥔🎨
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
            Choose from a mouthwatering selection of toppings, rich sauces, and unique
            preparation styles. Whether you love it cheesy, crave the spice, or prefer it
            fully vegan — we’ve got something just for you.
            <br /><br />
            At <strong>BAKEDTATO</strong>, your perfect potato is just a choice away.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default CustomizeOptions;
