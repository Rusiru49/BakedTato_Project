import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../ViewOperationsThiruni/RawMaterials.css';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ManageStock = () => {
  const [stock, setStock] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getStock');
        setStock(response.data);
      } catch (error) {
        console.error('Error fetching stock:', error);
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
      toast.error('Deletion is only allowed within 24 hours of creation.', { position: 'top-right' });
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this stock item?');
    if (confirmDelete) {
      try {
        const deleteResponse = await axios.delete(`http://localhost:5000/api/deleteStock/${id}`);
        toast.success(deleteResponse.data.msg, { position: 'top-right' });

        // Refresh the stock list after deletion
        const response = await axios.get('http://localhost:5000/api/getStock');
        setStock(response.data);
      } catch (error) {
        console.error('Error deleting stock:', error);
        toast.error('Error deleting stock', { position: 'top-right' });
      }
    }
  };

  return (
    <div>
      <div className="add-stock-button-container">
        <Link to="/add-stock">
          <button className="add-stock-button">Add Stock</button>
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
              <th>Date</th>
              <th>Remaining Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stock.length > 0 ? (
              stock.map((stock) => (
                <tr key={stock.stockID}>
                  <td>{stock.name}</td>
                  <td>{stock.category}</td>
                  <td>{stock.unit}</td>
                  <td>{stock.currentStock}</td>
                  <td>{stock.date}</td>
                  <td>{stock.remainingStock}</td>
                  <td>
                    <button onClick={() => handleDelete(stock._id, stock.date)} className="actionButtonsDel">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>

                    <Link to={`/updateStock/${stock._id}`} className="actionButtonsUp">
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

export default ManageStock;