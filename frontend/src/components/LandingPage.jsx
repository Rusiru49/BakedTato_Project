import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import React from "react";
import Customize from "../assets/customize.jpg";
import FastDel from "../assets/FastDel.jpg";
import FreshIngrediants from "../assets/Ingredients.jpg";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

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

const BakedTatoLandingPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/orders");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
        <IconButton
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "primary.main",
          }}
        >
          <AccountCircleIcon fontSize="large" />
        </IconButton>

        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            py: 12,
            textAlign: "center",
            position: "relative",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h1" gutterBottom>
              Welcome to BAKEDTATO
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Typography variant="h5" paragraph>
              The ultimate baked potato experience. Crispy on the outside,
              fluffy on the inside, and loaded with flavor.
            </Typography>
          </motion.div>

          {user && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleOrderClick}
              >
                <Typography variant="h6" color="white">
                  Order Now
                </Typography>
              </Button>
            </Box>
          </motion.div>          
          )}
        </Box>

        <Container sx={{ py: 8 }} id="learn-more">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          ></motion.div>
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                title: "Fresh Ingredients",
                description:
                  "We use only the freshest potatoes and toppings sourced from local farms.",
                image: FreshIngrediants,
              },
              {
                title: "Customizable Options",
                description:
                  "Build your perfect baked potato with a variety of toppings and sauces.",
                image: Customize,
              },
              {
                title: "Fast Delivery",
                description:
                  "Get your baked potato delivered hot and fresh to your doorstep.",
                image: FastDel,
              },
            ].map((feature, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      bgcolor: "background.paper",
                      boxShadow: 3,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={feature.image}
                      alt={feature.title}
                      sx={{ height: 200, objectFit: "cover" }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {feature.title}
                      </Typography>
                      <Typography>{feature.description}</Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                      <Button size="small" color="primary" onClick={() => {
                        if (feature.title === "Fresh Ingredients") navigate("/fresh-ingredients");
                        else if (feature.title === "Customizable Options") navigate("/customize-options");
                        else if (feature.title === "Fast Delivery") navigate("/fast-delivery");
                      }}>
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          <Footer />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default BakedTatoLandingPage;
