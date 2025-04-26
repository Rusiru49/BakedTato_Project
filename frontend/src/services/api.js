import axios from "axios";
import jsPDF from "jspdf";

// URLs
const PRODUCT_URL = "http://localhost:5000/api/products";
const DASHBOARD_URL = "http://localhost:5000/api/admin";
const ORDERS_URL = "http://localhost:5000/api/orders";

// Products
export const getAllProducts = async () => {
  const response = await axios.get(PRODUCT_URL);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${PRODUCT_URL}/${id}`);
  return response.data;
};

export const createProduct = async (product) => {
  try {
    const response = await axios.post(PRODUCT_URL, product);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating product:",
      error.response?.data?.error || error.message,
    );
    throw new Error(error.response?.data?.error || "Failed to create product");
  }
};

export const updateProduct = async (id, product) => {
  const { _id, __v, ...updatedProduct } = product;
  try {
    const response = await axios.put(`${PRODUCT_URL}/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating product:",
      error.response?.data?.error || error.message,
    );
    throw new Error(error.response?.data?.error || "Failed to update product");
  }
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${PRODUCT_URL}/${id}`);
  return response.data;
};

// Admin Dashboard APIs
export const fetchDashboardData = async () => {
  const response = await axios.get(`${DASHBOARD_URL}/dashboard-stats`);
  return response.data;
};

export const fetchOrders = async () => {
  const response = await axios.get(`${ORDERS_URL}/recent`);
  return response.data;
};

export const fetchSuppliers = async () => {
  const response = await axios.get("/api/suppliers");
  return response.data;
};

// Generate and download PDF report
export const exportSalesPDF = async () => {
  const stats = await fetchDashboardData();
  const orders = await fetchOrders();

  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("BAKEDTATO Sales Report", 20, 20);

  doc.setFontSize(12);
  doc.text(`Total Sales: Rs. ${stats.totalSales}`, 20, 40);
  doc.text(`Total Products: ${stats.totalProducts}`, 20, 50);
  doc.text(`Total Orders: ${stats.totalOrders}`, 20, 60);

  doc.text("Recent Orders:", 20, 80);
  orders.forEach((order, i) => {
    doc.text(
      `${i + 1}. ${order.customerName} - Rs. ${order.amount}`,
      20,
      90 + i * 10,
    );
  });

  doc.save("bakedtato-sales-report.pdf");
};
