const express = require("express");
const router = express.Router();
const Product = require("../models/product");
// const Order = require("../models/order");

router.get("/dashboard-stats", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    // Optional: Include these only if your Order model is available and used
    // const totalOrders = await Order.countDocuments();
    // const totalSales = await Order.aggregate([
    //   { $group: { _id: null, total: { $sum: "$amount" } } },
    // ]);

    res.json({
      totalProducts,
      totalOrders: 0,
      totalSales: 0,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

router.get("/best-sellers", async (req, res) => {
  try {
    const bestSellers = await Product.find().sort({ sold: -1 }).limit(5);
    res.json(bestSellers);
  } catch (error) {
    console.error("Best sellers error:", error);
    res.status(500).json({ error: "Failed to fetch best sellers" });
  }
});

module.exports = router;
