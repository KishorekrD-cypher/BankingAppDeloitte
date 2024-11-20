import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/UserDashboard.css';
import axios from 'axios';

const UserDashboard = () => {
  const [user_name, setUser_name] = useState(''); 
  const [accountBalance, setAccountBalance] = useState(null); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');

    if (email) {
        axios
            .get(`http://localhost:8080/user/dashboard`, { params: { email } })
            .then((response) => {
              console.log(response.data);
                const { user_name, accountBalance } = response.data;
                setUser_name(user_name);
                setAccountBalance(accountBalance);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching account details:", error);
                setError("Unable to fetch account details. Please try again.");
                setLoading(false);
            });
    } else {
        setError("No user email found. Please log in.");
        setLoading(false);
    }
}, [accountBalance]);
  if (loading) {
    return (
      <div className="user-dashboard">
        <div className="container mt-4">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h4>Loading account details...</h4>
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      <div className="container mt-4">
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row">
          <div className="col-lg-6 text-center">
            <div className="square-box">
              <h4>Welcome back, <strong>{user_name || "No name available"}</strong> <br /><span className='desc'>Everything seems ok and up-to-date with
                your account since your last visit. </span></h4>
            </div>
          </div>

          <div className="col-lg-6 text-center">
            <div className="square-box">
              <h4>Account Balance: ${accountBalance !== null ? accountBalance.toFixed(2) : "No balance available"}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
