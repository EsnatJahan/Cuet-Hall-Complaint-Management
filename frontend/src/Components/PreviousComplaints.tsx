import React from "react";
import '../Styles/PreviousComplaint.css'

function PreviousComplaints() {
  const complaints = [
    { id: 1, title: "Broken Door", status: "Resolved" },
    { id: 2, title: "Leaking Tap", status: "Pending" },
    { id: 3, title: "Power Outage", status: "In Progress" },
  ];

  return (
    <div>
      <h1>Previous Complaints</h1>
      {/* <ul>
        {complaints.map((complaint) => (
          <li key={complaint.id}>
            <strong>{complaint.title}</strong> - {complaint.status}
          </li>
        ))}
      </ul> */}
      <table >
        <tr>
          
            <th>Complaint</th>
            <th>Status</th>
        </tr>
        <tr>
            <td>Broken Door</td>
    
            <td>Resolved</td>
        </tr>
        <tr>
            <td>Leaking Tap</td>
            <td>Pending</td>
           
        </tr>
        <tr>
            <td>Power Outage</td>
            <td>In Progress</td>
           
        </tr>
    </table>
    </div>
  );
};

export default PreviousComplaints;
