import React from 'react';
import Sidebar from '../components/sideBar/Sidebar';
import LeftNavbar from '../components/LeftNavbar/LeftNavbar';

import './Layout.css'; // Import the CSS file for the layout
import Topbar from '../components/topbar/Topbar';
import { useLocation } from 'react-router-dom';

const Layout = ( {children}) => {
  const location = useLocation();
  const { userRole, userData } = location.state || {};
  console.log(children);
  return (
    <div className="topbar-container">
      <Topbar  />
    <div className="layout-container">
      <Sidebar userRole={userRole} userData={userData}/>
      <div className="content-container">
        <LeftNavbar userRole={userRole} userData={userData} />
        {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
