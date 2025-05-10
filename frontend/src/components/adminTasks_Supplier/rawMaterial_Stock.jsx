import React, { useEffect, useState } from "react";
import axios from "axios";
import "./rawMaterial_Stock.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminRawStockView = () => {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [stock, setStock] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  

  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/raw-materials/approved");
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

    const fetchPendingApprovals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/raw-materials/pending");
        setPendingCount(response.data.length);
      } catch (error) {
        console.error("Error fetching pending approvals:", error);
      }
    };

    fetchRawMaterials();
    fetchStock();
    fetchPendingApprovals();
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

  const allCategories = Object.keys(categoryColors);

  const stockByCategory = stock.reduce((acc, item) => {
    const category = item.category;
    const amount = parseFloat(item.remainingStock) || 0;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const stockCards = allCategories.map((category) => ({
    name: category,
    value: stockByCategory[category] || 0,
    color: categoryColors[category],
  }));

  const handleDelete = async () => {
    if (!selectedItem) return;
  
    try {
      const deleteResponse = await axios.delete(
        `http://localhost:5000/api/deleteRawMaterialForever/${selectedItem._id}`
      );
  
      setRawMaterials((prev) =>
        prev.filter((item) => item._id !== selectedItem._id)
      );
  
      toast.success(deleteResponse.data.msg ,{
        position: "top-right",
        autoClose: 3000,
      });
  
      setSelectedItem(null);
    } catch (error) {
      console.error("Error deleting raw material:", error);
      toast.error("Error deleting raw material", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="raw-materials-container">
      <div className="button-wrapper1">
        <div className="button-group-right">
          <Link to="/rawmaterial-approve-reject-admin" className="approval-btn-wrapper">
            <button className="view-stock-btn approval-btn">
              <span className="pending-count-label">Pending Raw Material Approvals</span>
              <span className="pending-count-number">{pendingCount}</span>
            </button>
          </Link>
          <Link to="/manage-stock-admin" className="approval-btn-wrapper">
            <button className="view-stock-btn approval-btn">
              <span className="pending-count-label">Stock Updates</span>
            </button>
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
            <th>Date Approved</th>
            <th>Status</th>
            <th>Action</th>
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
                <td>
                  <button
                    onClick={() => setSelectedItem(material)}
                    className="actionButtonsDel"
                  >
                    Delete 
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No approved raw materials found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: "1px" }}>
        <div className="chart-header">
          <h3 className="stock-overview-title-stock"> Remaining Stock Overview</h3>
        </div>

        <div className="stock-card-container">
          {stockCards.map((card) => (
            <div
              key={card.name}
              className="stock-card"
              style={{ borderColor: card.color }}
            >
              <h4>{card.name}</h4>
              <p>{card.value}</p>
            </div>
          ))}
        </div>
      </div>


      {/* Delete Forever */}
      {selectedItem && (
        <div className="custom-dialog-overlay">
          <div className="custom-dialog-box">
            <h3> Delete Raw Material Permanently</h3>
            <p><strong>Name:</strong> {selectedItem.name}</p>
            <p><strong>Category:</strong> {selectedItem.category}</p>
            <p><strong>Description:</strong> {selectedItem.description}</p>
            <p><strong>Date:</strong> {selectedItem.date}</p>
            <div className="dialog-actions">
              <button className="cancel-btn" onClick={() => setSelectedItem(null)}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={handleDelete}>
                Delete from System
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminRawStockView;
