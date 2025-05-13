import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import '../addOperationsThiruni/AddRawMaterial.css';

const UpdateRemainingStock = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [stockData, setStockData] = useState({
    name: '',
    category: '',
    currentStock: 0,
    date: new Date()
  });

  const [newStock, setNewStock] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/getOneStock/${id}`)
      .then(res => {
        const data = res.data;
        setStockData({
          name: data.name || '',
          category: data.category || '',
          currentStock: data.currentStock || 0,
          date: new Date()
        });
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to fetch stock data");
      });
  }, [id]);

  const validateField = (field, value) => {
    let errorMsg = '';

    if (field === 'newStock' && !/^\d+(g|kg|ml|l|bottle|bottles)$/.test(value)) {
      errorMsg = 'Enter valid stock (e.g., 100g, 2kg, 500ml, 1bottle)';
    }

    setErrors(prev => ({ ...prev, [field]: errorMsg }));
  };

  const handleNewStockChange = (e) => {
    setNewStock(e.target.value);
    validateField('newStock', e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regex = /^(\d+)(g|kg|ml|l|bottle|bottles)$/;

    const currentMatch = stockData.currentStock.match(regex);
    const newMatch = newStock.match(regex);

    if (!currentMatch || !newMatch) {
      toast.error("Stock must be in valid format (e.g., 100g, 2kg)");
      return;
    }

    const currentAmount = parseInt(currentMatch[1]);
    const currentUnit = currentMatch[2];

    const newAmount = parseInt(newMatch[1]);
    const newUnit = newMatch[2];

    if (currentUnit !== newUnit) {
      toast.error("Unit mismatch! Both stocks must use the same unit.");
      return;
    }

    const updatedAmount = currentAmount + newAmount;
    const updatedStock = `${updatedAmount}${currentUnit}`;

    try {
      await axios.put(`http://localhost:5000/api/updateStock/${id}`, {
        currentStock: updatedStock,
        date: selectedDate.toISOString()
      });

      toast.success("Stock updated successfully!");
      navigate("/manage-stock");
    } catch (err) {
      console.error(err);
      toast.error("Error updating stock");
    }
  };

  return (
    <div className="createFormRaw">
      <div className="formContainer">
        <div className="button-container">
          <Link to="/manage-stock" className="backBtn">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        </div>

        <h2 className="h2">Update your Stock</h2>

        <form className="createReviewForm" onSubmit={handleSubmit}>
          <div className="formGroup">
            <div className="left-side">
              <div className="inputGroup">
                <label>Name</label>
                <input type="text" value={stockData.name} disabled />
              </div>

              <div className="inputGroup">
                <label>Category</label>
                <input type="text" value={stockData.category} disabled />
              </div>
            </div>

            <div className="right-side">
              <div className="inputGroup">
                <label htmlFor="currentStock">Add More Stock</label>
                <input
                  type="text"
                  name="newStock"
                  value={newStock}
                  onChange={handleNewStockChange}
                  placeholder="e.g., 100g, 1bottle, 500ml"
                  required
                />
                {errors.newStock && (
                  <p style={{ color: 'red' }}>{errors.newStock}</p>
                )}
              </div>

              <div className="inputGroup">
                <label>Date</label>
                <DatePicker
                  onChange={handleDateChange}
                  value={selectedDate}
                  clearIcon={null}
                  maxDate={new Date()}
                  minDate={new Date()}
                  format="y-MM-dd"
                />
              </div>
            </div>
          </div>

          <button type="submit" className="Submitbutton">
            Update Stock
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRemainingStock;
