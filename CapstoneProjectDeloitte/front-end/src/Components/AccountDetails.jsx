import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/AccountDetails.css'; 

const AccountDetails = () => {
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
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

  const handleUpdate = () => {
    navigate('/user/update-account'); 
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      axios
        .delete(`http://localhost:8080/user/delete`, { params: { email: userDetails.email } })
        .then(() => {
          alert('Account deleted successfully.');
          localStorage.clear();
          navigate('/'); 
        })
        .catch((err) => {
          console.error('Error deleting account:', err);
          alert('Failed to delete account. Please try again.');
        });
    }
  };

  return (
    <div className="account-details-container">
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="account-card">
          <h2>Account Details</h2>
          <p><strong>Name:</strong> {userDetails.user_name || 'N/A'}</p>
          <p><strong>Email:</strong> {userDetails.email || 'N/A'}</p>
          <p><strong>Phone Number:</strong> {userDetails.phone_number || 'N/A'}</p>
          <p><strong>Gender:</strong> {userDetails.gender || 'N/A'}</p>
          <p><strong>Account Number:</strong> {userDetails.accountNumber || 'N/A'}</p>
          <p><strong>Account Balance:</strong> ${userDetails.accountBalance || 'N/A'}</p>
          <div className="button-group">
            <button className="update-button" onClick={handleUpdate}>Update Account</button>
            <button className="delete-button" onClick={handleDelete}>Delete Account</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDetails;
