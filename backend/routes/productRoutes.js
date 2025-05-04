const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getStockByCategory,
  countTotalProducts, // Ensure this is imported
} = require("../controllers/productController");

const router = express.Router();

// Define routes
router.get("/", getAllProducts);
router.get("/stock-by-category", getStockByCategory);
router.get("/:id", getProductById);
router.get("/count", countTotalProducts); // Added count route
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
