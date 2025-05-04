import React from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProductBarChart = ({ products }) => {
  const chartData = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: "Stock Quantity",
        data: products.map((product) => product.stock),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Price (Rs.)",
        data: products.map((product) => product.price),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Product Stock and Price Overview",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Stock Quantity",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Price (Rs.)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <Card sx={{ mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          Product Analytics
        </Typography>
        <div style={{ height: "400px" }}>
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductBarChart;