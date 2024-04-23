import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import "../CreateTicket/CreateTicket.css"

const EditTicket = () => {
  const [TicketID, setTicketID] = useState("");
 
  const [Status, setStatus] = useState("Open");
  const [Department, setDepartment] = useState("");
  const [Category, setCategory] = useState("");
  const [Priority, setPriority] = useState("Very High");
  const [Summary, setSummary] = useState("");
  const [Description, setDescription] = useState("");

  const navigate = useNavigate();
  const location = useLocation(); 
  const { userData , userRole} = location.state || {}; 

  const Departments = ["Accounts", "Architect", "Audit", "Ayush", "Civil Engineering", "Commercial", "Council Secretariat", "Electricity", "Enforcement", "EBR", "Estate-I", "Estate-II", "Education", "Fire", "Finance", "General Administration", "Horticulture", "Information Technology", "Law", "Municipal Housing", "Medical Services", "PT","Public Health", "Project", "Personnel", "Parking Management System", "Property Tax", "Public Relation", "QC&TA", "Revenue & Power", "Security", "Training", "Transport", "Vigilance", "Welfare"];
  const Categories = {
    "Accounts": ["User Training", "Reports", "Operational Activities"],
    "Architect": ["User Training", "Reports", "Operational Activities"],
    "Audit": ["User Training", "Reports", "Operational Activities"],
    "Ayush": ["User Training", "Reports", "Operational Activities"],
    "Civil Engineering": ["User Training", "Reports", "Operational Activities"],
    "Commercial": ["User Training", "Reports", "Operational Activities"],
    "Council Secretariat": ["User Training", "Reports", "Operational Activities"],
    "Electricity": ["User Training", "Reports", "Operational Activities"],
    "Enforcement": ["User Training", "Reports", "Operational Activities"],
    "EBR": ["User Training", "Reports", "Operational Activities"],
    "Estate-I": ["User Training", "Reports", "Operational Activities"],
    "Estate-II": ["User Training", "Reports", "Operational Activities"],
    "Education": ["User Training", "Reports", "Operational Activities"],
    "Fire": ["User Training", "Reports", "Operational Activities"],
    "Finance": ["User Training", "Reports", "Operational Activities"],
    "General Administration": ["User Training", "Reports", "Operational Activities"],
    "Horticulture": ["User Training", "Reports", "Operational Activities"],
    "Information Technology": ["User Training", "Reports", "Operational Activities"],
    "Law": ["User Training", "Reports", "Operational Activities"],
    "Municipal Housing": ["User Training", "Reports", "Operational Activities"],
    "Medical Services": ["User Training", "Reports", "Operational Activities"],
    "PT": ["PT History Details Search", "Notice 72", "PT History Details Search -- DCB", "PT Search", "Relief Details Request"],
    "Public Health": ["User Training", "Reports", "Operational Activities"],
    "Project": ["User Training", "Reports", "Operational Activities"],
    "Personnel": ["User Training", "Reports", "Operational Activities"],
    "Parking Management System": ["User Training", "Reports", "Operational Activities"],
    "Property Tax": ["User Training", "Reports", "Operational Activities"],
    "Public Relation": ["User Training", "Reports", "Operational Activities"],
    "QC&TA": ["User Training", "Reports", "Operational Activities"],
    "Revenue & Power": ["User Training", "Reports", "Operational Activities"],
    "Security": ["User Training", "Reports", "Operational Activities"],
    "Training": ["User Training", "Reports", "Operational Activities"],
    "Transport": ["User Training", "Reports", "Operational Activities"],
    "Vigilance": ["User Training", "Reports", "Operational Activities"],
    "Welfare": ["User Training", "Reports", "Operational Activities"],
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/tickets/${TicketID}`);
        const ticketData = response.data.ticket;
        setStatus(ticketData.Status);
        setDepartment(ticketData.Department);
        setCategory(ticketData.Category);
        setPriority(ticketData.Priority);
        setSummary(ticketData.Summary);
        setDescription(ticketData.Description);
        
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };
    const ticketIdFromPath = location.pathname.split("/")[2];
    setTicketID(ticketIdFromPath);
    fetchData();
  }, [TicketID,  location.pathname]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const ticket = {
      
      Status,
      Department,
      Category,
      Priority,
      Summary,
      Description,
     
    };

    try {
      const response = await axios.put("http://localhost:5001/tickets/" + TicketID, ticket);
      console.log("Ticket submitted successfully:", response.data);

      navigate("/ExistingTickets", { state: { userData,userRole } });
      
    } catch (error) {
      console.error("Error submitting ticket:", error);
    }
  };

  const handleDepartmentChange = (selectedDepartment) => {
    setDepartment(selectedDepartment);
    setCategory(""); // Reset category when department changes
  };

 
  

  return (
    <form className="CreateTicket-form" onSubmit={handleSubmit}>
    <h1 className="CreateTicketHeading">Edit Ticket</h1>
    <div className="CreateTicket-DateStatus">
    <div className="CreateTicket-Status">  
      <label className="CreateTicket-label">Ticket ID:</label>
      <input
        type="text"
        value={TicketID}
        readOnly
        className="CreateTicket-select"
      />
    </div>
      

<div className="CreateTicket-Status">
    <label className="CreateTicket-label">Status:</label>
    <select
      value={Status}
      onChange={(e) => setStatus(e.target.value)}
      className="CreateTicket-select"
      
    >
      <option value="Open">Open</option>
      <option value="Pending">Pending</option>
      <option value="Closed">Closed</option>
    </select>
    </div>
    </div>

    <div className="CreateTicket-DeptCate">
      <div className="CreateTicket-Dept"> 
    <label className="CreateTicket-label">Department:</label>
    <select
      value={Department}
      onChange={(e) => handleDepartmentChange(e.target.value)}
      required
      className="CreateTicket-select"
    >
      <option value="">Select Department</option>
      {Departments.map((dep) => (
        <option key={dep} value={dep}>
          {dep}
        </option>
      ))}
    </select>
    </div>

      {/* Category */}
      <div>
      {Department && (
        <div className="CreateTicket-Cate">
          <label className="CreateTicket-label">Category:</label>
          <select
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
            className="CreateTicket-select"
            required
          >
            <option value="">Select Category</option>
            {Categories[Department].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      )}
      </div>
      </div>

      {/* Priority */}
      <div className="CreateTicket-Prio">
      <label className="CreateTicket-label">Priority:</label>
      <select value={Priority} className="CreateTicket-select" onChange={(e) => setPriority(e.target.value)}>
        <option value="Very High">Very High</option>
        <option value="High">High</option>
        <option value="Low">Low</option>
        <option value="Very Low">Very Low</option>
      </select>
      </div>

      {/* Summary */}
      <label className="CreateTicket-label">Summary:</label>
      <textarea
        value={Summary}
        onChange={(e) => setSummary(e.target.value)}
        className="CreateTicket-SumTextArea"
        maxLength={100}
        required
      />

      {/* Description */}
      <label className="CreateTicket-label">Description:</label>
      <textarea
        value={Description}
        onChange={(e) => setDescription(e.target.value)}
        className="CreateTicket-DesTextArea"
        required
      />
      

      <button className="CreateTicket-button" type="submit">
      Submit
    </button>
    </form>
  );
};

export default EditTicket;
