const { Product, validateProduct } = require("../models/product.js");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.countTotalProducts = async (req, res) => {
  try {
    const total = await Product.countDocuments();
    res.status(200).json({ total });
  } catch (error) {
    res.status(500).json({ error: "Failed to count products" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, price, stock, category, image } = req.body;

  if (!name || !price || !category || !image) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      image,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

exports.updateProduct = async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const updatedData = { ...req.body };
  delete updatedData._id;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true },
    );
    if (!updatedProduct)
      return res.status(404).json({ error: "Product not found" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getStockByCategory = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          totalStock: { $sum: "$stock" },
        },
      },
      {
        $project: {
          category: "$_id",
          count: "$totalStock",
          _id: 0,
        },
      },
    ]);

    res.status(200).json({ categories: result });
  } catch (error) {
    console.error("Error fetching stock by category:", error);
    res.status(500).json({ error: "Failed to fetch stock by category" });
  }
};
