import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const dishes = [
  {
    name: "Classic Baked Potato",
    description: "Fluffy inside, crispy outside — topped with butter and fresh herbs.",
    image: "https://source.unsplash.com/400x300/?bakedpotato,classic",
  },
  {
    name: "Cheesy Bacon Potato",
    description: "Loaded with gooey cheese, crispy bacon bits, and green onions.",
    image: "https://source.unsplash.com/400x300/?bakedpotato,cheese",
  },
  {
    name: "Veggie Delight Potato",
    description: "Stuffed with sautéed veggies, mushrooms, and vegan cheese.",
    image: "https://source.unsplash.com/400x300/?bakedpotato,vegetarian",
  },
  {
    name: "Spicy Tex-Mex Potato",
    description: "Topped with spicy beans, jalapeños, salsa, and sour cream.",
    image: "https://source.unsplash.com/400x300/?bakedpotato,spicy",
  },
  {
    name: "BBQ Pulled Pork Potato",
    description: "Tender BBQ pulled pork piled high over a buttery baked potato.",
    image: "https://source.unsplash.com/400x300/?bakedpotato,bbq",
  },
];

const OurDishes = () => {
  return (
    <Box
      sx={{
        py: 10,
        backgroundColor: "#fff7ec",
      }}
    >
      <Container>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ 
            fontWeight: "bold", 
            color: "#5c3d1e",
            letterSpacing: 1,
          }}
        >
          Our Baked Potato Dishes
        </Typography>

        <Typography
          variant="h6"
          align="center"
          color="#a66b2d"
          paragraph
          sx={{ 
            fontStyle: "italic", 
            mb: 8,
            fontSize: { xs: '1rem', md: '1.25rem' },
          }}
        >
          Freshly baked, fully loaded, crafted with love! 🥔✨
        </Typography>

        <Grid container spacing={4}>
          {dishes.map((dish, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 4,
                  boxShadow: 3,
                  bgcolor: "#fffaf3",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={dish.image}
                  alt={dish.name}
                  sx={{
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      opacity: 0.9,
                    },
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      color: "#7b4f21",
                      fontWeight: "bold",
                      fontSize: "1.25rem",
                      mb: 1,
                    }}
                  >
                    {dish.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {dish.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default OurDishes;
