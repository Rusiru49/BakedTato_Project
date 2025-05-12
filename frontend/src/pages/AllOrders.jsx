import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  createTheme,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../services/api";

function AllOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      async function loadOrders() {
        const orders = await getOrders();
        console.log(orders);
        setOrders(orders);
      }

      loadOrders();
    } catch (error) {}
  }, []);

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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "warning";
      case "completed":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          minHeight: "100vh",
          pt: 4,
          pb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography variant="h4" gutterBottom>
              All Orders
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/orders")}
            >
              Create New Order
            </Button>
          </Box>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Grid container spacing={3}>
              {orders.map?.((order) => (
                <Grid item xs={12} key={order._id}>
                  <Card>
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <Typography variant="h6">
                          Order #{order.orderId}
                        </Typography>
                        <Chip
                          label={order.status}
                          color={getStatusColor(order.status)}
                          variant="outlined"
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        Ordered on:{" "}
                        {new Date(order.orderDateTime).toLocaleString()}
                      </Typography>
                      {order.specialInstructions && (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          gutterBottom
                        >
                          Special Instructions: {order.specialInstructions}
                        </Typography>
                      )}
                      {/* TODO: Add order items details once we have product information */}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default AllOrders;
