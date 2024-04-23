import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Import your custom CSS file for styling
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const[address, setAddress] = useState('');
  const [role, setRole] = useState('user');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setErrorMessage("Passwords don't match.");
        return;
      }

      axios.defaults.withCredentials = true;

      const response = await axios.post('http://localhost:5001/Signup', {
        FullName: fullName,
        Email: email,
        PhoneNumber: phoneNumber,
        Address : address,
        Username: username,
        Password: password,
        Role : role,
      });

      console.log('Signed up successfully:', response.data);
      navigate('/Login');
    } catch (error) {
      console.error('Error during sign up:', error.response.data);
      setErrorMessage(error.response.data.message);
    }
  };

  return (

    <div className="Signup-container">
      <h2>Add Member</h2>
      <form onSubmit={handleSubmit}>

      <div className="Signup-form-group">
          <label className="Signup-label" htmlFor="FullName">Full Name:</label>
          <input
            type="text"
            id="FullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="Signup-form-control"
            placeholder="Enter full name"
          />
        </div>

        <div className="Signup-form-group">
          <label className="Signup-label" htmlFor="Email">Email:</label>
          <input
            type="email"
            id="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="Signup-form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="Signup-form-group">
          <label className="Signup-label" htmlFor="PhoneNumber">Phone Number:</label>
          <input
            type="text"
            id="PhoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="Signup-form-control"
            placeholder="Enter phone number"
          />
        </div>

        <div className="Signup-form-group">
          <label className="Signup-label" htmlFor="Address">Address:</label>
          <input
            type="text"
            id="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="Signup-form-control"
            placeholder="Enter full name"
          />
        </div>

        <div className="Signup-form-group">
          <label htmlFor="Username">Username:</label>
          <input
            type="text"
            id="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="Signup-form-control"
            placeholder="Enter username"
          />
        </div>

        <div className="Signup-form-group">
          <label htmlFor="Password">Password:</label>
          <input
            type="password"
            id="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="Signup-form-control"
            placeholder="Password"
          />
        </div>

        <div className="Signup-form-group">
          <label className="Signup-label" htmlFor="ConfirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="ConfirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="Signup-form-control"
            placeholder="Confirm Password"
          />
        </div>

        <div className="Signup-form-group">
          <label htmlFor="Role">Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
        </div>

        
        <div className="Signup-form-group">
          <button type="submit" className="Signup-submit-button">
            Sign Up
          </button>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Signup;
