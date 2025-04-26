import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const BreakdownChart = ({ products }) => {
  // Sample data - replace with your actual product categories
  const data = {
    labels: ["Classic", "Cheese", "Spicy", "Vegetarian", "Premium"],
    datasets: [
      {
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Product Breakdown
      </Typography>
      <Paper sx={{ p: 3, height: "500px" }}>
        <Typography variant="h6" gutterBottom>
          Baked Potato Categories Distribution
        </Typography>
        <Box sx={{ height: "400px" }}>
          <Pie data={data} options={{ maintainAspectRatio: false }} />
        </Box>
      </Paper>
    </Box>
  );
};

export default BreakdownChart;
