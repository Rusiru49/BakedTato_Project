import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/api";
import ProductBarChart from "../components/ProductBarChart";
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent,
  Divider,
  Stack
} from "@mui/material";

import {
  Inventory as InventoryIcon,
  AttachMoney as PriceIcon,
  Assessment as AnalyticsIcon,
} from "@mui/icons-material";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const averagePrice = totalProducts > 0 
    ? (products.reduce((sum, product) => sum + product.price, 0) / totalProducts).toFixed(2)
    : 0;

  return (
    <Paper sx={{ padding: 3, margin: "auto", maxWidth: 1200, minHeight: "80vh" }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontFamily: "'Roboto', sans-serif",
          fontWeight: 600,
          color: "text.primary",
        }}
      >
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <InventoryIcon color="primary" fontSize="large" />
                <Box>
                  <Typography variant="h6" color="text.secondary">
                    Total Products
                  </Typography>
                  <Typography variant="h4">
                    {totalProducts}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <InventoryIcon color="success" fontSize="large" />
                <Box>
                  <Typography variant="h6" color="text.secondary">
                    Total Stock
                  </Typography>
                  <Typography variant="h4">
                    {totalStock}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <PriceIcon color="warning" fontSize="large" />
                <Box>
                  <Typography variant="h6" color="text.secondary">
                    Avg. Price
                  </Typography>
                  <Typography variant="h4">
                    Rs. {averagePrice}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <AnalyticsIcon color="info" fontSize="large" />
                <Box>
                  <Typography variant="h6" color="text.secondary">
                    Low Stock Items
                  </Typography>
                  <Typography variant="h4">
                    {products.filter(p => p.stock < 10).length}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontFamily: "'Roboto', sans-serif",
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <AnalyticsIcon fontSize="large" color="primary" />
        Product Analytics
      </Typography>

      <Box sx={{ mb: 4 }}>
        {isLoading ? (
          <Typography>Loading chart data...</Typography>
        ) : products.length > 0 ? (
          <ProductBarChart products={products} />
        ) : (
          <Typography>No product data available</Typography>
        )}
      </Box>
    </Paper>
  );
};

export default AdminDashboard;