import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  CssBaseline,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Badge,
  Avatar,
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Inventory as ProductsIcon,
  Receipt as OrdersIcon,
  Assessment as ReportsIcon,
  ExitToApp as LogoutIcon,
  FileDownload as ExportIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon
} from "@mui/icons-material";
import { fetchDashboardData, fetchOrders, exportSalesPDF } from "../services/api";
import DashboardCard from "../components/DashboardCard";

const drawerWidth = 260;

const AdminDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalOrders: 0,
    newOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [notificationsCount, setNotificationsCount] = useState(3);

  useEffect(() => {
    const loadData = async () => {
      try {
        const stats = await fetchDashboardData();
        const orders = await fetchOrders();
        setDashboardStats(stats);
        setRecentOrders(orders.slice(0, 5)); // Only show 5 most recent orders
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      }
    };

    loadData();
  }, []);

  const handleSidebarClick = (section) => {
    setActiveSection(section);
  };

  const handleExport = async () => {
    try {
      await exportSalesPDF();
      alert("Sales report exported successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export sales report");
    }
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, section: "dashboard" },
    { text: "Products", icon: <ProductsIcon />, section: "products" },
    { text: "Orders", icon: <OrdersIcon />, section: "orders" },
    { text: "Reports", icon: <ReportsIcon />, section: "reports" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#2c3e50",
            color: "white",
            marginTop: '64px',
          },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center", py: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            BAKEDTATO
          </Typography>
        </Toolbar>
        
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleSidebarClick(item.section)}
              sx={{
                backgroundColor: activeSection === item.section ? "rgba(255, 255, 255, 0.1)" : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.08)"
                },
                my: 0.5,
                mx: 2,
                borderRadius: 1
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        
        <Box sx={{ mt: "auto", p: 2 }}>
          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.12)", mb: 2 }} />
          <ListItem
            button
            onClick={() => handleSidebarClick("logout")}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)"
              },
              borderRadius: 1
            }}
          >
            <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
          backgroundColor: "#f9fafc",
          minHeight: "100vh",
          marginTop: '64px',
        }}
      >
        
        {activeSection === "dashboard" && (
  <>
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
          title="New Orders"
          value={dashboardStats.newOrders}
          icon={<NotificationsIcon />}
          color="#f6c23e"
        />
      </Grid>
    </Grid>

    <Grid container spacing={3} sx={{ mt: 1 }}>
      <Grid item xs={12}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
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
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>#{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell align="right">Rs. {order.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Box
                          component="span"
                          sx={{
                            p: "4px 8px",
                            borderRadius: 10,
                            backgroundColor:
                              order.status === "Completed"
                                ? "#d4edda"
                                : order.status === "Pending"
                                ? "#fff3cd"
                                : "#f8d7da",
                            color:
                              order.status === "Completed"
                                ? "#155724"
                                : order.status === "Pending"
                                ? "#856404"
                                : "#721c24",
                          }}
                        >
                          {order.status}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No recent orders available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  </>
)}

        {activeSection === "orders" && (
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>Orders Management</Typography>
            {/* Orders management content */}
          </Paper>
        )}

        {activeSection === "products" && (
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>Products Management</Typography>
            {/* Products management content */}
          </Paper>
        )}

        {activeSection === "reports" && (
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>Sales Reports</Typography>
            {/* Reports content */}
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default AdminDashboard;