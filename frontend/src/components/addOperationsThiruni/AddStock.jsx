import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import "./AddRawMaterial.css";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

const AddStock = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [errors, setErrors] = useState({});

    const handleDateChange = (date) => {
        setSelectedDate(date);
        inputHandler(date);
    };

    const minDate = new Date();
    const maxDate = new Date();

    const initialStock = {
        name: '',
        category: '',
        unit: '', 
        currentStock: '',
        date: ''
    };
    const [stock, setStock] = useState(initialStock);

    const inputHandler = (e) => {
        if (e instanceof Date) {
            setStock((prevState) => ({
                ...prevState,
                date: e.toLocaleDateString(),
            }));
        } else {
            const { name, value } = e.target;
            setStock((prevState) => ({
                ...prevState,
                [name]: value,
            }));

            if (name !== "date" && name !== "currentStock" && name !== "unit") {
                validateField(name, value);
            }
        }
    };

    // Validate a field
    const validateField = (fieldName, value) => {
        if (fieldName === "date" || fieldName === "currentStock" || fieldName === "unit") {
            return;
        }

        if (!/^[A-Za-z.\s]+$/.test(value)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [fieldName]: `${fieldName} cannot contain numbers or special characters.`,
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [fieldName]: "",
            }));
        }
    };

    const submitForm = async (e) => {
        e.preventDefault();

        let isValid = true;
        const newErrors = {};

        for (const field in stock) {
            if (field !== "date" && field !== "currentStock" && field !== "unit" && !/^[A-Za-z.\s]+$/.test(stock[field])) {
                newErrors[field] = `${field} cannot contain numbers or special characters.`;
                isValid = false;
            }
        }

        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/addStock", stock);
            toast.success("Stock Added Successfully!", { position: "top-right" });
            navigate('/manage-stock');
        } catch (error) {
            console.error("Error submitting form:", error);
            if (error.response) {
                toast.error(error.response.data.msg || "Failed to add Stock. Please try again.", { position: "top-right" });
            } else if (error.request) {
                toast.error("No response from the server. Please check your connection.", { position: "top-right" });
            } else {
                toast.error("An error occurred. Please try again.", { position: "top-right" });
            }
        }
    };

    return (
        <div className='createReview'>
            <div className='container'>
                <div className='button-container'>
                    <Link to="/manage-stock" className='backButton'>
                        <FontAwesomeIcon icon={faHandPointLeft} />
                    </Link>
                </div>

                <h3>Add Stock</h3>

                <form className='createReviewForm' onSubmit={submitForm}>
                    <div className="formGroup">
                        <div className="left-side">
                            <div className="inputGroup">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    onChange={inputHandler}
                                    id="name"
                                    name="name"
                                    autoComplete='off'
                                    placeholder='Enter Name of Raw Material'
                                    required
                                />
                                {errors.name && <p style={{ color: "red", fontSize: "14px" }}>{errors.name}</p>}
                            </div>

                            <div className="inputGroup">
                                <label htmlFor="category">Category</label>
                                <select id="category" name="category" onChange={inputHandler} required>
                                    <option value="" disabled selected>Select Category</option>
                                    <option value="Vegetables">Vegetables</option>
                                    <option value="Dairy">Dairy</option>
                                    <option value="Meat">Meat</option>
                                    <option value="Sauces">Sauces</option>
                                    <option value="Spices and Seasonings">Spices and Seasonings</option>
                                    <option value="Toppings">Toppings</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.category && <p style={{ color: "red", fontSize: "14px" }}>{errors.category}</p>}
                            </div>

                            <div className="inputGroup">
                                <label htmlFor="unit">Unit</label>
                                <select id="unit" name="unit" onChange={inputHandler} required>
                                    <option value="" disabled selected> Select Unit</option>
                                    <option value="kg">kg</option>
                                    <option value="g">g</option>
                                    <option value="bottles">bottles</option>
                                    <option value="litres">litres</option>
                                </select>
                                {errors.unit && <p style={{ color: "red", fontSize: "14px" }}>{errors.unit}</p>}
                            </div>
                        </div>

                        <div className="right-side">
                            <div className="inputGroup">
                                <label htmlFor="currentStock">Current Stock</label>
                                <input
                                    type="text"
                                    onChange={inputHandler}
                                    id="currentStock"
                                    name="currentStock"
                                    autoComplete='off'
                                    placeholder='Enter Current Stock'
                                    required
                                />
                                {errors.currentStock && <p style={{ color: "red", fontSize: "14px" }}>{errors.currentStock}</p>}
                            </div>

                            <div className="inputGroup">
                                <label htmlFor="date">Date</label>
                                <DatePicker
                                    onChange={handleDateChange}
                                    value={selectedDate}
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    format="dd/MM/yyyy"
                                    clearIcon={null}
                                    calendarIcon={null}
                                    required
                                />
                                {errors.date && <p style={{ color: "red", fontSize: "14px" }}>{errors.date}</p>}
                            </div>
                        </div>
                    </div>

                    <button type='submit' className="button">Add Stock</button>
                </form>
            </div>
        </div>
    );
};

export default AddStock;