import React from "react";
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
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  CardMedia,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getOrders,
  getProductById,
  updateOrderStatus,
  updatePreOrderStatus,
} from "../services/api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";

function AllOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [productDetails, setProductDetails] = useState({});
  const [statusMenuAnchor, setStatusMenuAnchor] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [preOrderStatusMenuAnchor, setPreOrderStatusMenuAnchor] =
    useState(null);

  useEffect(() => {
    try {
      async function loadOrders() {
        const orders = await getOrders();
        setOrders(orders);
      }

      loadOrders();
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  }, []);

  const handleExpandClick = async (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
      // Load product details for this order if not already loaded
      const order = orders.find((o) => o._id === orderId);
      if (order) {
        for (const item of order.products) {
          if (!productDetails[item.productId]) {
            try {
              const product = await getProductById(item.productId);
              setProductDetails((prev) => ({
                ...prev,
                [item.productId]: product,
              }));
            } catch (error) {
              console.error(`Error loading product ${item.productId}:`, error);
            }
          }
        }
      }
    }
  };

  const formatCurrency = (amount) => {
    return `LKR ${amount.toFixed(2)}`;
  };

  const calculateItemTotal = (item) => {
    const product = productDetails[item.productId];
    if (!product) return 0;

    const toppingsTotal = item.toppings.reduce(
      (sum, topping) => sum + topping.price,
      0,
    );
    return (product.price + toppingsTotal) * item.quantity;
  };

  const calculateOrderTotal = (order) => {
    return order.products.reduce(
      (sum, item) => sum + calculateItemTotal(item),
      0,
    );
  };

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

  const handleStatusClick = (event, orderId) => {
    setStatusMenuAnchor(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleStatusClose = () => {
    setStatusMenuAnchor(null);
    setSelectedOrderId(null);
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateOrderStatus(selectedOrderId, newStatus);
      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrderId
            ? { ...order, status: newStatus }
            : order,
        ),
      );

      handleStatusClose();
    } catch (error) {
      console.error("Error updating order status:", error);
      // TODO: Add error handling/notification
    }
  };

  const getNextPossibleStatuses = (currentStatus) => {
    if (!currentStatus) return [];
    switch (currentStatus.toLowerCase()) {
      case "pending":
        return ["Completed", "Cancelled"];
      case "completed":
        return ["Cancelled"];
      case "cancelled":
        return ["Pending"];
      default:
        return [];
    }
  };

  const getStatusColor = (status) => {
    if (!status) return "default";
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

  const formatDateTime = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "medium",
    });
  };

  const getPreOrderStatusColor = (status) => {
    if (!status) return "default";
    switch (status.toLowerCase()) {
      case "pending":
        return "warning";
      case "ready":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const handlePreOrderStatusClick = (event, orderId) => {
    setPreOrderStatusMenuAnchor(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handlePreOrderStatusClose = () => {
    setPreOrderStatusMenuAnchor(null);
    setSelectedOrderId(null);
  };

  const handlePreOrderStatusUpdate = async (newStatus) => {
    try {
      await updatePreOrderStatus(selectedOrderId, newStatus);
      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrderId
            ? { ...order, preOrderStatus: newStatus }
            : order,
        ),
      );

      handlePreOrderStatusClose();
    } catch (error) {
      console.error("Error updating pre-order status:", error);
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
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Typography variant="h6">
                            Order #{order.orderId}
                            {order.isPreOrder && (
                              <Chip
                                label="Pre-order"
                                color="info"
                                size="small"
                                sx={{ ml: 1 }}
                              />
                            )}
                          </Typography>
                          <IconButton
                            onClick={() => handleExpandClick(order._id)}
                            sx={{ ml: 1 }}
                          >
                            {expandedOrder === order._id ? (
                              <ExpandLessIcon />
                            ) : (
                              <ExpandMoreIcon />
                            )}
                          </IconButton>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          {order.isPreOrder && (
                            <>
                              <Tooltip title="Pre-order Date & Time">
                                <Chip
                                  icon={<EventIcon />}
                                  label={formatDateTime(order.preOrderDateTime)}
                                  color="info"
                                  variant="outlined"
                                />
                              </Tooltip>
                              <Tooltip title="Click to update pre-order status">
                                <Chip
                                  label={order.preOrderStatus}
                                  color={getPreOrderStatusColor(
                                    order.preOrderStatus,
                                  )}
                                  variant="outlined"
                                  onClick={(e) =>
                                    handlePreOrderStatusClick(e, order._id)
                                  }
                                  sx={{ cursor: "pointer" }}
                                />
                              </Tooltip>
                            </>
                          )}
                          <Tooltip title="Click to update order status">
                            <Chip
                              label={order.status}
                              color={getStatusColor(order.status)}
                              variant="outlined"
                              onClick={(e) => handleStatusClick(e, order._id)}
                              sx={{ cursor: "pointer" }}
                            />
                          </Tooltip>
                        </Box>
                      </Box>

                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        Ordered on: {formatDateTime(order.orderDateTime)}
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

                      <Collapse in={expandedOrder === order._id}>
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            Order Items:
                          </Typography>
                          <List>
                            {order.products.map((item, index) => {
                              const product = productDetails[item.productId];
                              return (
                                <React.Fragment key={index}>
                                  <ListItem>
                                    <Grid
                                      container
                                      spacing={2}
                                      alignItems="center"
                                    >
                                      <Grid item xs={12} sm={3}>
                                        {product?.image && (
                                          <CardMedia
                                            component="img"
                                            image={product.image}
                                            alt={
                                              product?.name || "Product image"
                                            }
                                            sx={{
                                              width: "100%",
                                              height: 100,
                                              objectFit: "contain",
                                              borderRadius: 1,
                                            }}
                                          />
                                        )}
                                      </Grid>
                                      <Grid item xs={12} sm={9}>
                                        <ListItemText
                                          primary={
                                            <Box
                                              sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                              }}
                                            >
                                              <Typography>
                                                {product?.name || "Loading..."}{" "}
                                                x {item.quantity}
                                              </Typography>
                                              <Typography>
                                                {formatCurrency(
                                                  calculateItemTotal(item),
                                                )}
                                              </Typography>
                                            </Box>
                                          }
                                          secondary={
                                            <Box>
                                              {item.toppings.length > 0 && (
                                                <Typography
                                                  variant="body2"
                                                  color="textSecondary"
                                                >
                                                  Toppings:{" "}
                                                  {item.toppings
                                                    .map((t) => t.name)
                                                    .join(", ")}
                                                </Typography>
                                              )}
                                              {product?.description && (
                                                <Typography
                                                  variant="body2"
                                                  color="textSecondary"
                                                  sx={{ mt: 0.5 }}
                                                >
                                                  {product.description}
                                                </Typography>
                                              )}
                                            </Box>
                                          }
                                        />
                                      </Grid>
                                    </Grid>
                                  </ListItem>
                                  {index < order.products.length - 1 && (
                                    <Divider />
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </List>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              mt: 2,
                            }}
                          >
                            <Typography variant="h6">
                              Total:{" "}
                              {formatCurrency(calculateOrderTotal(order))}
                            </Typography>
                          </Box>
                        </Box>
                      </Collapse>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* Regular Order Status Menu */}
      <Menu
        anchorEl={statusMenuAnchor}
        open={Boolean(statusMenuAnchor)}
        onClose={handleStatusClose}
      >
        {getNextPossibleStatuses(
          orders.find((o) => o._id === selectedOrderId)?.status,
        ).map((status) => (
          <MenuItem key={status} onClick={() => handleStatusUpdate(status)}>
            {status}
          </MenuItem>
        ))}
      </Menu>

      {/* Pre-order Status Menu */}
      <Menu
        anchorEl={preOrderStatusMenuAnchor}
        open={Boolean(preOrderStatusMenuAnchor)}
        onClose={handlePreOrderStatusClose}
      >
        {["Pending", "Ready", "Cancelled"].map((status) => (
          <MenuItem
            key={status}
            onClick={() => handlePreOrderStatusUpdate(status)}
          >
            {status}
          </MenuItem>
        ))}
      </Menu>
    </ThemeProvider>
  );
}

export default AllOrders;
