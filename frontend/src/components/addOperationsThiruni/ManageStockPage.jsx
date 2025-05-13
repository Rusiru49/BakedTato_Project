import React, { useEffect, useState } from "react";
import axios from "axios";
import "../ViewOperationsThiruni/RawMaterials.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const ManageStock = () => {
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

  return (
    <div>
      <div className="add-stock-button-container">
        <Link to="/add-stock">
          <button className="add-stock-button">Add a New Stock</button>
        </Link>
      </div>
      <br></br>
      <div className="stock-cards-wrapper">
        {stock.length > 0 ? (
          stock.map((item) => (
            <div key={item._id} className={getCategoryClass(item.category)}>
              <div className="card-icons">
                <Link to={`/update-stock/${item._id}`}>
                  <button className="icon-btn">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </Link>
                <button className="icon-btn" onClick={() => deleteStock(item._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <h4>{item.name}</h4>
              <p><strong>Stock:</strong> {item.currentStock}</p>
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

export default ManageStock;
