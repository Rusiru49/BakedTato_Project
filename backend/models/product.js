const mongoose = require("mongoose");
const Joi = require("joi");

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    minlength: 3,
    maxlength: 100,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    minlength: 10,
    maxlength: 500,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: 1,
  },
  stock: {
    type: Number,
    required: [true, "Stock quantity is required"],
    min: 0,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  image: {
    type: String, // Image URL
    required: [true, "Product image is required"],
  },
});

// Create the Product model
const Product = mongoose.model("product", productSchema);

// Validation function using Joi
const validateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(500).required(),
    price: Joi.number().min(1).required(),
    stock: Joi.number().min(0).required(),
    category: Joi.string().required(),
    image: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = { Product, validateProduct };