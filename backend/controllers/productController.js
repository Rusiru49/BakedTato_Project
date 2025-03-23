const { Product, validateProduct } = require("../models/product.js");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, description, price, stock, category, image } = req.body;

  if (!name || !price || !category || !image) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const product = new Product({ name, description, price, stock, category, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  console.log("Request Body:", req.body);  // Log the body to check for _id field

  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Remove the _id field if it exists in the request body
  const updatedData = { ...req.body };
  delete updatedData._id;  // Remove _id field if present

  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};


// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
