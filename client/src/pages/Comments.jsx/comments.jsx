import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useLocation } from "react-router-dom";

const Comments = ({ TicketID }) => {
  const location = useLocation();
  const ticketIdFromPath = location.pathname.split("/")[2];
  console.log(ticketIdFromPath);
  const [comments, setComments] = useState([]);


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/tickets/comments/${ticketIdFromPath}`);
        setComments(response.data);
       
      } catch (error) {
        console.error('Error fetching comments:', error);
     
      }
    };

    fetchComments();
  }, [ticketIdFromPath]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h2>Comments for Ticket {ticketIdFromPath}</h2>
     
        <ul>
          {comments.map((comment) => (
            <li key={comment.commentID}>
              <strong>Created By:</strong> {comment.FullName}<br />
              <strong>Comment:</strong> {comment.comments}<br />
              <strong>Date:</strong> {formatDate(comment.commentDate)}<br />
              <strong>Time:</strong> {comment.commentTime}<br />
            </li>
          ))}
        </ul>
     
    </div>
  );
};

export default Comments;
