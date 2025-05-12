const express = require("express");
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  updateOrderStatus,
  updatePreOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

const router = express.Router();

// Get all orders
router.get("/", getAllOrders);
// Get order by orderId
router.get("/:id", getOrderById);
// Create a new order
router.post("/", createOrder);
// Update an order (products, specialInstructions)
router.put("/:id", updateOrder);
// Update order status
router.patch("/:id/status", updateOrderStatus);
// Update pre-order status
router.patch("/:id/pre-order-status", updatePreOrderStatus);
// Delete an order
router.delete("/:id", deleteOrder);

module.exports = router;
