import React, { useEffect, useState } from "react";
import axios from "axios";
import "../ViewOperationsThiruni/RawMaterials.css";
import { Link } from "react-router-dom";

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

  return (
    <div>
      <div className="add-stock-button-container">
        <Link to="/add-stock">
          <button className="add-stock-button">Add a New Stock</button>
        </Link>
      </div>

      <div className="raw-materials-container">
        <table className="raw-materials-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Unit</th>
              <th>Current Stock</th>
              <th>Current Stock Added On</th>
              <th>Remaining Stock</th>
              <th>Remaining Stock On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stock.length > 0 ? (
              stock.map((item) => (
                <tr key={item.stockID}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.unit}</td>
                  <td>{item.currentStock}</td>
                  <td>{item.date}</td>
                  <td>{item.remainingStock}</td>
                  <td>{item.date}</td>
                  <td>
                    <Link
                      to={`/update-stock/${item._id}`}
                      className="actionButtonsUp"
                    >
                     Add More
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No Stock Added at the Moment</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStock;
