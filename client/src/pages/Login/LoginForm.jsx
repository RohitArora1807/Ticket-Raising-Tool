// LoginForm.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  return (
    <div className='background-image'>
    <div className="login-form-container">
      <h2 className="login-form-heading">Login</h2>
      <Link to="/Login" className="login-form-link login-form-admin-link">
        Admin Login
      </Link>
      <br />
      <Link to="/Login" className="login-form-link login-form-user-link">
        User Login
      </Link>
    </div>
    </div>
  );
};

export default LoginForm;
