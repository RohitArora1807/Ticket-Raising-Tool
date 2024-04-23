// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const year = date.getFullYear().toString().slice(-2);
//   const month = (date.getMonth() + 1).toString().padStart(2, "0");
//   return `${year}${month}`;
// };

// const generateSpecialID = (dateString, department, ticketID) => {
//   const formattedDate = formatDate(dateString);
//   const departmentCode = department.slice(0, 2).toUpperCase();
//   const paddedTicketID = ticketID.toString().padStart(3, "0");
//   return `${formattedDate}${departmentCode}${paddedTicketID}`;
// };

// const SpecialID = () => {
//   const { TicketID } = useParams();

//   const [ticketData, setTicketData] = useState({
//     Date: "",
//     Status: "",
//     Department: "",
//     Category: "",
//     Priority: "",
//     Summary: "",
//     Description: "",
//     Screenshots: [],
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5001/tickets/${TicketID}`);
//         const ticket = response.data.ticket;

//         // Update the ticketData state with the fetched ticket data
//         setTicketData({
//           Date: ticket.Date,
//           Status: ticket.Status,
//           Department: ticket.Department,
//           Category: ticket.Category,
//           Priority: ticket.Priority,
//           Summary: ticket.Summary,
//           Description: ticket.Description,
//           Screenshots: ticket.Screenshots,
//         });

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching ticket:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [TicketID]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   const specialID = generateSpecialID(
//     ticketData.Date,
//     ticketData.Department,
//     TicketID
//   );

//   return (
//     <div>
//       <h1>Ticket Details for Special ID: {specialID}</h1>
//       <p>Date: {ticketData.Date}</p>
//       <p>Status: {ticketData.Status}</p>
//       <p>Department: {ticketData.Department}</p>
//       <p>Category: {ticketData.Category}</p>
//       <p>Priority: {ticketData.Priority}</p>
//       <p>Summary: {ticketData.Summary}</p>
//       <p>Description: {ticketData.Description}</p>
//       <div>
//         <h3>Screenshots:</h3>
//         {ticketData.Screenshots.map((screenshot, index) => (
//           <div key={index}>
//             <img
//               src={screenshot}
//               alt={`Screenshot ${index + 1}`}
//               style={{ maxWidth: "300px", maxHeight: "300px" }}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SpecialID;
