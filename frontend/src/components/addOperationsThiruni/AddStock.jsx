import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import axios from 'axios';
import "./AddRawMaterial.css";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AddStock = () => {
    const [stock, setStock] = useState({
        name: '',
        category: '',
        currentStock: '',
        date: new Date(),
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const categories = ['Vegetables','Dairy', 'Meat','Toppings and Seasonings'];

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setStock((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setStock((prev) => ({ ...prev, date }));
        validateField('date', date);
    };

    const validateField = (field, value) => {
        let errorMsg = '';

        if (field === 'name' && !/^[A-Za-z\s.]+$/.test(value)) {
            errorMsg = 'Name should contain only letters and spaces.';
        } else if (field === 'category' && !value) {
            errorMsg = 'Category is required.';
        } else if (
            field === 'currentStock' &&
            !/^\d+(g|kg|ml|l|bottle|bottles)$/.test(value)
        ) {
            errorMsg =
                'Enter valid stock (e.g., 100g, 2kg, 500ml, 1bottle, 5l)';
        } else if (field === 'date' && !value) {
            errorMsg = 'Date is required.';
        }

        setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    };

    const submitForm = async (e) => {
        e.preventDefault();

        // Run final validations
        let isValid = true;
        const newErrors = {};

        Object.entries(stock).forEach(([field, value]) => {
            validateField(field, value);
            if (
                (field === 'name' && !/^[A-Za-z\s.]+$/.test(value)) ||
                (field === 'category' && !value) ||
                (field === 'currentStock' &&
                    !/^\d+(g|kg|ml|l|bottle|bottles)$/.test(value)) ||
                (field === 'date' && !value)
            ) {
                isValid = false;
            }
        });

        if (!isValid) {
            alert('Please fix validation errors.');
            return;
        }

        try {
            await axios.post(`http://localhost:5000/api/addStock`, stock);
            setStock({
                name: '',
                category: '',
                currentStock: '',
                date: new Date(),
            });
            setSelectedDate(new Date());
            navigate("/manage-stock");
        } catch (err) {
            console.error(err);
            alert('Error Adding stock. Retry');
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

            <h2 className="h2">Add a new Stock</h2>

            <form className="createReviewForm" onSubmit={submitForm}>
                <div className="formGroup">
                    <div className="left-side">
                        <div className="inputGroup">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={stock.name}
                                onChange={inputHandler}
                                placeholder="Enter raw material name"
                                required
                            />
                            {errors.name && (
                                <p style={{ color: 'red' }}>{errors.name}</p>
                            )}
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="category">Category</label>
                            <select
                                name="category"
                                value={stock.category}
                                onChange={inputHandler}
                                required
                            >
                                <option value="">-- Select Category --</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p style={{ color: 'red' }}>
                                    {errors.category}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="right-side">
                        <div className="inputGroup">
                            <label htmlFor="currentStock">Current Stock</label>
                            <input
                                type="text"
                                name="currentStock"
                                value={stock.currentStock}
                                onChange={inputHandler}
                                placeholder="e.g., 100g, 2kg, 500ml, 1bottle"
                                required
                            />
                            {errors.currentStock && (
                                <p style={{ color: 'red' }}>
                                    {errors.currentStock}
                                </p>
                            )}
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="date">Date</label>
                            <DatePicker
                                onChange={handleDateChange}
                                value={selectedDate}
                                clearIcon={null}
                                format="y-MM-dd"
                            />
                            {errors.date && (
                                <p style={{ color: 'red' }}>{errors.date}</p>
                            )}
                        </div>
                    </div>
                </div>

                <button type="submit" className="Submitbutton">
                    Add Stock
                </button>
            </form>
        </div>
    </div>
);

};

export default AddStock;
