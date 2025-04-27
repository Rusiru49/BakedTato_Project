import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button, useTheme } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getAllProducts } from "../services/api";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProductAnalysis = () => {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState("count");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  if (!products || products.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">No product data available.</Typography>
      </Box>
    );
  }

  const categoryData = products.reduce((acc, product) => {
    const category = product.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = {
        count: 0,
        stock: 0,
      };
    }
    acc[category].count += 1;
    acc[category].stock += Number(product.stock) || 0;
    return acc;
  }, {});

  const categoryNames = Object.keys(categoryData);
  const categoryCounts = categoryNames.map(name => categoryData[name].count);
  const categoryStocks = categoryNames.map(name => categoryData[name].stock);

  const colorPalette = [
    "#FF7043", 
    "#FFB74D", 
    "#8D6E63", 
    "#F57C00", 
    "#6D4C41",
    "#FFEB3B", 
  ];
  

  const chartData = {
    labels: categoryNames,
    datasets: [
      {
        data: viewMode === "count" ? categoryCounts : categoryStocks,
        backgroundColor: colorPalette,
        borderColor: theme.palette.background.paper,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          padding: 20,
          font: {
            family: theme.typography.fontFamily,
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value * 100) / total).toFixed(1);
            return `${label}: ${value} ${viewMode === "count" ? "items" : "in stock"} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <Paper sx={{ p: 3, width: "100%", maxWidth: 800, mx: "auto", my: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Product Distribution Analysis
      </Typography>
      
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Button
                variant={viewMode === "count" ? "contained" : "outlined"}
                onClick={() => setViewMode("count")}
                sx={{
                    backgroundColor: viewMode === "count" ? "#FF7043" : "transparent",
                    color: viewMode === "count" ? "#fff" : "#FF7043",
                    borderColor: "#FF7043",
                    '&:hover': {
                    backgroundColor: "#FF7043",
                    color: "#fff",
                    },
                }}
            >
                    By Product Count
                </Button>
            <Button
                variant={viewMode === "stock" ? "contained" : "outlined"}
                onClick={() => setViewMode("stock")}
                sx={{
                    backgroundColor: viewMode === "stock" ? "#F57C00" : "transparent",
                    color: viewMode === "stock" ? "#fff" : "#F57C00",
                    borderColor: "#F57C00",
                    '&:hover': {
                    backgroundColor: "#F57C00",
                    color: "#fff",
                    },
                }}
            >
                    By Stock Quantity
            </Button>
        </Box>


      <Box sx={{ height: 400, position: "relative" }}>
        <Pie data={chartData} options={chartOptions} />
      </Box>

      <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
        {viewMode === "count" 
          ? "Showing distribution of products across categories" 
          : "Showing total stock quantities by category"}
      </Typography>
    </Paper>
  );
};

export default ProductAnalysis;
