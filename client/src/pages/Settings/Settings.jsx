// Settings.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import "./Settings.css"

const Settings = () => {
  return (
    <div className="Settings-Container">
      <h2>Settings</h2>
      <ul>
        <li>
          <Link to="/Signup">Add a new Admin</Link>
        </li>
        <li>
          <Link to="/Signup">Add a new User</Link>
        </li>
      </ul>
    </div>
  );
};

export default Settings;
