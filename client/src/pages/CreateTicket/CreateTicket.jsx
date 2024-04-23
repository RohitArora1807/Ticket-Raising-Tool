// CreateTicket.jsx
import React, { useState, useEffect } from "react";
import { useNavigate , useLocation} from 'react-router-dom';
import axios from "axios";
import "./CreateTicket.css";
import {io} from "socket.io-client";


const CreateTicket = () => {
  const [Date, setDate] = useState("");
  const [Status, setStatus] = useState("Open");
  const [Department, setDepartment] = useState("");
  const [Category, setCategory] = useState("");
  const [Priority, setPriority] = useState("Very High");
  const [Summary, setSummary] = useState("");
  const [Description, setDescription] = useState("");
  const [selectedScreenshots, setSelectedScreenshots] = useState([]);

  
  
  const navigate = useNavigate();

  const location = useLocation(); 
  const { userData , userRole} = location.state || {}; 

  const Departments = [
    "Academic",
    "Administrative",
    "Finance and Fees",
    "Registrar's Office",
    "Support" 
  ];

  const Categories = {
    "Academic":["School of Engineering and Technology","School of Management","School of Law","School of Sciences","School of Professional Attachment"],
    "Administrative":["Admissions Office","Finance and Accounts","Examination Cell","Student Affairs","International Affairs","Research and Development","Library Services","IT Services","Human Resources","Procurement and Purchase","Estates and Facilities Management"],
    "Finance and Fees":["Fee Collection", "Scholarships and Financial Aid"],
    "Registrar's Office":["Academic Records", "Transcript Services", "Registration and Enrollment"],
    "Support":["Career Development and Placement", "Student Counseling and Support", "Health Services", "Sports and Recreation", "Alumni Relations", "Public Relations and Communications"]
  };

    // Function to handle file input change
    const handleScreenshotsChange = (e) => {
      const files = Array.from(e.target.files);
      setSelectedScreenshots([...selectedScreenshots, ...files]);
    };
  
    useEffect(() =>{
      const socket = io('http://localhost:5001');
      console.log(socket.on("firstEvent", (msg)=>{
        console.log(msg)
      }))
    },[])

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const ticket = new FormData();
      ticket.append("Date", Date);
      ticket.append("Status", Status);
      ticket.append("Department", Department);
      ticket.append("Category", Category);
      ticket.append("Priority", Priority);
      ticket.append("Summary", Summary);
      ticket.append("Description", Description);
  
      for (let i = 0; i < selectedScreenshots.length; i++) {
        ticket.append("Screenshots", selectedScreenshots[i]);
      }
  
      try {
        const response = await axios.post(`http://localhost:5001/tickets/user/${userData.Username}`, ticket, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Ticket submitted successfully:", response.data);

       
  
        // Clear form fields and screenshots after submission
        setDate("");
        setStatus("Open");
        setDepartment("");
        setCategory("");
        setPriority("Very High");
        setSummary("");
        setDescription("");
        setSelectedScreenshots([]);
  
        navigate("/ExistingTickets", { state: { userData, userRole } });


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
    <h1 className="CreateTicketHeading">Create Ticket</h1>
    <div className="CreateTicket-DateStatus">
    <div className="CreateTicket-Status">
    <label className="CreateTicket-label">Status:</label>
    <select
      value={Status}
      onChange={(e) => setStatus(e.target.value)}
      className="CreateTicket-select"
      disabled
    >
      <option value="Open">Open</option>
      <option value="Pending">Pending</option>
      <option value="Closed">Submitted</option>
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

<label className="CreateTicket-label">Screenshots:</label>
      <input type="file" onChange={handleScreenshotsChange} multiple />
      
      {/* Display selected screenshots */}
      {selectedScreenshots.map((file, index) => (
        <div key={index}>
          {file.name}
        </div>
      ))}
      
      <button className="CreateTicket-button" type="submit">
      Submit
    </button>
    </form>
  );
};

export default CreateTicket;

