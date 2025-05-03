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
  Avatar,
} from "@mui/material";

import {
  Inventory as ProductsIcon,
  Receipt as OrdersIcon,
  LocalShipping as SuppliersIcon,
  FileDownload as ExportIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";

import {
  fetchDashboardData,
  fetchOrders,
  fetchSuppliers,
  exportSalesPDF,
  productCount,
} from "../services/api";

import DashboardCard from "../components/DashboardCard";

const AdminDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalOrders: 0,
    newOrders: 0,
    totalSuppliers: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [stats, orders, suppliersData] = await Promise.all([
          fetchDashboardData(),
          fetchOrders(),
          fetchSuppliers(),
        ]);
  
        const totalProducts = await productCount();
        console.log("Fetched total products:", totalProducts); // DEBUG
  
        setDashboardStats({
          ...stats,
          totalProducts,
          totalSuppliers: suppliersData.length,
          newOrders: orders.filter((o) => o.status === "Pending").length,
        });
  
        setRecentOrders(orders.slice(0, 5));
        setSuppliers(suppliersData.slice(0, 5));
      } catch (error) {
        console.error("Failed to load dashboard data", error);
        alert("Failed to load dashboard data. Please try again later.");
      }
    };
    loadData();
  }, []);
  
  
  const handleExport = async () => {
    try {
      await exportSalesPDF();
      alert("Sales report exported successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export sales report.");
    }
  };

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <CssBaseline />

      {/* Dashboard Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Products"
            value={dashboardStats.totalProducts}
            icon={<ProductsIcon />}
            color="#4e73df"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Sales"
            value={`Rs. ${dashboardStats.totalSales.toLocaleString()}`}
            icon={<OrdersIcon />}
            color="#1cc88a"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Orders"
            value={dashboardStats.totalOrders}
            icon={<DashboardIcon />}
            color="#36b9cc"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Suppliers"
            value={dashboardStats.totalSuppliers}
            icon={<SuppliersIcon />}
            color="#f6c23e"
          />
        </Grid>
      </Grid>

      {/* Tables */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Recent Orders Table */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
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

        {/* Top Suppliers Table */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Top Suppliers
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Supplier</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Items Supplied</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {suppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            src={supplier.image}
                            sx={{ width: 32, height: 32, mr: 2 }}
                          >
                            {supplier.name.charAt(0)}
                          </Avatar>
                          {supplier.name}
                        </Box>
                      </TableCell>
                      <TableCell>{supplier.contact}</TableCell>
                      <TableCell>{supplier.items.join(", ")}</TableCell>
                      <TableCell>
                        <Chip
                          label={supplier.status}
                          color={
                            supplier.status === "Active"
                              ? "success"
                              : supplier.status === "On Hold"
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
