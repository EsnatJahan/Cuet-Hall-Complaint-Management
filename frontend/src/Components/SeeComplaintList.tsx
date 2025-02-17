import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/SeeComplaint.css";

function StudentComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [actionPlan, setActionPlan] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const role = localStorage.getItem("userRole"); 
        const response = await axios.get(`http://localhost:3000/api/auth/SeeComplaints/${role}`);
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
    fetchComplaints();
  }, []);

  // Open modal with selected complaint
  const handleApproveClick = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
  };

  // Confirm approval (send action plan to backend)
  const handleConfirmApproval = async (c_id) => {
    if (!actionPlan.trim()) {
      alert("Please enter an action plan before confirming.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/ApproveComplaint", {
        c_id, // Send complaint ID
        actionPlan, // Send written action plan
      });

      console.log("Complaint Approved:", c_id);
      console.log("Action Plan Sent:", actionPlan);

      // Close modal
      setShowModal(false);
      setSelectedComplaint(null);
      setActionPlan("");

      // Remove the approved complaint from UI
      setComplaints((prev) => prev.filter((c) => c.c_id !== c_id));

      
    } catch (error) {
      console.error("Error approving complaint:", error);
      alert("Failed to approve complaint. Please try again.");
    }
  };

  const handleDeclineClick = (complaint) => {
    // setSelectedComplaint(complaint);
    setSelectedRequest(complaint);
  };

  const declineRequest =  async (c_id)  => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/DeclineComplaint", {
        c_id, 
      });
      setSelectedRequest(null);
      setComplaints((prev) => prev.filter((c) => c.c_id !== c_id));

      
    } catch (error) {
      console.error("Error approving complaint:", error);
      alert("Failed to decline complaint. Please try again.");
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <h1 style={{marginTop: "10px"}}>Complaint Details</h1>

      {complaints.length > 0 ? (
        complaints.map((complaint) => (
          <div>
          <div key={complaint._id} className="bg-gray-100 p-10 m-10 rounded-lg shadow-md min-h-[250px] border border-blue-500">
            <div className="min-h-[40px] mb-6" style={{marginTop: "10px"}}>
              <h2 className="text-center text-2xl font-bold text-gray-800" style={{color: "rgb(101, 75, 75)"}}>{complaint.title}</h2>
            </div>

            <div className="grid grid-cols-[30%_60%] gap-8">
              <div className="space-y-6 p-6 min-h-[200px]">
                <div className="h-10"/>
                <p className="text-xl"><span className="font-bold">Name:</span> {complaint.userName}</p>
                <div className="h-2"/>
                <p className="text-xl"><span className="font-bold">ID:</span> {complaint.id}</p>
                <div className="h-2"/>
                {/* Approve Button */}
                <div className="mt-4 flex justify-center" style={{ gap: "16px", marginTop: "5px" }}>
                  <button 
                    onClick={() => handleApproveClick(complaint)}
                    className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleDeclineClick(complaint)}
                    className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
                  >
                    Decline
                  </button>
                </div>
              </div>
              <div>
                <div className="p-6 bg-white shadow rounded-lg min-h-[200px]" style={{padding: "10px", marginBottom: "10px"}}>
                  <p className="text-xl text-justify"><span className="font-bold">Description:</span> {complaint.description}</p> 
                </div>
                <div className="h-3"></div>
              </div>
            </div>
          </div>
          <div className="h-6"></div>
          </div>
        ))
      ) : (
        <p>No complaints available.</p>
      )}
      {/* Decline Complaint Modal with Blurred Background */}
      {selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-md">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center w-96" style={{ padding: "20px "}}>
            <h3 className="text-xl font-bold mb-4">Decline Request</h3>
            <p>Do you want to decline this request </p>
            <div className="mt-4 flex justify-center" style={{ gap: "16px", marginTop: "5px" }}>
                <button 
                onClick={() => declineRequest(selectedRequest.c_id)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 mx-2">
                Yes
                </button>
                <button 
                onClick={() => setSelectedRequest(null)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 mx-2">
                No
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Approval Modal with Blurred Background */}
      {showModal && selectedComplaint && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md">
          <div className="bg-white p-10 rounded-lg shadow-lg w-[600px] min-h-[300px] border border-gray-300" style={{padding: "15px"}}>
            <h2 className="text-2xl font-bold mb-4 text-center" style={{marginBottom: "5px"}}>Approval Action Plan</h2>
            <textarea
              className="w-full p-3 border border-gray-300 rounded text-lg min-h-[150px]"
              placeholder="Enter action plan details..."
              value={actionPlan}
              onChange={(e) => setActionPlan(e.target.value)}
            />
            <div className="flex justify-end mt-6" style={{gap: "10px", marginTop: "5px"}}>
              <button className="bg-gray-500 text-white px-6 py-3 rounded mr-3" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button 
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700" 
                onClick={() => handleConfirmApproval(selectedComplaint.c_id)} // Pass c_id
              >
                Confirm Approval
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentComplaints;
