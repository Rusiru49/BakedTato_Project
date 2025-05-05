import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateRemainingStock = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentStock, setCurrentStock] = useState('');
  const [dateRemaining, setDateRemaining] = useState(new Date());

  useEffect(() => {
    axios.get(`http://localhost:5000/api/getOneStock/${id}`)
      .then(res => {
        const data = res.data;
        setCurrentStock(data.currentStock);

        // Ensure valid date
        const parsedDate = new Date(data.dateRemaining);
        if (!isNaN(parsedDate)) {
          setDateRemaining(parsedDate);
        } else {
          setDateRemaining(new Date());
        }
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to fetch stock data");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/updateStock/${id}`, {
        currentStock,
        dateRemaining: dateRemaining.toISOString().split('T')[0],
      });
      toast.success("Remaining stock updated successfully");
      navigate('/manage-stock');
    } catch (error) {
      toast.error("Error updating stock");
    }
  };

  return (
    <div className="createFormRaw">
      <div className="formContainer">
        <h3>Update Stock</h3>
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="currentStock">Current Stock</label>
            <input
              type="number"
              id="currentStock"
              value={currentStock}
              onChange={(e) => setCurrentStock(e.target.value)}
              required
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="dateRemaining">Date Remaining</label>
            <DatePicker
              id="dateRemaining"
              value={dateRemaining}
              onChange={setDateRemaining}
              format="dd/MM/yyyy"
              maxDate={new Date()}
              clearIcon={null}
              calendarIcon={null}
              required
            />
          </div>

          <button type="submit" className="Submitbutton">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRemainingStock;
