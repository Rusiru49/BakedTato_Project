import React, { useEffect, useState } from "react";
import axios from "axios";
import "./rawMaterial_Stock.css";
import { faArrowLeft, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; 

const ManageStockAdmin = () => {
  const [stock, setStock] = useState([]);
  const navigate = useNavigate();

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

  const isDeletionAllowed = (dateCreated) => {
    const now = new Date();
    const creationTime = new Date(dateCreated);
    const timeDifference = now - creationTime;
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    return hoursDifference < 24;
  };

  const handleDelete = async (id, dateCreated) => {
    if (!isDeletionAllowed(dateCreated)) {
      toast.error("Deletion is only allowed within 24 hours of creation.", {
        position: "top-right",
      });
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this stock item?"
    );
    if (confirmDelete) {
      try {
        const deleteResponse = await axios.delete(
          `http://localhost:5000/api/deleteStock/${id}`
        );
        toast.success(deleteResponse.data.msg, { position: "top-right" });

        const response = await axios.get("http://localhost:5000/api/getStock");
        setStock(response.data);

        navigate("/manage-stock"); 
      } catch (error) {
        console.error("Error deleting stock:", error);
        toast.error("Error deleting stock", { position: "top-right" });
      }
    }
  };

  return (
    <div>
      <div className="raw-materials-container">
        <div className="button-container">
            <Link to="/rawmaterial-stock-view-admin" className="backBtn">
                <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
        </div>
        <table className="raw-materials-table-admin">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Unit</th>
              <th>Current Stock</th>
              <th>Date</th>
              <th>Remaining Stock</th>
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
                  <td>
                    <button
                      onClick={() => handleDelete(item._id, item.date)}
                      className="actionButtonsDel"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>

                    <Link
                      to={`/update-stock/${item._id}`}
                      className="actionButtonsUp"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No Stock Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStockAdmin;
