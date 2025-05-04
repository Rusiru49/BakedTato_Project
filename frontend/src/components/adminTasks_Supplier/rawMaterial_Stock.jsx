import React, { useEffect, useState } from "react";
import axios from "axios";
import "./rawMaterial_Stock.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminRawStockView = () => {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [stock, setStock] = useState([]);

  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/raw-materials/approved"
        );
        setRawMaterials(response.data);
      } catch (error) {
        console.error("Error fetching raw materials:", error);
      }
    };

    const fetchStock = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getStock");
        setStock(response.data);
      } catch (error) {
        console.error("Error fetching stock:", error);
      }
    };

    fetchRawMaterials();
    fetchStock();
  }, []);

  const categoryColors = {
    Vegetables: "#FFA726",
    Dairy: "#FFEB3B",
    Meat: "#EF5350",
    Sauces: "#AB47BC",
    "Spices and Seasonings": "#26C6DA",
    Toppings: "#66BB6A",
    Other: "#8D6E63",
  };

  const stockByCategory = stock.reduce((acc, item) => {
    const category = item.category;
    const amount = parseFloat(item.remainingStock) || 0;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(stockByCategory),
    datasets: [
      {
        label: "Remaining Stock",
        data: Object.values(stockByCategory),
        backgroundColor: Object.keys(stockByCategory).map(
          (cat) => categoryColors[cat] || "#ccc"
        ),
        borderRadius: 4,
        barThickness: 35,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="raw-materials-container">

      <div className="button-wrapper1">
        <div className="button-group-right">
          <Link to="/">
            <button className="view-stock-btn">Raw Material Approvals</button>
          </Link>
          <Link to="/">
            <button className="view-stock-btn">Provide Stock Updates</button>
          </Link>
        </div>
      </div>

      <div className="chart-header">
        <h3 className="stock-overview-title-stock">Approved Raw Materials</h3>
      </div>

      <table className="raw-materials-table-admin">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Origin</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rawMaterials.length > 0 ? (
            rawMaterials.map((material) => (
              <tr key={material.rawMaterialID}>
                <td>{material.name}</td>
                <td>{material.category}</td>
                <td>{material.origin}</td>
                <td>{material.description}</td>
                <td>{material.date}</td>
                <td>{material.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No approved raw materials found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: "40px" }}>
        <div className="chart-header">
          <h3 className="stock-overview-title-stock">Stock Overview</h3>
        </div>

        <div style={{ height: "300px", width: "60%", margin: "0 auto" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default AdminRawStockView;
