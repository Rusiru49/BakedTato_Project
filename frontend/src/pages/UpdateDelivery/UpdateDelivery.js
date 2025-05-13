import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

function UpdateDelivery() {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    address: '',
    number: '',
    order: ''
  });
  const [loading, setLoading] = useState(true); // To show loading state
  const [error, setError] = useState(null); // To show error message if any
  const navigate = useNavigate();
  const id = useParams().id;

  // Fetch the existing data for the delivery
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/delivery/${id}`);
        setInputs(response.data.delivery);
      } catch (err) {
        setError('Error fetching delivery data');
      } finally {
        setLoading(false);
      }
    };
    fetchHandler();
  }, [id]);

  // Send the updated data to the server
  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/delivery/${id}`, {
        name: inputs.name,
        email: inputs.email,
        address: inputs.address,
        number: inputs.number,
        order: inputs.order,
      });
    } catch (err) {
      setError('Error updating delivery');
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate('/deliverydetails'));
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading text until data is fetched
  }

  return (
    <div>
      <h1>Update Delivery</h1>
      <form onSubmit={handleSubmit}>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        
        <label>Name</label>
        <br />
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={inputs.name}
          required
        />
        <br /><br />

        <label>Email</label>
        <br />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={inputs.email}
          required
        />
        <br /><br />

        <label>Address</label>
        <br />
        <input
          type="text"
          name="address"
          onChange={handleChange}
          value={inputs.address}
          required
        />
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
        <input
          type="text"
          name="order"
          onChange={handleChange}
          value={inputs.order}
          required
        />
        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UpdateDelivery;
