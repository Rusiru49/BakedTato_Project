import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RawMaterials.css";

const ApprovedRawMaterials = () => {
  const [rawMaterials, setRawMaterials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/raw-materials/approved");
        setRawMaterials(response.data); 
      } catch (error) {
        console.error("Error fetching raw materials:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="raw-materials-container">
      <table className="raw-materials-table">
        <thead>
          <tr>
            <th colSpan="6" className="table-heading">Available Raw Materials</th>
          </tr>
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
    </div>
  );
};

export default ApprovedRawMaterials;
