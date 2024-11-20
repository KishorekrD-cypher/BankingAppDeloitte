import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';  

function Navbar() {
    return (
        <nav className="navbar">
            <h2 className="navbar-logo">Vauecorp</h2>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/user/login">Sign in</Link></li>
                <li><Link to="/admin/login">Admin Login</Link></li> 
            </ul>
        </nav>
    );
}

export default Navbar;
