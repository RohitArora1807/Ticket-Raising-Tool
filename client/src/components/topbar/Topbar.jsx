import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import './Topbar.css';


const Topbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { userData } = location.state || {};
  
  const navigate = useNavigate();
  

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const goToLogin = () => {
    navigate('/Login');
  };


  return (
    <div className="topbar">
      <div className="topbar-logo">
        <img src="/images/NCU.jpg" alt="Logo" />
        <span>The NorthCap University</span>
      </div>
      <div
        className="topbar-admin"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <FontAwesomeIcon icon={faUser} className="topbar-icon" />
        {isDropdownOpen && (
          <div
            className="topbar-dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ul>
              <li>Full Name: {userData.FullName}</li>
              <li>Email: {userData.Email}</li>
              <li>PhoneNumber: {userData.PhoneNumber}</li>
              <li>Role: {userData.Role}</li>
              <li><button onClick={goToLogin}>Logout</button></li>
            </ul>
          </div>
        )}
      
      </div>
      <button className="BellButton">
        <FontAwesomeIcon icon={faBell} />
        <div className="bellCounter">1</div>
      </button>
    </div>
  );
};

export default Topbar;
