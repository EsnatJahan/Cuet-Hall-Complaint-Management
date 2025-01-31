import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/SeeComplaint.css";

function StudentComplaints() {
  const [complaints, setComplaints] = useState([]);
  
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const role = localStorage.getItem("userRole"); 
        const response = await axios.get(`http://localhost:3000/api/auth/SeeComplaints/${role}`);
        setComplaints(response.data); // Store the fetched complaints data
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
  
    fetchComplaints();
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <h1>Complaint Details</h1>
      
      {complaints.length > 0 ? (
        <div > 
          {complaints.map((complaint, index) => (
            
            <div key={index} className="bg-gray-100 p-10 m-10 rounded-lg shadow-md min-h-[200px] border border-blue-200">
              <div className="text-center min-h-[60px] m-6">
                <h2 className="text-center text-2xl font-bold text-gray-800">{complaint.title}</h2>
              </div>

              <div className="grid grid-cols-[30%_60%] gap-8">
                <div className="space-y-6 p-6 min-h-[250px]">
                  <p className="text-xl space-y-3"><span className="font-bold">Name:</span> {complaint.name}</p>
                  <p className="text-xl space-y-3"><span className="font-bold">ID:</span> {complaint.id}</p>
                  <div className="mt-4">
                    <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
                      Approve
                    </button>
                  </div>
                </div>

                <div className="p-6 bg-white shadow rounded-lg min-h-[100px]">
                  <p className="text-xl"><span className="font-bold">Description:</span> {complaint.description}</p>
                </div>
              </div>
            </div>
            
          ))}
        </div>
      ) : (
        <p>No complaints available.</p>
      )}
    </div>
  );
}

export default StudentComplaints;
