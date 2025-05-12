import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  createTheme,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  ThemeProvider,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { createOrder, getAllProducts } from "../services/api";
import { useNavigate } from "react-router-dom";

function Orders() {
  const navigate = useNavigate();
  // const user = JSON.parse(localStorage.getItem("user"));

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

  const AVAILABLE_TOPPINGS = useMemo(
    () => [
      { id: 1, name: "Cheese", price: 150.0 },
      { id: 2, name: "Baked Beans", price: 100.0 },
      { id: 3, name: "Tuna Mayo", price: 200.0 },
      { id: 4, name: "Coleslaw", price: 100.0 },
      { id: 5, name: "Chili Con Carne", price: 250.0 },
      { id: 6, name: "Bacon Bits", price: 150.0 },
      { id: 7, name: "Sour Cream", price: 75.0 },
      { id: 8, name: "Green Onions", price: 50.0 },
      { id: 9, name: "Butter", price: 50.0 },
      { id: 10, name: "Garlic Butter", price: 75.0 },
      { id: 11, name: "Mushrooms", price: 100.0 },
      { id: 12, name: "Sweet Corn", price: 75.0 },
    ],
    [],
  );

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [products, setProducts] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [isPreOrder, setIsPreOrder] = useState(false);
  const [preOrderDate, setPreOrderDate] = useState("");
  const [preOrderTime, setPreOrderTime] = useState("");

  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Calculate total amount whenever product or quantity changes
  useEffect(() => {
    const total = orderItems.reduce((sum, item) => {
      const product = products.find((p) => p._id === item.productId);
      const toppingsTotal = item.toppings.reduce(
        (tSum, t) => tSum + (t.price || 0),
        0,
      );
      return (
        sum +
        (product?.price || 0) * item.quantity +
        toppingsTotal * item.quantity
      );
    }, 0);
    setTotalAmount(total);
  }, [orderItems, products, AVAILABLE_TOPPINGS]);

  const handleAddToOrder = (productId) => {
    const existingItemIndex = orderItems.findIndex(
      (item) => item.productId === productId,
    );

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...orderItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + 1,
      };
      setOrderItems(updatedItems);
    } else {
      // Add new item
      setOrderItems([
        ...orderItems,
        {
          productId,
          quantity: 1,
          toppings: [],
        },
      ]);
    }
  };

  const handleRemoveFromOrder = (index) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const handleQuantityChange = (index, action) => {
    const item = orderItems[index];
    const product = products.find((p) => p._id === item.productId);
    if (!product) return;

    const updatedItems = [...orderItems];
    let newQuantity;

    if (action === "increase" && item.quantity < product.stock) {
      newQuantity = item.quantity + 1;
    } else if (action === "decrease" && item.quantity > 1) {
      newQuantity = item.quantity - 1;
    } else {
      return;
    }

    updatedItems[index] = { ...item, quantity: newQuantity };
    setOrderItems(updatedItems);
  };

  const handleToppingsChange = (index, toppingId) => {
    const updatedItems = [...orderItems];
    const item = updatedItems[index];
    const toppingObj = AVAILABLE_TOPPINGS.find((t) => t.id === toppingId);
    if (!toppingObj) return;

    const exists = item.toppings.some((t) => t.id === toppingId);
    if (exists) {
      item.toppings = item.toppings.filter((t) => t.id !== toppingId);
    } else {
      item.toppings = [...item.toppings, toppingObj];
    }
    setOrderItems(updatedItems);
  };

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const isFormValid = () => {
    return orderItems.length > 0;
  };

  const getToppingPrice = (topping) => {
    return topping?.price || 0;
  };

  const getItemTotal = (item) => {
    const product = products.find((p) => p._id === item.productId);
    const toppingsTotal = item.toppings.reduce(
      (sum, t) => sum + getToppingPrice(t),
      0,
    );
    return ((product?.price || 0) + toppingsTotal) * item.quantity;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid()) {
      setSnackbar({
        open: true,
        message: "Please fill all required fields correctly",
        severity: "error",
      });
      return;
    }

    // Validate pre-order date if it's a pre-order
    if (isPreOrder && (!preOrderDate || !preOrderTime)) {
      setSnackbar({
        open: true,
        message: "Please select a pre-order date and time",
        severity: "error",
      });
      return;
    }

    // Combine date and time and validate that it's in the future
    if (isPreOrder) {
      const preOrderDateTime = new Date(`${preOrderDate}T${preOrderTime}`);
      if (preOrderDateTime <= new Date()) {
        setSnackbar({
          open: true,
          message: "Pre-order date must be in the future",
          severity: "error",
        });
        return;
      }
    }

    try {
      await createOrder({
        products: orderItems,
        specialInstructions: specialInstructions,
        isPreOrder: isPreOrder,
        preOrderDateTime: isPreOrder ? `${preOrderDate}T${preOrderTime}` : null,
      });
      setSnackbar({
        open: true,
        message: "Order placed successfully!",
        severity: "success",
      });
      setOrderItems([]);
      setSpecialInstructions("");
      setTotalAmount(0);
      setIsPreOrder(false);
      setPreOrderDate("");
      setPreOrderTime("");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Error creating order:", error);
      setSnackbar({
        open: true,
        message: "Error placing order",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
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
              Create Your Order
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/all-orders")}
            >
              View All Orders
            </Button>
          </Box>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
              Create Your Order
            </Typography>

            <Typography
              variant="subtitle1"
              color="textSecondary"
              sx={{ mb: 4 }}
            >
              {currentDateTime.toLocaleString("en-US", {
                dateStyle: "full",
                timeStyle: "medium",
              })}
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {products.map((product) => (
                      <Grid item xs={12} sm={6} md={4} key={product._id}>
                        <Card>
                          <CardMedia
                            component="img"
                            height="160"
                            image={product.image}
                            alt={product.name}
                            sx={{ objectFit: "contain" }}
                          />
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              {product.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              sx={{ mb: 2 }}
                            >
                              {product.description}
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                              LKR {product.price.toFixed(2)}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Stock: {product.stock}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              fullWidth
                              variant="contained"
                              onClick={() => handleAddToOrder(product._id)}
                              disabled={product.stock === 0}
                            >
                              Add to Order
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                {orderItems.length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 3 }}>
                      Your Order
                    </Typography>
                    {orderItems.map((item, index) => {
                      const product = products.find(
                        (p) => p._id === item.productId,
                      );
                      return (
                        <Card key={index} sx={{ mb: 2 }}>
                          <CardContent>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={4}>
                                <Typography variant="h6">
                                  {product?.name}
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mt: 1,
                                  }}
                                >
                                  <IconButton
                                    onClick={() =>
                                      handleQuantityChange(index, "decrease")
                                    }
                                    disabled={item.quantity <= 1}
                                    size="small"
                                  >
                                    <RemoveIcon />
                                  </IconButton>
                                  <Typography>{item.quantity}</Typography>
                                  <IconButton
                                    onClick={() =>
                                      handleQuantityChange(index, "increase")
                                    }
                                    disabled={
                                      item.quantity >= (product?.stock || 0)
                                    }
                                    size="small"
                                  >
                                    <AddIcon />
                                  </IconButton>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={8}>
                                <Typography variant="subtitle2" gutterBottom>
                                  Select Toppings:
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                  }}
                                >
                                  {AVAILABLE_TOPPINGS.map((topping) => (
                                    <Chip
                                      key={topping.id}
                                      label={`${topping.name} (+LKR ${topping.price.toFixed(2)})`}
                                      onClick={() =>
                                        handleToppingsChange(index, topping.id)
                                      }
                                      color={
                                        item.toppings.some(
                                          (t) => t.id === topping.id,
                                        )
                                          ? "primary"
                                          : "default"
                                      }
                                      variant={
                                        item.toppings.some(
                                          (t) => t.id === topping.id,
                                        )
                                          ? "filled"
                                          : "outlined"
                                      }
                                      sx={{ m: 0.5 }}
                                    />
                                  ))}
                                </Box>
                              </Grid>
                            </Grid>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mt: 2,
                              }}
                            >
                              <Button
                                color="error"
                                onClick={() => handleRemoveFromOrder(index)}
                              >
                                Remove Item
                              </Button>
                              <Typography variant="subtitle1">
                                Item Total: LKR {getItemTotal(item).toFixed(2)}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </Grid>
                )}

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isPreOrder}
                        onChange={(e) => setIsPreOrder(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="This is a pre-order"
                  />
                </Grid>

                {isPreOrder && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        type="date"
                        label="Pre-order Date"
                        value={preOrderDate}
                        onChange={(e) => setPreOrderDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                          min: new Date().toISOString().split("T")[0],
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        type="time"
                        label="Pre-order Time"
                        value={preOrderTime}
                        onChange={(e) => setPreOrderTime(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </>
                )}

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Special Instructions"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Any special requests or allergies?"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={!isFormValid()}
                    sx={{ mt: 2 }}
                  >
                    {isPreOrder ? "Place Pre-order" : "Place Order"} (LKR
                    {totalAmount.toFixed(2)})
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default Orders;
