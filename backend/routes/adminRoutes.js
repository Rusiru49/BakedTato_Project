const express = require("express");
const Product = require("../models/product");
const router = express.Router();

// GET: Dashboard statistics
router.get("/dashboard-stats", async (req, res) => {
  try {
    //const totalSales = await Order.aggregate([
      //{ $group: { _id: null, total: { $sum: "$amount" } } },
    //]);
    const totalProducts = await Product.countDocuments();
    //const totalOrders = await Order.countDocuments();

    res.json({
      //totalSales: totalSales[0]?.total || 0,
      totalProducts,
      //totalOrders,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

// GET: Best sellers (optional)
router.get("/best-sellers", async (req, res) => {
  try {
    const bestSellers = await Product.find().sort({ sold: -1 }).limit(5);
    res.json(bestSellers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch best sellers" });
  }
});

module.exports = router;
