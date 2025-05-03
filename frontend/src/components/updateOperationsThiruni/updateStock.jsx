import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import "./update.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateStock = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [stock, setStock] = useState({
        name: '',
        category: '',
        unit: '',
        currentStock: '',
        date: ''
    });

    const [selectedDate, setSelectedDate] = useState(null);
    const [originalDate, setOriginalDate] = useState(null);
    const [isEditable, setIsEditable] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:5000/api/getOneStock/${id}`)
            .then((res) => {
                setStock(res.data);
                const stockDate = new Date(res.data.date);
                setOriginalDate(stockDate);
                setSelectedDate(stockDate);
                checkEditability(stockDate);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const checkEditability = (originalDate) => {
        const now = new Date();
        const diff = now - originalDate;
        const hours = diff / (1000 * 60 * 60);
        setIsEditable(hours <= 24);
    };

    const inputHandler = (e) => {
        const { name, value } = e.target;

        if (["name", "category", "unit"].includes(name) && !/^[A-Za-z.\s]+$/.test(value)) {
            setErrors(prev => ({ ...prev, [name]: `${name} can only contain letters and spaces.` }));
        } else if (name === "currentStock" && !/^\d*$/.test(value)) {
            setErrors(prev => ({ ...prev, currentStock: "Current stock must contain only numbers." }));
        } else {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }

        setStock(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setStock(prev => ({ ...prev, date: date.toLocaleDateString() }));
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (!isEditable) {
            toast.error("Editing is not allowed after 24 hours.");
            return;
        }

        let isValid = true;
        const newErrors = {};

        for (const field in stock) {
            const value = stock[field];
            if (["name", "category", "unit"].includes(field) && !/^[A-Za-z.\s]+$/.test(value)) {
                newErrors[field] = `${field} can only contain letters and spaces.`;
                isValid = false;
            }
            if (field === "currentStock" && !/^\d+$/.test(value)) {
                newErrors[field] = "Current stock must contain only numbers.";
                isValid = false;
            }
        }

        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        try {
            await axios.put(`http://localhost:5000/api/updateStock/${id}`, stock);
            toast.success("Stock updated Successfully!");
            navigate('/manage-stock');
        } catch (error) {
            toast.error("Error updating stock.");
        }
    };

    return (
        <div className='createFormRaw'>
            <div className='formContainer'>
                <div className='button-container'>
                    <Link to="/manage-stock" className='backBtn'>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                </div>

                <h3 className='h3'> Update Stock</h3>

                {!isEditable && (
                    <p style={{ color: 'red', textAlign: 'center' }}>
                        Editing not allowed after 24 hours of creation!
                    </p>
                )}

                <form className='createReviewForm' onSubmit={submitForm}>
                    <div className="formGroup">
                        <div className="left-side">
                            <div className="inputGroup">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={stock.name}
                                    onChange={inputHandler}
                                    disabled={!isEditable}
                                    required
                                />
                                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                            </div>

                            <div className="inputGroup">
                                <label htmlFor="category">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={stock.category}
                                    onChange={inputHandler}
                                    disabled={!isEditable}
                                    required
                                >
                                    <option value="" disabled>Select Category</option>
                                    <option value="Vegetables">Vegetables</option>
                                    <option value="Dairy">Dairy</option>
                                    <option value="Meat">Meat</option>
                                    <option value="Sauces">Sauces</option>
                                    <option value="Spices and Seasonings">Spices and Seasonings</option>
                                    <option value="Toppings">Toppings</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.category && <p style={{ color: "red" }}>{errors.category}</p>}
                            </div>

                            <div className="inputGroup">
                                <label htmlFor="unit">Unit</label>
                                <select
                                    id="unit"
                                    name="unit"
                                    value={stock.unit}
                                    onChange={inputHandler}
                                    disabled={!isEditable}
                                    required
                                >
                                    <option value="" disabled>Select Unit</option>
                                    <option value="kg">kg</option>
                                    <option value="g">g</option>
                                    <option value="bottles">bottles</option>
                                    <option value="litres">litres</option>
                                </select>
                                {errors.unit && <p style={{ color: "red" }}>{errors.unit}</p>}
                            </div>
                        </div>

                        <div className="right-side">
                            <div className="inputGroup">
                                <label htmlFor="currentStock">Current Stock</label>
                                <input
                                    type="text"
                                    id="currentStock"
                                    name="currentStock"
                                    value={stock.currentStock}
                                    onChange={inputHandler}
                                    disabled={!isEditable}
                                    required
                                />
                                {errors.currentStock && <p style={{ color: "red" }}>{errors.currentStock}</p>}
                            </div>

                            <div className="inputGroup">
                                <label htmlFor="date">Date</label>
                                <DatePicker
                                    onChange={handleDateChange}
                                    value={selectedDate}
                                    disabled={!isEditable}
                                    minDate={new Date()}
                                    maxDate={new Date()}
                                    format="dd/MM/yyyy"
                                    clearIcon={null}
                                    calendarIcon={null}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button type='submit' className="Submitbutton" disabled={!isEditable}>
                        Update Stock
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateStock;
