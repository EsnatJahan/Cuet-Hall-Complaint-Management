import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/SeeComplaint.css";

function StudentComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [actionPlan, setActionPlan] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const role = localStorage.getItem("userRole"); 
        const response = await axios.get(`http://localhost:3000/api/auth/Approved/${role}`);
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
    fetchComplaints();
  }, []);

  const handleApproveClick = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <h1>Complaint Details</h1>

      {complaints.length > 0 ? (
        complaints.map((complaint) => (
          <div key={complaint._id} className="bg-gray-100 p-10 m-10 rounded-lg shadow-md min-h-[220px] border border-blue-500">
            <div className="h-2"/>
            <div className="mb-6">
              <h2 className="text-center text-2xl font-bold text-gray-800">{complaint.message}</h2>
            </div>
            <div className="h-2"/>
            <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg" >
              <thead>
                <tr className="bg-gray-200">
                  <th className="text-center border border-gray-300 px-4 py-2">Name</th>
                  <th className="text-center border border-gray-300 px-4 py-2 ">ID</th>
                  <th className="text-center border border-gray-300 px-4 py-2  w-[60%]">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">{complaint.userName}</td>
                  <td className="border border-gray-300 px-4 py-2">{complaint.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{complaint.description}</td>
                </tr>
              </tbody>
            </table>
            <div className="h-2"/>
            <div className="mt-2 flex justify-center">
              <button 
                onClick={() => handleApproveClick(complaint)}
                className="bg-green-600 text-white px-12 py-3 rounded hover:bg-green-700"
              >
                Mark as Done
              </button>
            </div>          
          </div>  
                 
        ))
      ) : (
        <p>No complaints available.</p>
      )}

      {/* Approval Modal with Blurred Background */}

    </div>
  );
}

export default StudentComplaints;
