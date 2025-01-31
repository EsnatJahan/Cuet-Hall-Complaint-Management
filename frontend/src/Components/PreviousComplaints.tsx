import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Styles/PreviousComplaint.css';

function PreviousComplaints() {
  const [complaints, setComplaints] = useState([]);

  // Fetch complaints from API
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const userId = localStorage.getItem("userId"); 
        const response = await axios.get(`http://localhost:3000/api/auth/PrevComplaints/${userId}`);
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
  
    fetchComplaints();
  }, []);

  return (
    <div>
      <h1>Previous Complaints</h1>

      <table>
        <thead>
          <tr>
            <th>Complaint</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.length > 0 ? (
            complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.title}</td>
                <td>{complaint.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No complaints found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PreviousComplaints;
