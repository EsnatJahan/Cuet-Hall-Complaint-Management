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
          <div key={complaint._id} className="bg-gray-100 p-10 m-10 rounded-lg shadow-md min-h-[250px] border border-blue-500">
            <div className="mb-6">
              <h2 className="text-center text-2xl font-bold text-gray-800">{complaint.title}</h2>
            </div>

            <div className="grid grid-cols-[30%_60%] gap-8 pl-1.5">
              <div className="space-y-6 p-6 ">
                <p className="text-xl"><span className="font-bold">Name:</span> {complaint.userName}</p>
                <p className="text-xl"><span className="font-bold">ID:</span> {complaint.id}</p>
                
                {/* Approve Button */}
                <div className="mt-4">
                  <button 
                    onClick={() => handleApproveClick(complaint)}
                    className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
                  >
                    Done
                  </button>
                </div>
              </div>

              <div className="p-6 bg-white shadow rounded-lg    pl-1.5">
                <p className="text-xl pl-3"><span className="font-bold">Description:</span> {complaint.description}</p>
              </div>
            </div>
            <div className="min-h-[80px]">
              <p className="text-xl shadow rounded-lg"><span className="font-bold">Message:</span> {complaint.message}</p>
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
