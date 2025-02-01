import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/SeeComplaint.css";

function WorkInProgress() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [actionPlan, setActionPlan] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
    useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    if (storedUser) {
      setUserName(storedUser);
    } else {
      setUserName("");
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("userId");
    if (storedUser) {
      setUserId(storedUser);
    } else {
      setUserId(""); 
    }
  }, []);


  useEffect(() => {
    const storedUser = localStorage.getItem("userId");
    
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
  const handleAddOpinion = async (c_id) => {
    if (!actionPlan.trim()) {
      alert("Please enter an action plan before confirming.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/AddOpinion", {
        c_id, // Send complaint ID
        actionPlan, // Send written action plan
        userName,
        userId
      });

      setShowModal(false);
      setSelectedComplaint(null);
      setActionPlan("");
      alert(response.data.message); 
    } catch (error) {
      console.error("Error approving complaint:", error);
      alert("Failed to approve complaint. Please try again.");
    }
  };

  return (
    <div style={{ width: "100%", height: "89vh" }}>
      <h1>Complaint Details</h1>

      {complaints.length > 0 ? (
        complaints.map((complaint) => (
          <div>
          <div key={complaint.c_id} className="bg-gray-100 p-10 m-10 rounded-lg shadow-md min-h-[220px] border border-blue-500">
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
                  <th className="text-center border border-gray-300 px-4 py-2  w-[60%]">Requirements</th>
                </tr>
              </thead>
              <tbody>
                {complaint.opinions.map((opinion, index) => (
                  <tr key={index} className="bg-white h-auto">
                    <td className="border border-gray-300 px-4 py-2">{opinion.userName}</td>
                    <td className="border border-gray-300 px-4 py-2">{opinion.userId}</td>
                    <td className="border border-gray-300 px-4 py-2">{opinion.opinion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="h-4"/>
            <div className="mt-2 flex justify-center">
              <button 
                onClick={() => handleApproveClick(complaint)}
                className="bg-green-600 text-white px-12 py-3 rounded hover:bg-green-700"
              >
               Add Requirements
              </button>
            </div>  
            <div className="h-4"/>        
          </div>
            <div className="h-6"/>
          </div>  
                 
        ))
      ) : (
        <p>No complaints available.</p>
      )}

      {/* Approval Modal with Blurred Background */}
      {showModal && selectedComplaint && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md">
          <div className="bg-white p-10 rounded-lg shadow-lg w-[600px] min-h-[300px] border border-gray-300">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Student Requirements</h2>
            <textarea
              className="w-full p-3 border border-gray-300 rounded text-lg min-h-[150px]"
              placeholder="Enter Requirement..."
              value={actionPlan}
              onChange={(e) => setActionPlan(e.target.value)}
            />
            <div className="flex justify-end mt-6">
              <button className="bg-gray-500 text-white px-6 py-3 rounded mr-3" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button 
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700" 
                onClick={() => handleAddOpinion(selectedComplaint.c_id)} // Pass c_id
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default WorkInProgress;
