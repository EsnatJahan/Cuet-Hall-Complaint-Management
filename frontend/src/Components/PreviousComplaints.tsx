import React from "react";

function PreviousComplaints() {
  const complaints = [
    { id: 1, title: "Broken Door", status: "Resolved" },
    { id: 2, title: "Leaking Tap", status: "Pending" },
    { id: 3, title: "Power Outage", status: "In Progress" },
  ];

  return (
    <div>
      <h1>Previous Complaints</h1>
      <ul>
        {complaints.map((complaint) => (
          <li key={complaint.id}>
            <strong>{complaint.title}</strong> - {complaint.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviousComplaints;
