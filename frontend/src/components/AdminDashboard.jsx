import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CssBaseline,
} from "@mui/material";
import {
  FileDownload as ExportIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Category as CategoryIcon,
  Inventory2 as InventoryIcon,
} from "@mui/icons-material";

import {
  fetchDashboardData,
  fetchOrders,
  exportSalesPDF,
  productCount,
  fetchUserCount,
  fetchStockByCategory,
} from "../services/api";

import DashboardCard from "../components/DashboardCard";

const AdminDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
  });

  const [userCount, setUserCount] = useState(0);
  const [stockByCategory, setStockByCategory] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [stats, orders, users, stock, productStats] = await Promise.all([
          fetchDashboardData(),
          fetchOrders(),
          fetchUserCount(),
          fetchStockByCategory(),
          productCount(),
        ]);

        setDashboardStats({
          totalProducts: productStats.count,
          totalOrders: stats.totalOrders,
        });

        setUserCount(users.count);
        setStockByCategory(stock);
        setRecentOrders(orders.slice(0, 5));
      } catch (error) {
        console.error("Dashboard load error", error);
        alert("Failed to load dashboard data.");
      }
    };

    loadData();
  }, []);

  const handleExport = async () => {
    try {
      await exportSalesPDF();
      alert("Sales report exported!");
    } catch (error) {
      console.error("Export failed", error);
      alert("Failed to export report.");
    }
  };

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <CssBaseline />

      {/* Dashboard Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Users"
            value={userCount}
            color="#4CAF50"
            icon={<PeopleIcon fontSize="large" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Products"
            value={dashboardStats.totalProducts}
            color="#FF5722"
            icon={<InventoryIcon fontSize="large" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Orders"
            value={dashboardStats.totalOrders}
            color="#2196F3"
            icon={<ShoppingCartIcon fontSize="large" />}
          />
        </Grid>
        {stockByCategory.map((cat) => (
          <Grid item xs={12} sm={6} md={3} key={cat.name}>
            <DashboardCard
              title={`${cat.name} Stock`}
              value={cat.count}
              color="#9C27B0"
              icon={<CategoryIcon fontSize="large" />}
            />
          </Grid>
        ))}
      </Grid>

      {/* Recent Orders Table */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6">Recent Orders</Typography>
              <Button
                variant="outlined"
                startIcon={<ExportIcon />}
                onClick={handleExport}
              >
                Export Report
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>#{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>Rs. {order.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          color={
                            order.status === "Completed"
                              ? "success"
                              : order.status === "Pending"
                              ? "warning"
                              : "error"
                          }
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
