import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LeftNavbar.css'; // CSS styles for the left navbar

const LeftNavbar = () => {
  const location = useLocation();
  const { userData, userRole } = location.state || {};
  const navigate = useNavigate();

  const goToExistingTickets = () => {
    navigate('/ExistingTickets', {
      state: {
        userData: userData,
        userRole: userRole,
      },
    });
  };
  const goToTeam = () => {
    navigate('/Team', {
      state: {
        userData: userData,
        userRole: userRole,
      },
    });
  };

  return (
    <div className="left-navbar">
      {/* Navbar content */}
      <img className="logo" src='/images/NCU.jpg' alt="Home Icon" />
      <ul className="nav-items">
        <li>
          <button className="LeftNavbar-button" onClick={goToExistingTickets}>
          <span className="label">Home</span>
          </button>
        </li>
        {userRole === "admin" && (
        <li>
        <button className="LeftNavbar-button" onClick={goToTeam}>
          <span className="label">Manage Team</span>
          </button>
        </li>
        )}
      </ul>
    </div>
  );
};

export default LeftNavbar;
