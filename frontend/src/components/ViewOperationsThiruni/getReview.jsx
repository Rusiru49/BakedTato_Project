import "../addOperationsThiruni/createReview.css";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

const GetReview = () => {

    const navigate = useNavigate();

    const [review, setReview] = useState("");
    const [reviewID, setReviewID] = useState("");

    const [id, setId] = useState("");
    const[name, setName] = useState("");
    const [date, setDate] = useState("");
    const [rating, setRating] = useState("");
    const [reviewText, setReviewText] = useState("");

    const inputChangeHandler = (e) => {
        setReviewID(e.target.value);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8000/api/getOneReview/${reviewID}`);
            console.log("Fetched review data:", response.data);

            setId(response.data._id);
            setName(response.data.name);
            setDate(response.data.date);
            setRating(response.data.rating);
            setReviewText(response.data.review);
            
            setReview(response.data);
            toast.success("Review Fetched Successfully!", { position: "top-right" });
        } catch (error) {
            console.error("Error fetching review:", error);
            toast.error("No Such Review. Please Check the Review ID.", { position: "top-center" });
        }
    };

    const deleteUser = async (reviewId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this Review?");
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:8000/api/deleteReview/${reviewId}`);
                console.log(`Review with ID ${reviewId} deleted successfully.`);
                setReview(null);
                toast.success("Review Deleted Successfully!", {position:'top-right'});
                navigate('/review');
            } catch (error) {
                console.error("Error deleting the review:", error);
            }
        }
    };

    return (
        <div className='createReview'>
            <div className='button-container'>
                <Link to="/review" className='backButton'>
                    <FontAwesomeIcon icon={faHandPointLeft} />
                </Link>
            </div>
            <h3>View your Reviews</h3>
            <p><center>Please note that Once You Update your Reviews Provide the Review ID Again to View The Updated Review.</center></p>
            <form className='createReviewForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="reviewID">Provide your Unique Review ID</label>
                    <input
                        type="text"
                        onChange={inputChangeHandler}
                        id="reviewID"
                        name="reviewID"
                        autoComplete='off'
                        placeholder='Enter your Review ID'
                        required
                    />
                </div>
                <div>
                    <button type='submit' className="button">
                        <center>Get Reviews</center>
                    </button>
                </div>
                </form>
                
                {review && (
                <div className="latestReviewContainer">

                    <caption><u>Review Details</u></caption>
                    <br></br>

                    <div className="reviewDetails">
                        <p>{id}</p>
                        <p>{name}</p>  
                        <p> {date}</p>
                        <p>{rating}</p>
                        <p>{reviewText}</p>
                    </div>

                    <div className="actionButtons">

                        <Link to="/review" className="backButton">
                             <FontAwesomeIcon icon={faHandPointLeft} /> Go Back
                        </Link>

                        <button onClick={() => deleteUser(id)} className="actionButtonsDel">
                             <FontAwesomeIcon icon={faTrash} /> 
                        </button>
                        
                        <Link to={`/editInView/${id}`} className="actionButtonsUp">
                            <FontAwesomeIcon icon={faEdit} />
                        </Link>     
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetReview;
