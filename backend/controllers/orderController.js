const Order = require("../models/orderModel");

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  const { products, specialInstructions, isPreOrder, preOrderDateTime } =
    req.body;
  if (!products || !Array.isArray(products) || products.length === 0) {
    return res
      .status(400)
      .json({ error: "Order must contain at least one product" });
  }

  // Validate pre-order date if it's a pre-order
  if (isPreOrder && !preOrderDateTime) {
    return res
      .status(400)
      .json({ error: "Pre-order date is required for pre-orders" });
  }

  // Validate that pre-order date is in the future
  if (isPreOrder && new Date(preOrderDateTime) <= new Date()) {
    return res
      .status(400)
      .json({ error: "Pre-order date must be in the future" });
  }

  try {
    const order = new Order({
      products,
      specialInstructions: specialInstructions || "",
      isPreOrder: isPreOrder || false,
      preOrderDateTime: isPreOrder ? new Date(preOrderDateTime) : null,
      preOrderStatus: isPreOrder ? "Pending" : null,
    });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create order", details: error.message });
  }
};

// Update an order (products, specialInstructions)
exports.updateOrder = async (req, res) => {
  const { products, specialInstructions, isPreOrder, preOrderDateTime } =
    req.body;
  try {
    const order = await Order.findOne({ orderId: req.params.id });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    if (products) {
      if (!Array.isArray(products) || products.length === 0) {
        return res
          .status(400)
          .json({ error: "Order must contain at least one product" });
      }
      order.products = products;
    }
    if (typeof specialInstructions === "string") {
      order.specialInstructions = specialInstructions;
    }
    if (typeof isPreOrder === "boolean") {
      order.isPreOrder = isPreOrder;
      if (isPreOrder && preOrderDateTime) {
        order.preOrderDateTime = new Date(preOrderDateTime);
        order.preOrderStatus = "Pending";
      } else if (!isPreOrder) {
        order.preOrderDateTime = null;
        order.preOrderStatus = null;
      }
    }
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update order", details: error.message });
  }
};

// Update order status (Pending, Completed, Cancelled)
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  if (!status || !["Pending", "Completed", "Cancelled"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }
  try {
    const order = await Order.findOne({ _id: req.params.id });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    order.status = status;
    if (status === "Completed" || status === "Cancelled") {
      order.orderDispatchDateTime = new Date();
    }
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update order status", details: error.message });
  }
};

// Update pre-order status (Pending, Ready, Cancelled)
exports.updatePreOrderStatus = async (req, res) => {
  const { preOrderStatus } = req.body;
  if (
    !preOrderStatus ||
    !["Pending", "Ready", "Cancelled"].includes(preOrderStatus)
  ) {
    return res.status(400).json({ error: "Invalid pre-order status value" });
  }
  try {
    const order = await Order.findOne({ _id: req.params.id });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    if (!order.isPreOrder) {
      return res.status(400).json({ error: "This is not a pre-order" });
    }
    order.preOrderStatus = preOrderStatus;
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Failed to update pre-order status",
        details: error.message,
      });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findOneAndDelete({
      orderId: req.params.id,
    });
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
};
