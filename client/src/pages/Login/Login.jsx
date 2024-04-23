import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userData, setUserData] = useState(null); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/Login', {
        Username: username,
        Password: password,
      });

      const { id, role, userData } = response.data;
      console.log('Login successful. Role:', role);
      setUserRole(role);
      setUserData(userData);

      onLogin(id, role); 


      setLoggedIn(true);
      setErrorMessage('');

    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error during login:', error.response.data);
        setErrorMessage(error.response.data.message);
      } else {
        console.error('Error during login:', error);
        // Handle the error gracefully, e.g., show a generic error message to the user
        setErrorMessage('An error occurred during login.');
      }
    }
  };

  if (loggedIn) {
    if (userRole === 'admin') {
      navigate('/ExistingTickets', { state: { userRole, userData } });
    } else if (userRole === 'user') {
      navigate('/ExistingTickets', { state: { userRole, userData } });
    }

    // Render nothing here
    return null;
  }

  return (
    <div className="Login-container">
      <h2 className="Login-heading">Login</h2>
      <form onSubmit={handleSubmit} className="Login-form">
        <div>
          <label htmlFor="Username" className="Login-label">Username:</label>
          <input
            type="text"
            id="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="Login-input"
          />
        </div>
        <div>
          <label htmlFor="Password" className="Login-label">Password:</label>
          <input
            type="password"
            id="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="Login-input"
          />
        </div>
        <div>
          <button type="submit" className="Login-button">Login</button>
        </div>
        {errorMessage && <p className="Login-error">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
