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

      <table className="w-full border border-gray-300 shadow-lg rounded-lg">
        <thead className="h-10">
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
            <th className="px-6 py-3 text-center border-b">Complaint</th>
            <th className="px-6 py-3 text-center border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.length > 0 ? (
            complaints.map((complaint) => (
              <tr key={complaint._id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                <td className="px-6 py-4 border-b">{complaint.title}</td>
                <td className="px-6 py-4 border-b">{complaint.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="h-16 text-center text-gray-500">No complaints found</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}

export default PreviousComplaints;
