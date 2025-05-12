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
  const { products, specialInstructions } = req.body;
  if (!products || !Array.isArray(products) || products.length === 0) {
    return res
      .status(400)
      .json({ error: "Order must contain at least one product" });
  }
  try {
    const order = new Order({
      products,
      specialInstructions: specialInstructions || "",
    });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);

    console.log(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create order", details: error.message });
  }
};

// Update an order (products, specialInstructions)
exports.updateOrder = async (req, res) => {
  const { products, specialInstructions } = req.body;
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
    const order = await Order.findOne({ orderId: req.params.id });
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
