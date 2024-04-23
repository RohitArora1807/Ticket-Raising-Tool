import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./TicketReport.css";

const TicketReport = () => {
  const location = useLocation();
  const ticketIdFromPath = location.pathname.split("/")[2];
  console.log(ticketIdFromPath);
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/view/${ticketIdFromPath}`);
        const ticketData = response.data.ticket;

        setTicketData(ticketData);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };

    fetchData();
  }, [ticketIdFromPath]);

  if (!ticketData) {
    return <div>Ticket not found.</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  // Left -Summary, Des ----- Right -CreatedBy, Created On ----- Bottom -ss
  return (
    <div className="ab">
    <div className="ticketReportContainer">
        <div className="box1">
        <div className="ticketReportHeading">Ticket Report</div>
        <div className="ticketReportHeading2">ID: {ticketData.TicketID}</div>
        </div>

        <div className="boxContainer">
            <div className="upperBox">
        <div className="box">
        <div className="boxItem"> <h4 className="boxItemHeading">Summary: </h4>{ticketData.Summary}</div>
        <div className="boxItem"> <h4 className="boxItemHeading">Description: </h4>{ticketData.Description}</div>
        </div>
        </div>
    <div className="box">
    <div className="boxItem"><h4 className="boxItemHeading">Created By:</h4> {ticketData.FullName}</div>
        <div className="boxItem"><h4 className="boxItemHeading">Created On:</h4> {formatDate(ticketData.Date)}</div>
        </div>
        </div>
        <div className="box">
        <div className="boxItem"><h4 className="boxItemHeading">Screenshots</h4> 
        <a href={`http://localhost:5001/Screenshots/${ticketData.Screenshots}`} target="_blank" rel="noopener noreferrer">
        <img src={`http://localhost:5001/Screenshots/${ticketData.Screenshots}`} alt="" className="ticketReportSS" />
        </a>
        </div>
        </div>
  </div>
  </div>
);
};

export default TicketReport;
