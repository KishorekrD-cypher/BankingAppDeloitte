import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../assets/AuthContext'; 
import '../Styles/AdminNavbar.css'; 

const UserNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth(); 

  const email = localStorage.getItem('userEmail'); 

  const isUserDashboard = location.pathname === '/user/dashboard';
  const isAccountDetails = location.pathname === '/user/account-details';
  const isPayments = location.pathname === '/user/payments';
  const isTransactions = location.pathname === '/user/transactions/history'; 

  const handleSignOut = () => {
    signOut(); 
    navigate('/'); 
  };

  return (
    <div className="navbar">
      <div className="logo">Vauecorp</div>
      <ul className="navLinks">
        {isUserDashboard ? (
          <>
            <li>
              <button
                className="navLink"
                onClick={() => navigate('/user/account-details')}
              >
                Account Details
              </button>
            </li>
            <li>
              <button
                className="navLink"
                onClick={() => navigate('/user/payments')}
              >
                Payments
              </button>
            </li>
            <li>
              <button
                className="navLink"
                onClick={() => navigate(`/user/transactions/history?email=${email}`)}
              >
                Transactions
              </button>
            </li>
            <li>
              <button className="signOutButton" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          </>
        ) : isAccountDetails || isPayments || isTransactions ? (
          <>
            <li>
              <button
                className="navLink"
                onClick={() => navigate('/user/dashboard')}
              >
                Back to Dashboard
              </button>
            </li>
            <li>
              <button className="signOutButton" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          </>
        ) : null}
      </ul>
    </div>
  );
};

export default UserNavbar;
