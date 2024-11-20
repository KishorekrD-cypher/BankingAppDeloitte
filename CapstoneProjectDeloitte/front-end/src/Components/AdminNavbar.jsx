import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../Styles/AdminNavbar.css'; 

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminDashboard = location.pathname === '/admin/dashboard';
  const isUserManagement = location.pathname === '/admin/user-management';

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate('/'); 
  };

  return (
    <div className="navbar">
      <div className="logo">Vauecorp</div>
      <ul className="navLinks">
        {isAdminDashboard ? (
          <>
            <li>
              <Link to="/admin/user-management" className="navLink">
                Approved Users
              </Link>
            </li>
            <li>
              <button className="signOutButton" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          </>
        ) : isUserManagement ? (
          <>
            <li>
              <button
                className="navLink"
                onClick={() => navigate('/admin/dashboard')}
              >
                Pending Users
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

export default AdminNavbar;
