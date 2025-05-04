const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getStockByCategory,
  countTotalProducts,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/stock-by-category", getStockByCategory);
router.get("/:id", getProductById);
router.get("/count", countTotalProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
