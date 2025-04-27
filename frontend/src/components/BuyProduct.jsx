import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import axios from "axios";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF5722",
    },
    secondary: {
      main: "#4CAF50",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
      letterSpacing: "-0.5px",
    },
    h4: {
      fontWeight: 600,
      fontSize: "2.5rem",
    },
  },
});

const BuyProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products from backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          py: 10,
          backgroundColor: "background.default",
          minHeight: "100vh",
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
              color: "primary.main",
              letterSpacing: 1,
            }}
          >
            Buy Our Products
          </Typography>

          <Grid container spacing={4} sx={{ mt: 5 }}>
            {products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 4,
                    boxShadow: 3,
                    bgcolor: "background.paper",
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
                    image={product.image}
                    alt={product.name}
                    sx={{
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                      objectFit: "cover",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        color: "primary.main",
                        fontWeight: "bold",
                        fontSize: "1.25rem",
                        mb: 1,
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: "0.95rem",
                        mb: 2,
                      }}
                    >
                      {product.description}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "secondary.main",
                        fontWeight: "bold",
                      }}
                    >
                      Rs. {product.price}
                    </Typography>

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 2,
                        backgroundColor: "primary.main",
                        "&:hover": {
                          backgroundColor: "#e64a19",
                        },
                      }}
                    >
                      ADD TO CART
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default BuyProduct;
