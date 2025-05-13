import React, { useState } from "react";
import "./Delivery.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Delivery(props) {
    const { _id, name, email, address, number, order } = props.delivery;
    const navigate = useNavigate();

    const [paymentDone, setPaymentDone] = useState(false);

    // Delete Function
    const deleteHandler = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this delivery?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/delivery/${_id}`);
            navigate("/deliverydetails");
        } catch (error) {
            console.error("Error deleting delivery:", error);
            alert("Failed to delete delivery. Please try again.");
        }
    };

    // Confirm Payment Function
    const handlePaymentConfirm = () => {
        setPaymentDone(true);
    };

    return (
        <div className="delivery-container">
            <h2>Delivery Details</h2>
            <p><strong>ID:</strong> {_id}</p>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Address:</strong> {address}</p>
            <p><strong>T.P Number:</strong> {number}</p>
            <p><strong>Order:</strong> {order}</p>
            <p><strong>Payment Method:</strong>Cash on Delivery</p>

            <div className="delivery-actions">
                <Link to={`/deliveryDetails/${_id}`} className="update-link">Update</Link>
                <button className="delete-button" onClick={deleteHandler}>Delete</button>
            </div>

            <div className="payment-section">
                <button 
                    className="payment-button" 
                    onClick={handlePaymentConfirm} 
                    disabled={paymentDone}
                >
                    {paymentDone ? "Payment Completed" : "Confirm Payment"}
                </button>

                {paymentDone && <p className="payment-status">✅ Payment has been successfully completed.</p>}
            </div>
        </div>
    );
}

export default Delivery;
