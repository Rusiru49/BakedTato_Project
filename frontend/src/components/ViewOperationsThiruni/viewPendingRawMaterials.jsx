import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RawMaterials.css";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const PendingRawMaterials = () => {
  const [rawMaterials, setRawMaterials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/raw-materials/pending",
        );
        setRawMaterials(response.data);
      } catch (error) {
        console.error("Error fetching raw materials:", error);
      }
    };

    fetchData();
  }, []);

  //this function checks if the time difference is less than 24 hrs and returns true if time < 24
  const isDeletionAllowed = (dateCreated) => {
    const now = new Date();
    const creationTime = new Date(dateCreated);
    const timeDifference = now - creationTime;
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    return hoursDifference < 24;
  };

  const handleDelete = async (id, dateCreated) => {
    //if false this is skipped and if true toast error is displayed
    if (!isDeletionAllowed(dateCreated)) {
      toast.error("Deletion is only allowed within 24 hours of creation.", {
        position: "top-right",
      });
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this raw material?",
    );
    if (confirmDelete) {
      try {
        const deleteResponse = await axios.delete(
          `http://localhost:5000/api/deleteRawMaterial/${id}`,
        );
        toast.success(deleteResponse.data.msg, { position: "top-right" });

        const response = await axios.get(
          "http://localhost:5000/api/raw-materials/pending",
        );
        setRawMaterials(response.data);

        navigate("/raw-materials/pending");
      } catch (error) {
        console.error("Error deleting raw material:", error);
        toast.error("Error deleting raw material", { position: "top-right" });
      }
    }
  };

  return (
    <div className="raw-materials-container">
      <h3 className="h3">Pending Approvals - Raw Materials</h3>
      <table className="raw-materials-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Origin</th>
            <th>Description</th>
            <th>Date Added</th>
            <th>Status</th>
            <th>Actions</th>
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
                    onClick={() => handleDelete(material._id, material.date)}
                    className="actionButtonsDel"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>

                  <Link
                    to={`/updateRawMaterials/${material._id}`}
                    className="actionButtonsUp"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No Pending Raw Material Approvals Found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PendingRawMaterials;
