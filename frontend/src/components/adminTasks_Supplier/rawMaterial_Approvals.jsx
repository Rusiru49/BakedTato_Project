import React, { useEffect, useState } from "react";
import axios from "axios";
import "./rawMaterial_Stock.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const RawMaterialsApprovals = () => {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState("");
  const [approvalDate, setApprovalDate] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/raw-materials/pending"
      );
      setRawMaterials(response.data);
    } catch (error) {
      console.error("Error fetching raw materials:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      const deleteResponse = await axios.delete(
        `http://localhost:5000/api/deleteRawMaterial/${selectedItem._id}`
      );
      toast.success(deleteResponse.data.msg, { position: "top-right" });
      setSelectedItem(null);
      fetchData();
    } catch (error) {
      console.error("Error deleting raw material:", error);
      toast.error("Error deleting raw material", { position: "top-right" });
    }
  };

  const handleApprove = async () => {
    if (!selectedApproval || approvalStatus === "") {
      toast.error("Please provide your Approval!");
      return;
    }

    try {
      const updateResponse = await axios.put(
        `http://localhost:5000/api/updateRawMaterial/${selectedApproval._id}`,
        {
          status: approvalStatus,
          date: approvalDate,
          hidden: false,
        }
      );
      toast.success(updateResponse.data.msg || "Material Approved!", {
        position: "top-right",
      });
      setSelectedApproval(null);
      setApprovalStatus("");
      setApprovalDate("");
      fetchData();
    } catch (error) {
      console.error("Error approving raw material:", error);
      toast.error("Error approving raw material", { position: "top-right" });
    }
  };

  return (
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
                    onClick={() => setSelectedItem(material)}
                    className="actionButtonsDel"
                  >
                    Reject
                  </button>
                  <button
                    className="actionButtonsUp"
                    onClick={() => {
                      setSelectedApproval(material);
                      setApprovalStatus(material.status || "");
                      setApprovalDate(material.date || "");
                    }}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No Raw material Pending Approvals at the Moment</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Reject Dialog */}
      {selectedItem && (
        <div className="custom-dialog-overlay">
          <div className="custom-dialog-box">
            <h3>Confirm Rejection</h3>
            <p><strong>Name:</strong> {selectedItem.name}</p>
            <p><strong>Category:</strong> {selectedItem.category}</p>
            <p><strong>Description:</strong> {selectedItem.description}</p>
            <p><strong>Date:</strong> {selectedItem.date}</p>
            <div className="dialog-actions">
              <button className="cancel-btn" onClick={() => setSelectedItem(null)}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={handleDelete}>
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approve Dialog */}
      {selectedApproval && (
        <div className="custom-dialog-overlay">
          <div className="custom-dialog-box">
            <h3>Approve Raw Material</h3>
            <p><strong>Name:</strong> {selectedApproval.name}</p>
            <p><strong>Category:</strong> {selectedApproval.category}</p>
            <p><strong>Description:</strong> {selectedApproval.description}</p>

            <div className="form-group">
              <label htmlFor="statusDropdown"><strong>Status:</strong></label>
              <select
                id="statusDropdown"
                value={approvalStatus}
                onChange={(e) => setApprovalStatus(e.target.value)}
              >
                <option value="">Provide Approval</option>
                <option value="Approved">Approved</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="datePicker"><strong>Date:</strong></label>
              <input
                type="date"
                id="datePicker"
                value={approvalDate}
                onChange={(e) => setApprovalDate(e.target.value)}
              />
            </div>

            <div className="dialog-actions">
              <button className="cancel-btn" onClick={() => setSelectedApproval(null)}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={handleApprove}>
                Confirm Approval
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RawMaterialsApprovals;
