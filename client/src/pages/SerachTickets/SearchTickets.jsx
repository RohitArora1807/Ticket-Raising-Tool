import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import {  useLocation , useNavigate} from 'react-router-dom';
import "./SearchTickets.css";
import { exportToCsv } from "../ExistingTickets/CsvUtils"; // Create a utility function for CSV export

const Departments = [
    "Academic",
    "Administrative",
    "Finance and Fees",
    "Registrar's Office",
    "Support"
    
  ];
  
  const Statuses = ["Open", "Pending", "Closed"];

const SearchTickets = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole, userData } = location.state || {};
  const [tickets, setTickets] = useState([]);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({
    TicketID: "",
    FromDate: "", // Add FromDate
    ToDate: "", 
    Department: "",
    Status: "",
    Sategory: "",
    Priority: "",
  });

  const resetSearchCriteria = () => {
    setSearchCriteria({
      TicketID:"",
      FromDate: "", // Add FromDate
      ToDate: "", 
      Department: "",
      Status: "",
      Category: "",
      Priority: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      let response;
      
      if (userRole === "admin") {
        // Admin uses this endpoint
        response = await axios.get("http://localhost:5001/search", {
          params: searchCriteria,
        });
      } else {
        // User uses this endpoint
        response = await axios.get(`http://localhost:5001/search/user/${userData.Username}`, {
          params: searchCriteria,
        });
      }
      
      setTickets(response.data);
      setSearchButtonClicked(true); // Set searchButtonClicked to true after search
    } catch (error) {
      console.error("Error searching tickets:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const handleDelete = async (TicketID, userData, userRole) => {
    try {
      let deleteEndpoint = '';
  
      if (userRole === 'admin') {
        // Admin can delete from one endpoint
        deleteEndpoint = `http://localhost:5001/tickets/${TicketID}`;
      } else {
        // User can delete from another endpoint
        deleteEndpoint = `http://localhost:5001/tickets/user/${userData.Username}/${TicketID}`;
      }
  
      await axios.delete(deleteEndpoint);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownloadReport = () => {
    exportToCsv(tickets);
  };


  
  return (
    <div className="search-tickets-container">
      <h1 className="searchTicketHeading">Search Tickets</h1>
      <div>
        <label className="searchTicketLabel">Ticket ID:</label>
        <input
          type="text"
          name="TicketID"
          value={searchCriteria.TicketID}
          onChange={handleInputChange}
          placeholder="Enter Ticket ID"
        />
      </div>

      <div>
        <label className="searchTicketLabel">From Date:</label>
        <input
          type="Date"
          name="FromDate"
          value={searchCriteria.FromDate}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label className="searchTicketLabel">To Date:</label>
        <input
          type="Date"
          name="ToDate"
          value={searchCriteria.ToDate}
          onChange={handleInputChange}
        />
      </div>


      <div>
        <label className="searchTicketLabel">Department:</label>
        <select
          name="Department"
          value={searchCriteria.Department}
          onChange={handleInputChange}
        >
          <option value="">Select Department</option>
          {Departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="searchTicketLabel">Status:</label>
        <select
          name="Status"
          value={searchCriteria.Status}
          onChange={handleInputChange}
        >
          <option value="">Select Status</option>
          {Statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>



      <div>
        <label className="searchTicketLabel">Priority:</label>
        <select name="Priority" value={searchCriteria.Priority} onChange={handleInputChange}>
          <option value="">Select Priority</option>
          <option value="Very High">Very High</option>
          <option value="High">High</option>
          <option value="Low">Low</option>
          <option value="Very Low">Very Low</option>
        </select>
      </div>

      <div>
        <br />
       
      <button className="searchTicketButton" onClick={() => {
          handleSearch();
          resetSearchCriteria(); // Reset search criteria after search
        }}>
       Search
        </button>
        {searchButtonClicked && tickets.length > 0 && (
          <button className="searchTicketButton" onClick={handleDownloadReport}>Download Report</button>
        )}
      </div>
<br />
      <table>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Date</th>
            <th>Department</th>
            <th>Status</th>
            <th>Category</th>
            <th>Priority</th>
            {userRole === "admin" && (
            <th></th>
            )}
            {userRole === "admin" && (
                 <th ></th>
                )}
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.TicketID}>
              <td>{ticket.TicketID}</td>
              <td>{formatDate(ticket.Date)}</td>
              <td>{ticket.Department}</td>
              <td>{ticket.Status}</td>
              <td>{ticket.Category}</td>
              <td>{ticket.Priority}</td>
              <td>
              {userRole === "admin" && (
                <FontAwesomeIcon
                  icon={faPen}
                  onClick={() => navigate(`/edit/${ticket.TicketID}`, { state: { userData, userRole } })}
                />
              )}
              {userRole === "admin" && (
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  onClick={() => handleDelete(ticket.TicketID ,userData, userRole ) }
                />
              )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchTickets;