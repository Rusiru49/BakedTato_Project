import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../addOperationsThiruni/AddRawMaterial.css';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UpdateRemainingStock = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentStock, setCurrentStock] = useState('');
  const [remainingStock, setRemainingStock] = useState(0);
  const [date, setDate] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/getOneStock/${id}`)
      .then(res => {
        const data = res.data;
        setRemainingStock(data.remainingStock || 0);
        setCurrentStock('');
        setDate(null); 
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to fetch stock data");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedStock = Number(currentStock);

    if (isNaN(parsedStock) || parsedStock <= 0) {
      toast.error("Please enter a valid stock amount!");
      return;
    }

    if (!date) {
      toast.error("Please select today's Date");
      return;
    }

    try {
      const updatedStock = remainingStock + parsedStock;

      console.log("Sending:", {
        currentStock: updatedStock,
        date: new Date(date).toLocaleDateString('en-US'),
      });

      await axios.put(`http://localhost:5000/api/updateStock/${id}`, {
        currentStock: updatedStock,
        date: date.toISOString().split('T')[0],
      });

      toast.success("Stock Added Successfully!");
      navigate('/manage-stock');
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Error updating stock");
    }
  };

  
  return (
    <div className="createFormRaw">
      <div className="formContainer">
        <div className='button-container'>
          <Link to="/manage-stock" className='backBtn'>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        </div>

        <h2 className='h2'>Update Stock</h2>

        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="currentStock">Add Current Stock</label>
            <input
              type="number"
              id="currentStock"
              value={currentStock}
              onChange={(e) => setCurrentStock(e.target.value)}
              required
              placeholder="Enter Stock to Add"
            />
            {currentStock && !isNaN(currentStock) && (
              <p style={{ color: '#333', marginTop: '8px' }}>
                New Remaining Stock: <strong>{remainingStock + Number(currentStock)}</strong>
              </p>
            )}
          </div>

          <div className="inputGroup">
            <label htmlFor="date">Date Added</label>
            <DatePicker
              id="date"
              value={date}
              onChange={setDate}
              maxDate={new Date()}
              minDate={new Date()}
              clearIcon={null}
              required
              format="y-MM-dd"
              placeholderText="Select today's date"
            />
          </div>

          <br />

          <button type="submit" className="Submitbutton">Update Stock</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRemainingStock;
