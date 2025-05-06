import React from 'react';
import '../ViewOperationsThiruni/RawMaterials.css';

const HistoryTable = ({ history }) => {
  return (
    <div className="raw-materials-container-sup">
      <table className="raw-materials-table-sup">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Unit</th>
            <th>Current Stock</th>
            <th>Current Stock Added On</th>
            <th>Remaining Stock</th>
            <th>Remaining Stock On</th>
          </tr>
        </thead>
        <tbody>
          {history.length === 0 ? (
            <tr>
              <td colSpan="7">No History Found for this Stock Item.</td>
            </tr>
          ) : (
            history.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.unit}</td>
                <td>{item.currentStock}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.remainingStock}</td>
                <td>{new Date(item.remainingStockDate).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
