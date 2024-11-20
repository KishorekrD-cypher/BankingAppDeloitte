import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../Styles/UpdateAccount.css";
const UpdateAccount = () => {
  const [userDetails, setUserDetails] = useState({
    user_name: '',
    userEmail: '',
    phone_number: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log("abc");
    const email = localStorage.getItem('userEmail'); 
    console.log(email);
    if (email) {
      axios
        .get(`http://localhost:8080/user/account-details`, { params: { email } })
        .then((response) => {
          setUserDetails(response.data); 
        })
        .catch((err) => {
          console.error('Error fetching user details:', err);
          setError('Unable to fetch account details. Please try again.');
        });
    } else {
      setError('No user email found. Please log in.');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    
    const { user_name, email, phone_number } = userDetails;
    axios
      .put(`http://localhost:8080/user/update`, { user_name, email, phone_number })
      .then((response) => {
        alert('Account updated successfully!');
        navigate('/user/account-details'); 
      })
      .catch((err) => {
        console.error('Error updating account:', err);
        setError('Failed to update account details. Please try again.');
      });
  };

  return (
    <div className="update-account-container mb-10">
      {error && <div className="error">{error}</div>}
      <h2>Update Account Details</h2>
      <form className="update-form">
        <div className="form-field">
          <label>Name:</label>
          <input
            type="text"
            name="user_name"
            value={userDetails.user_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="form-field">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone_number"
            value={userDetails.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <button type="button" onClick={handleUpdate} className="confirm-button">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default UpdateAccount;
