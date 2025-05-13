import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import "./AddRawMaterial.css";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const AddRawMaterial = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [errors, setErrors] = useState({}); 

    const handleDateChange = (date) => {
        setSelectedDate(date);
        inputHandler(date);
    };

    const minDate = new Date();
    const maxDate = new Date();

    const initialRawMaterial = {
        name: '',
        category: '',
        origin: '',
        description: '',
        date: ''
    };
    const [rawMaterial, setRawMaterial] = useState(initialRawMaterial);

    const inputHandler = (e) => {
        if (e instanceof Date) {
            setRawMaterial((prevState) => ({
                ...prevState,
                date: e.toLocaleDateString(),
            }));
        } else {
            const { name, value } = e.target;
            setRawMaterial((prevState) => ({
                ...prevState,
                [name]: value,
            }));

            if (name !== "date") { 
                validateField(name, value);
            }
        }
    };

    //validate a field
    const validateField = (fieldName, value) => {
        if (fieldName === "date") {
            return;
        }
    
        if (!/^[A-Za-z.\s]+$/.test(value)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [fieldName]: `${fieldName} cannot contian numbers or special characters.`,
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

        for (const field in rawMaterial) {
            if (field !== "date" && !/^[A-Za-z.\s]+$/.test(rawMaterial[field])) {
                newErrors[field] = `${field} cannot contian numbers or special characters.`;
                isValid = false;
            }
        }

        if (!isValid) {
            setErrors(newErrors); 
            return; 
        }

        try {
            const response = await axios.post("http://localhost:5000/api/createRawMaterial", rawMaterial);
            toast.success(response.data.msg, { position: "top-right" });
            navigate('/raw-materials/pending');
        } catch (error) {
            console.error("Error submitting form:", error);
            if (error.response) {
                toast.error(error.response.data.msg || "Failed to submit raw material. Please try again.", { position: "top-right" });
            } else if (error.request) {
                toast.error("No response from the server. Please check your connection.", { position: "top-right" });
            } else {
                toast.error("An error occurred. Please try again.", { position: "top-right" });
            }
        }
    };

    return (
        <div className='createFormRaw'>
            <div className='formContainer'>
                <div className='button-container'>
                    <Link to="/supplierHome" className='backBtn'>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                </div>

                <h2 className='h2'>Add a Raw Material</h2> 

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
                                    placeholder='Enter Raw Material'
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
                                <label htmlFor="origin">Origin</label>
                                <select id="origin" name="origin" onChange={inputHandler} required>
                                    <option value="" disabled selected>Select Origin</option>
                                    <option value="local">Local</option>
                                    <option value="imported">Imported</option>
                                    
                                </select>
                                {errors.category && <p style={{ color: "red", fontSize: "14px" }}>{errors.category}</p>}
                            </div>
                        </div>

                        <div className="right-side">
                            <div className="inputGroup">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    onChange={inputHandler}
                                    cols='100'
                                    rows='5'
                                    id="description"
                                    name="description"
                                    placeholder="Add Description"
                                />
                                {errors.description && <p style={{ color: "red", fontSize: "14px" }}>{errors.description}</p>}
                            </div>

                            <div className="inputGroup">
                                <label htmlFor="date">Date</label>
                                <div className="customDatePicker">
                                    <DatePicker
                                        onChange={handleDateChange}
                                        value={selectedDate}
                                        minDate={minDate}
                                        maxDate={maxDate}                                      
                                        clearIcon={null}                                                                           
                                    /> 
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type='submit' className="Submitbutton">Submit Raw Material</button>
                </form>
            </div>
        </div>
    );
};

export default AddRawMaterial;