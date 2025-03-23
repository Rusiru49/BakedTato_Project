import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

//Create a new product
export const createProduct = async (product) => {
  try {
    const response = await axios.post(API_URL, product);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error.response?.data?.error || error.message);
    throw new Error(error.response?.data?.error || "Failed to create product");
  }
};

// Update a product
export const updateProduct = async (id, product) => {
  // Remove the _id and __v fields before sending the request
  const { _id, __v, ...updatedProduct } = product;

  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error.response?.data?.error || error.message);
    throw new Error(error.response?.data?.error || "Failed to update product");
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};