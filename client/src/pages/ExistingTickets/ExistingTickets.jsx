import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import "./ExistingTickets.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faColumns, faFilter, faFileExport, faTimes, faComments, faEye, faAnglesUp,faAnglesDown} from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch';
import { saveAs } from "file-saver";
import Papa from 'papaparse';

const itemsPerPage = 10;

const ExistingTickets = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole, userData } = location.state || {};
  const [tickets, setTickets] = useState([]);

  const [columns, setColumns] = useState({
    ID: true,
    Date: true,
    Status: true,
    Department: true,
    Category: true,
    Priority: true,
    Summary: true,
    Description: true,
    Screenshots: true,
    Action: true,
  });
  const operators = ["equals", "contains", "starts-with", "ends-with", "not-equals", "from-to"];
  const[columnDropdownOpen, setcolumnDropdownOpen] = useState(false);
  
  const toggleColumnDropdown = () => {
    setcolumnDropdownOpen(!columnDropdownOpen);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTickets = tickets.slice(startIndex, endIndex);

  const [ApplyButtonClicked, setApplyButtonClicked] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [filteredTickets, setFilteredTickets] = useState([]);

  const [filterCriteria, setFilterCriteria] = useState({
    Column: "",
    Operator: "",
    value: "",
    from: "",
    to: "",
  });

  

  const handleFilter = async () => {
    try {
      let response;
  
      if (userRole === "admin") {
        response = await axios.get("http://localhost:5001/filter", {
          params: filterCriteria,
        });
      } else {
        response = await axios.get(`http://localhost:5001/filter/user/${userData.Username}`, {
          params: filterCriteria,
        });
      }
  
      setFilteredTickets(response.data); // Update filtered data
    } catch (error) {
      console.error("Error searching tickets:", error);
    }
  };

  useEffect(() => {
    if (!userData) {
      console.error("userData is undefined");
      return;
    }
  
    const fetchData = async () => {
      try {
        let response;
        if (userRole === 'admin') {
          response = await axios.get("http://localhost:5001/tickets");
        } else if (userRole === 'user') {
          response = await axios.get(`http://localhost:5001/tickets/user/${userData.Username}`);
        }
        setTickets(response.data);
        if (!ApplyButtonClicked) {
          setFilteredTickets(response.data); // Initialize filteredTickets with fetched data
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
}, [userRole, userData, ApplyButtonClicked, filterCriteria, filteredTickets]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  const handleColumnToggle = (columnName) => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      [columnName]: !prevColumns[columnName],
    }));
  };

  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);

  const handleExportClick = () => {
    setExportDropdownOpen(!exportDropdownOpen);
  };

  const exportToCsv = () => {
    const visibleColumns = Object.keys(columns).filter((column) => columns[column]);
  
    // Create a data array for CSV export
    const data = tickets.map((ticket) => {
      const rowData = visibleColumns.map((column) => {
        if (column === 'ID') {
          return ticket.TicketID;
        }
        return ticket[column];
      });
      return rowData;
    });
  
    // Add a header row
    data.unshift(visibleColumns);
  
    // Use PapaParse to convert the data array to a CSV string
    const csv = Papa.unparse(data);
  
    // Create a Blob from the CSV data
    const csvBlob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  
    // Use the FileSaver library to save the Blob as a CSV file
    saveAs(csvBlob, 'tickets.csv');
  };

  const handleDownloadReport = () => {
    exportToCsv();
  };

  const handlePrintReport = () => {
    window.print();
  };

  const ResetFilterCriteria = () => {
    setFilterCriteria({
      Column: "",
      Operator: "",
      value: "",
      from: "",
      to: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
  };

  const [expandedTicketID, setExpandedTicketID] = useState(null);

  const handleArrow = (ticketID) => {
    setExpandedTicketID((prevExpandedTicketID) => (prevExpandedTicketID === ticketID ? null : ticketID));
  };

  const [comment, setComment] = useState("");

  const handleArrowSubmitComment = (ticketID) => {
    axios
      .post(`http://localhost:5001/comments/${ticketID}/${userData.Username}`, { comment })
      .then((response) => {
        console.log('Comment submitted successfully:', response.data);
        setComment('');
      })
      .catch((error) => {
        // Handle any errors that occur during the comment submission.
        console.error('Error submitting comment:', error);
      });
  };


 

  return (
    <div className="ExistingTicketContainer">
      
      <h1 className="ExistingTicketHeading">Existing Tickets</h1>
      <div className="TicketContainer">
        <div className="action-buttons">
          <button className="Action-button" onClick={toggleColumnDropdown}>

            <FontAwesomeIcon icon={faColumns} /> Columns
          </button>
          <button className="Action-button" onClick={() => setFilterDropdownOpen(!filterDropdownOpen)} disabled>
            <FontAwesomeIcon icon={faFilter} /> Filters
          </button>
          <button className="Action-button" onClick={() => handleExportClick()}>
            <FontAwesomeIcon icon={faFileExport} /> Export
          </button>
        </div>

        {columnDropdownOpen && (
          <div className="columns-switch-container">
            {Object.keys(columns).map((column) => (
              <div key={column} className="column-toggle">
                <Switch
                  checked={columns[column]}
                  onChange={() => handleColumnToggle(column)}
                  onColor="#86d3ff"
                  onHandleColor="#2693e6"
                  handleDiameter={15}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  height={20}
                  width={40}
                />
                <span>{column}</span>
              </div>
            ))}
          </div>
        )}
        {exportDropdownOpen && (
          <div className="export-dropdown">
            <button onClick={handleDownloadReport}>Export as CSV</button>
            <button onClick={handlePrintReport}>Print</button>
          </div>
        )}

        {filterDropdownOpen && (
          <div className="filter-dropdown">
            <button className="FilterResetButton" onClick={ResetFilterCriteria}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="filter-options">
              <select
                className="Filter-options-select"
                name="Column"
                value={filterCriteria.Column}
                onChange={handleInputChange}
              >
                <option value="">Select Column</option>
                {Object.keys(columns).map((column) => (
                  <option key={column} value={column}>
                    {column}
                  </option>
                ))}
              </select>

              <select
                className="Filter-options-select"
                name="Operator"
                value={filterCriteria.Operator}
                onChange={handleInputChange}
              >
                <option value="">Select Operator</option>
                {operators.map((operator) => (
                  <option key={operator} value={operator}>
                    {operator}
                  </option>
                ))}
              </select>

              {filterCriteria.Operator === "from-to" ? (
                <>
                  <input
                    type="text"
                    name="from"
                    value={filterCriteria.from}
                    onChange={handleInputChange}
                    placeholder="From"
                  />
                  <input
                    type="text"
                    name="to"
                    value={filterCriteria.to}
                    onChange={handleInputChange}
                    placeholder="To"
                  />
                </>
              ) : (
                <input
                  type="text"
                  name="value"
                  value={filterCriteria.value}
                  onChange={handleInputChange}
                  placeholder="Value"
                />
              )}
              <button
  className="searchTicketButton"
  onClick={() => {
    handleFilter();
    setApplyButtonClicked(true);
  }}
>
  Search
</button>
            </div>
          </div>
        )}

        <div className="TicketTable">
          <table>
            <colgroup>
              {Object.entries(columns).map(([column, isVisible]) => (
                isVisible && <col key={column} style={{ width: '10%' }} />
              ))}
            </colgroup>
            <thead>
              <tr>
                {columns.ID && <th >ID</th>}
                {userRole === "admin" && (
                 <th ></th>
                )}
                {columns.Date && <th>Date</th>}
                {columns.Status && <th>Status</th>}
                {columns.Department && <th>Department</th>}
                {columns.Category && <th>Category</th>}
                {columns.Priority && <th>Priority</th>}
                {columns.Summary && <th>Summary</th>}
                {userRole === "user" && columns.Description &&(
                 <th>Description</th>
                )}
                {columns.Screenshots && <th>Screenshots</th>}
                {columns.Action && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
            {currentTickets.map((ticket) => (
              <React.Fragment key={ticket.TicketID}>
                <tr>
                  {columns.ID && <td>{ticket.TicketID}</td>}
                {userRole === "admin" && (
                <td>
                  <button className="arrowButton" onClick={() => handleArrow(ticket.TicketID)}>
                    <FontAwesomeIcon icon={expandedTicketID === ticket.TicketID ? faAnglesDown : faAnglesUp} />
                  </button>
                </td>
                )}
                   
                  {columns.Date && <td>{formatDate(ticket.Date)}</td>}
                  {columns.Status && <td>{ticket.Status}</td>}
                  {columns.Department && <td>{ticket.Department}</td>}
                  {columns.Category && <td>{ticket.Category}</td>}
                  {columns.Priority && <td>{ticket.Priority}</td>}
                  {columns.Summary && <td>{ticket.Summary}</td>}
                  {userRole === "user" && columns.Description &&(
                  <td>{ticket.Description}</td>
                  )}
                  {columns.Screenshots && (
                    <td>
                    <a href={`http://localhost:5001/Screenshots/${ticket.Screenshots}`} target="_blank" rel="noopener noreferrer">
                      <img src={`http://localhost:5001/Screenshots/${ticket.Screenshots}`} alt="" className='Screenshots' />
                    </a>
                  </td>
                  )}
                  {columns.Action && <td>
                    <div className="existingTicketAction">
                      <button className="viewTicketButton"
                      onClick={() => navigate(`/TicketReport/${ticket.TicketID}`, { state: { userData, userRole } })}>
                    <FontAwesomeIcon
                    icon={faEye}
                  />
                  </button>
                  
                  
                      <button className="commentTicketButton"
                      onClick={() => navigate(`/Comments/${ticket.TicketID}`, { state: { userData, userRole } })}>
                    <FontAwesomeIcon
                    icon={faComments}
                    
                  />
                  </button>
                  </div>
                  </td>}
                </tr>
                {userRole === "admin" && expandedTicketID === ticket.TicketID && (
                <tr>
                  <td colSpan={Object.keys(columns).length}>
                    <div className="arrowDropdown">
                    <div className="ssNameNumber">
                      <div className="ssNameNumberItem"><a href={`http://localhost:5001/Screenshots/${ticket.Screenshots}`} target="_blank" rel="noopener noreferrer">
                      <img src={`http://localhost:5001/Screenshots/${ticket.Screenshots}`} alt="" className="ssNameNumberImg" />
                    </a></div>
                      <div className="ssNameNumberItem">{ticket.FullName}</div>
                      <div className="ssNameNumberItem">{ticket.PhoneNumber}</div>
                      </div>
                      <div className="arrowDeptCate">
                      <div>Department: {ticket.Department}</div>
                      <div>Summary: {ticket.Summary}</div>
                      </div>
                      <div className="arrowSumDes">
                      <div>Category: {ticket.Category}</div>
                      <div>Description: {ticket.Description}</div>++
                      </div>
                      <div className="arrowCommentBox">
                      <textarea
                       className="arrowTextArea" 
                       placeholder="Add a comment" 
                       value={comment} 
                       onChange={(e) => setComment(e.target.value)}
                       />
                      <button onClick={() => handleArrowSubmitComment(ticket.TicketID , userData.Username)}>Submit</button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
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

export default ExistingTickets;
