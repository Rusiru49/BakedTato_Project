import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./AddDelivery.css";
import { useLocation } from "react-router-dom";




function AddDelivery() {
  const navigate = useNavigate();

  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;
  

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    address: '',
    number: '',
    order: 'BakedTato',
    price: totalAmount
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Set price when component mounts or totalAmount changes
  useEffect(() => {
    setInputs(prev => ({ ...prev, price: totalAmount }));
  }, [totalAmount]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await sendRequest();
      setInputs({
        name: '',
        email: '',
        address: '',
        number: '',
        order: 'BakedTato',
        price: totalAmount
      });
      navigate('/all-orders');
    } catch (error) {
      setError("There was an error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/delivery", {
      name: inputs.name,
      email: inputs.email,
      address: inputs.address,
      number: inputs.number,
      order: inputs.order,
      price: inputs.price
    });
  };

  return (
    <div>
      <h1>Add Delivery</h1>
      <h1>YOU CAN PAY AT YOUR DOORSTEP!</h1>
      <form className='form1' onSubmit={handleSubmit}>
        <label>Name</label>
        <br />
        <input type="text" name="name" onChange={handleChange} value={inputs.name} required />
        <br /><br />

        <label>Email</label>
        <br />
        <input type="email" name="email" onChange={handleChange} value={inputs.email} required />
        <br /><br />

        <label>Address</label>
        <br />
        <input type="text" name="address" onChange={handleChange} value={inputs.address} required />
        <br /><br />

        <label>Mobile Number</label>
        <br />
        <input
          type="tel"
          name="number"
          onChange={handleChange}
          value={inputs.number}
          pattern="[0-9]{10}"
          title="Please enter a 10-digit number"
          required
        />
        <br /><br />

        <label>Order</label>
        <br />
        <input type="text" name="order" onChange={handleChange} value={inputs.order} required />
        <br /><br />

        <label>Price RS.</label>
        <br />
        <input type="number" name="price" value={inputs.price} readOnly />
        <br /><br />

        {loading ? (
          <button type="submit" disabled>Submitting...</button>
        ) : (
          <button type="submit">Confirm Order</button>
        )}

        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      </form>
    </div>
  );
}

export default AddDelivery;
