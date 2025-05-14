import React, { useEffect, useState } from "react";
import axios from "axios";
import "../ViewOperationsThiruni/RawMaterials.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const ManageStockAdmin = () => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getStock");
        setStock(response.data);
      } catch (error) {
        console.error("Error fetching stock:", error);
      }
    };

    fetchData();
  }, []);

  const deleteStock = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this stock?");

    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/deleteStock/${id}`);
        setStock(stock.filter(item => item._id !== id));
      } catch (error) {
        console.error("Error deleting stock:", error);
      }
    }
  };


  const getCategoryClass = (category) => {
    const base = "stock-card-small";
    const border = `border-category-${category?.toLowerCase().replace(/\s+/g, '-')}`;
    return `${base} ${border}`;
  };

  const handleUsedStock = async (item) => {
    const used = prompt(`Enter used amount for ${item.name} (Current: ${item.currentStock})`);

    if (!used || used.trim() === "") {
      alert("Input cannot be empty.");
      return;
    }

    const usedAmount = parseFloat(used.trim());
    if (isNaN(usedAmount) || usedAmount < 0) {
      alert("Please enter a valid positive number!!");
      return;
    }

    const match = item.currentStock.match(/^(\d+(?:\.\d+)?)([a-zA-Z]*)$/);
    if (!match) {
      alert("Invalid current Stock format!");
      return;
    }

    const currentNumber = parseFloat(match[1]); 
    const unit = match[2];                      

    if (usedAmount > currentNumber) {
      alert("Used amount cannot exceed current stock.");
      return;
    }

    const newNumber = currentNumber - usedAmount;
    const newStock = `${newNumber}${unit}`;

    try {
      await axios.put(`http://localhost:5000/api/update-stock-admin/${item._id}`, {
        currentStock: newStock
      });

      setStock(prev =>
        prev.map(stockItem =>
          stockItem._id === item._id
            ? { ...stockItem, currentStock: newStock }
            : stockItem
        )
      );
    } catch (error) {
      console.error("Error updating stock:", error.response?.data || error.message);
      alert("Failed to update stock.");
    }
  };

  return (
    <div>
      
      <div className="stock-cards-wrapper-admin">
        {stock.length > 0 ? (
          stock.map((item) => (
            <div key={item._id} className={getCategoryClass(item.category)}>
              <div className="card-icons">
                <button className="icon-btn" onClick={() => handleUsedStock(item)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="icon-btn" onClick={() => deleteStock(item._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <h4>{item.name}</h4>
              <p className="stock"><strong>Stock:</strong> {item.currentStock}</p>
              <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p className="no-stock-message">No Stock Added at the Moment</p>
        )}
      </div>
    </div>
  );
};

export default ManageStockAdmin;
