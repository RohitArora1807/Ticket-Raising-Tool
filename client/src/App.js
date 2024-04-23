import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import CreateTicket from './pages/CreateTicket/CreateTicket';
import ExistingTickets from './pages/ExistingTickets/ExistingTickets';
import Layout from './Layout/Layout';
import SearchTickets from './pages/SerachTickets/SearchTickets';
import LoginForm from './pages/Login/LoginForm';
import Settings from './pages/Settings/Settings';
import EditTicket from './pages/EditTicket/EditTicket';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';

import Team from './pages/Team/Team';
import TicketReport from './pages/TicketReport/TicketReport.jsx';
import Comments from './pages/Comments.jsx/comments';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userData, setUserData] = useState(null);
  

  const handleLogin = (role, data) => {
    setUserRole(role);
    setUserData(data);
    setLoggedIn(true);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login onLogin={handleLogin} />} />
      
          <Route
            path="/ExistingTickets"
            element={
              <Layout userRole={userRole} userData={userData}>
                <ExistingTickets userRole={userRole} userData={userData} />
              </Layout>
            }
          />
          <Route
            path="/CreateTicket"
            element={
              <Layout userRole={userRole} userData={userData} >
                <CreateTicket userData={userData}  />
              </Layout>
            }
          />
          <Route
            path="/SearchTickets"
            element={
              <Layout userRole={userRole} userData={userData}>
                <SearchTickets userRole={userRole} userData={userData} />
              </Layout>
            }
          />
          <Route
            path="/Settings"
            element={
              <Layout userRole={userRole} userData={userData}>
                <Settings />
              </Layout>
            }
          />
           <Route
            path="/Team"
            element={
              <Layout userRole={userRole} userData={userData}>
                <Team />
              </Layout>
            }
          />
          <Route
            path="/edit/:TicketID"
            element={
              <Layout userRole={userRole} userData={userData}>
                <EditTicket />
              </Layout>
            }
          />
          <Route
            path="/TicketReport/:TicketID"
            element={
                <TicketReport />
            }
          />

          <Route
            path="/Comments/:TicketID"
            element={
                <Comments />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
