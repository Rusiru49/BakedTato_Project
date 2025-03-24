import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-date-picker';
import toast from 'react-hot-toast';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import "./updateReview.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';

const UpdateRawMaterials = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const rawMaterials = {
        name: '',
        category: '',
        origin: '',
        description: '',
        date: ''
    };

    const [rawMaterial, setRawMaterial] = useState(rawMaterials);
    const [selectedDate, setSelectedDate] = useState(null);
    const [originalDate, setOriginalDate] = useState(null); // Store the original date
    const [isEditable, setIsEditable] = useState(true); // Control form editability
    const [errors, setErrors] = useState({}); // State for validation errors

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;

        if (name === "date") {
            setRawMaterial({
                ...rawMaterial,
                [name]: value,
            });
            return;
        }

        // Validate other fields to contain only letters and spaces
        if (!/^[A-Za-z.\s]+$/.test(value)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: `${name} can only contain letters and spaces.`,
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "", // Clear the error for this field
            }));
        }

        setRawMaterial({
            ...rawMaterial,
            [name]: value,
        });
    };

    useEffect(() => {
        axios.get(`http://localhost:8000/api/getOneRawMaterial/${id}`)
            .then((response) => {
                setRawMaterial(response.data);
                setOriginalDate(new Date(response.data.date)); // Store the original date
                checkEditability(new Date(response.data.date)); // Check if form is editable
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    // Function to check if the form is editable (within 24 hours)
    const checkEditability = (originalDate) => {
        const now = new Date();
        const timeDifference = now - originalDate; // Difference in milliseconds
        const hoursDifference = timeDifference / (1000 * 60 * 60); // Convert to hours

        if (hoursDifference > 24) {
            setIsEditable(false); // Disable form editing
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setRawMaterial({
            ...rawMaterial,
            date: date.toLocaleDateString(),
        });
    };

    const minDate = new Date();
    const maxDate = new Date();

    const submitForm = async (e) => {
        e.preventDefault();

        // Check if editing is allowed
        if (!isEditable) {
            toast.error("Editing is not allowed after 24 hours.", { position: "top-right" });
            return;
        }

        // Check for validation errors
        let isValid = true;
        const newErrors = {};

        for (const field in rawMaterial) {
            if (field !== "date" && !/^[A-Za-z.\s]+$/.test(rawMaterial[field])) {
                newErrors[field] = `${field} can only contain letters and spaces.`;
                isValid = false;
            }
        }
        // Submit the form if everything is valid
        await axios.put(`http://localhost:8000/api/updateRawMaterial/${id}`, rawMaterial)
            .then((response) => {
                toast.success(response.data.msg, { position: "top-right" });
                navigate('/raw-materials/pending');
            })
            .catch(error => console.log(error));
    };

    return (
        <div className='createReview'>
            <div className='container'>
                <div className='button-container'>
                    <Link to="/raw-materials/pending" className='backButton'>
                        <FontAwesomeIcon icon={faHandPointLeft} />
                    </Link>
                </div>

                <h3>Update Raw Material</h3>

                {!isEditable && (
                    <p style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>
                        Editing is not allowed after 24 hours of creation!
                    </p>
                )}

                <form className='createReviewForm' onSubmit={submitForm}>
                    <div className="formGroup">
                        <div className="left-side">
                            <div className="inputGroup">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    value={rawMaterial.name}
                                    onChange={inputChangeHandler}
                                    id="name"
                                    name="name"
                                    autoComplete='off'
                                    placeholder='Enter Raw Material'
                                    required
                                    disabled={!isEditable} // Disable if not editable
                                />
                                {errors.name && <p style={{ color: 'red', fontSize: '12px' }}>{errors.name}</p>}
                            </div>

                            <div className="inputGroup">
                                <label htmlFor="category">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    onChange={inputChangeHandler}
                                    required
                                    value={rawMaterial.category}
                                    disabled={!isEditable} // Disable if not editable
                                >
                                    <option value="" disabled></option>
                                    <option value="Vegetables">Vegetables</option>
                                    <option value="Dairy">Dairy</option>
                                    <option value="Meat">Meat</option>
                                    <option value="Sauces">Sauces</option>
                                    <option value="Spices and Seasonings">Spices and Seasonings</option>
                                    <option value="Toppings">Toppings</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.category && <p style={{ color: 'red', fontSize: '12px' }}>{errors.category}</p>}
                            </div>

                            <div className="inputGroup">
                                <label htmlFor="origin">Origin</label>
                                <select
                                    id="origin"
                                    name="origin"
                                    onChange={inputChangeHandler}
                                    required
                                    value={rawMaterial.origin}
                                    disabled={!isEditable} // Disable if not editable
                                >
                                    <option value="" disabled></option>
                                    <option value="local">Local</option>
                                    <option value="imported">Imported</option>
                                </select>
                                {errors.category && <p style={{ color: 'red', fontSize: '12px' }}>{errors.category}</p>}
                            </div> 
                        </div>
                        <div className="right-side">
                            <div className="inputGroup">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    onChange={inputChangeHandler}
                                    value={rawMaterial.description}
                                    cols='10'
                                    rows='5'
                                    id="description"
                                    name="description"
                                    placeholder="Add Description"
                                    disabled={!isEditable} // Disable if not editable
                                />
                                {errors.description && <p style={{ color: 'red', fontSize: '12px' }}>{errors.description}</p>}
                            </div>

                            <div className="inputGroup">
                                <label htmlFor="date">Date</label>
                                <DatePicker
                                    disabled={!isEditable} // Disable if not editable
                                    onChange={handleDateChange}
                                    value={rawMaterial.date}
                                    selected={selectedDate}
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    format="dd/MM/yyyy"
                                    clearIcon={null}
                                    calendarIcon={null}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button type='submit' className="button" disabled={!isEditable}>
                        Update Raw Material
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateRawMaterials;