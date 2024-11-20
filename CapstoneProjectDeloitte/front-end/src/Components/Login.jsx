import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Login.css';
import banklogo from '../assets/banklogo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:8080/user/login', {
        email: email,
        password: password,
      });

      console.log(response.data);

      if (response.data.message === 'Email not exists') {
        setErrorMessage('Email does not exist.');
      } else if (response.data.message === 'Login Success') {
        setSuccessMessage('Login successful!');

        // Store email in localStorage
        localStorage.setItem('userEmail', email);

        // Redirect to user dashboard
        navigate('/user/dashboard');
      } else {
        setErrorMessage('Unexpected response. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Login failed. Please try again.');
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center login-container">
      <div className="row w-100">
        <div className="col-lg-6 d-none d-lg-flex flex-column align-items-center justify-content-center p-0">
          <h1 className="bank-name">Vauecorp Bank</h1>
          <img
            src={banklogo}
            alt="Bank Logo"
            className="img-fluid"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              height: '40%',
              width: '80%',
            }}
          />
        </div>
        <div className="col-lg-6 d-flex justify-content-center align-items-center">
          <div className="col-10 col-sm-8 col-md-6 col-lg-8 login-form-container">
            <h2 className="text-left mb-4">Sign in</h2>
            <p>Please enter your details</p>
            <form onSubmit={login}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-bold">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              <button type="submit" className="button btn btn-primary w-100">
                Login
              </button>
            </form>
            <div className="mt-3 text-center">
              <p>
                Don't have an account? <Link to="/user/register">Register here</Link>
              </p>
            </div>
            {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
