import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import "../ExistingTickets/ExistingTickets.css";
import "./Team.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faUser, faUserShield} from '@fortawesome/free-solid-svg-icons';

const itemsPerPage = 10;

const Team = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userRole, userData } = location.state || {};
  const [tickets, setTickets] = useState([]);

  const columns=({
    ID: true,
    FullName: true,
    Email: true,
    PhoneNumber: true,
    Address: true,
    Role: true,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTickets = tickets.slice(startIndex, endIndex);
 

  useEffect(() => {
    if (!userData) {
      console.error("userData is undefined");
      return;
    }

    const fetchData = async () => {
      try {
        let response;
        if (userRole === 'admin') {
          response = await axios.get("http://localhost:5001/team");
        } else if (userRole === 'user') {
          response = await axios.get(`http://localhost:5001/team`);
        }
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [userRole, userData]);

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  const goToSignUp = () => {
    navigate('/Signup');
  };

  return (
    <div className="ExistingTicketContainer">
      <h1 className="ExistingTicketHeading">Manage Team</h1>
      <div className="addMember">
        <button className="addMemberButton" onClick={goToSignUp}>Add Member</button>
      </div>
      <div className="TicketContainer">
      <div className="TicketTable">  
      <table>
      <colgroup>
              {Object.entries(columns).map(([column, isVisible]) => (
                isVisible && <col key={column} style={{ width: '10%' }} />
              ))}
            </colgroup>
            <thead>
                <tr>
                {columns.ID && <th>ID</th>}
                {columns.FullName && <th>Name</th>}
                {columns.Email && <th>Email</th>}
                {columns.PhoneNumber && <th>Phone Number</th>}
                {columns.Address && <th>Address</th>}
                {columns.Role && <th>Access Level</th>}
                </tr>
            </thead>
  <tbody>
  {currentTickets.map((credential) => (
      <tr key={credential.ID}>
        {columns.ID && <td>{credential.ID}</td>}
        
                {columns.FullName && <td>{credential.FullName}</td>}
                {columns.Email && <td>{credential.Email}</td>}
                {columns.PhoneNumber && <td>{credential.PhoneNumber}</td>}
                {columns.Address && <td>{credential.Address}</td>}
                {columns.Role && (
        <td>
          <button className="role-button" disabled>
            {credential.Role === 'admin' ? (
              <>
                <FontAwesomeIcon icon={faUserShield} /> Admin
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faUser} /> User
              </>
            )}
          </button>
        </td>
      )}
    </tr>
  ))}
</tbody>
      </table>
    </div>
    <div className="pagination">
    <p>{startIndex + 1}-{Math.min(endIndex, tickets.length)}/{tickets.length}</p>
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
  >
    <FontAwesomeIcon icon={faChevronLeft} />
  </button>
  
  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
  >
    <FontAwesomeIcon icon={faChevronRight} />
  </button>
</div>
      </div>
    </div>
  );
};

export default Team;
