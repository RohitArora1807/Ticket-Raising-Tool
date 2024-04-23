import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSearch, faPlus, faBars } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const { userData, userRole } = location.state || {};
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleMouseEnter = () => {
    setExpanded(true);
  };
  

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  const goToSettings = () => {
    navigate('/Settings');
  };

  const goToSearchTickets = () => {
    navigate('/SearchTickets', {
      state: {
        userData: userData,
        userRole: userRole,
      },
    });
  };

  const goToCreateTicket = () => {
    navigate('/CreateTicket', {
      state: {
        userData: userData,
        userRole: userRole,
      },
    });
  };
  const goToExistingTickets = () => {
    navigate('/ExistingTickets', {
      state: {
        userData: userData,
        userRole: userRole,
      },
    });
  };

  return (
    <div
      className={`sidebar-component ${expanded ? 'sidebar-expanded' : 'sidebar-compressed'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sidebar-icon-container">
        <button className="sidebar-button" onClick={goToExistingTickets}>
          <FontAwesomeIcon
            className={`sidebar-icon ${expanded ? 'sidebar-expanded-icon' : ''}`}
            icon={faBars}
          />
          {expanded && <span className="sidebar-icon-text">Home</span>}
        </button>
      </div>
      <div className="sidebar-icon-container">
        <button className="sidebar-button" onClick={goToSettings}>
          <FontAwesomeIcon
            className={`sidebar-icon ${expanded ? 'sidebar-expanded-icon' : ''}`}
            icon={faCog}
          />
          {expanded && <span className="sidebar-icon-text">Settings</span>}
        </button>
      </div>
      <div className="sidebar-icon-container">
        <button className="sidebar-button" onClick={goToSearchTickets}>
          <FontAwesomeIcon
            className={`sidebar-icon ${expanded ? 'sidebar-expanded-icon' : ''}`}
            icon={faSearch}
          />
          {expanded && <span className="sidebar-icon-text">Search</span>}
        </button>
      </div>
      <div className="sidebar-icon-container">
        <button className="sidebar-button" onClick={goToCreateTicket}>
          <FontAwesomeIcon
            className={`sidebar-icon ${expanded ? 'sidebar-expanded-icon' : ''}`}
            icon={faPlus}
          />
          {expanded && <span className="sidebar-icon-text">Add</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
