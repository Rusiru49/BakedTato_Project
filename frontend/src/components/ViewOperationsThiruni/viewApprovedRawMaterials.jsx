import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RawMaterials.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const ApprovedRawMaterials = () => {
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

  const pieChartData = {
    labels: Object.keys(stockByCategory),
    datasets: [
      {
        data: Object.values(stockByCategory),
        backgroundColor: Object.keys(stockByCategory).map(
          (cat) => categoryColors[cat] || "#ccc"
        ),
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: "right",
        labels:{
          font:{
            size:20,
          },
          boxWidth:20,
          padding:15,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="raw-materials-container">
      <h3 className="stock-overview-title">Available Raw Materials</h3>

      <table className="raw-materials-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Origin</th>
            <th>Description</th>
            <th>Approved Date</th>
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
              <td colSpan="7">No Approved Raw Materials Found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: "40px" }}>
        <div className="chart-header">
          <h3 className="stock-overview-title-Stock">Remaining Stock Overview</h3>
          <Link to="/manage-stock">
            <button className="view-stock-btn">View Detailed Stock</button>
          </Link>
        </div>

        <div style={{ height: "450px", width: "80%", margin: "0 auto" }}>
          <Pie data={pieChartData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
};

export default ApprovedRawMaterials;
