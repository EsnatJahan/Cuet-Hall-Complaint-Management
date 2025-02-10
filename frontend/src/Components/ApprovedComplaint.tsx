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

  const handleApproveClick = async (id: string) => {
    try{
      await axios.put(`http://localhost:3000/api/auth/mark-complaint/${id}`)
      setComplaints((prevComplaints)=>
        prevComplaints.filter((req)=>req._id !== id)
    )
      setSelectedComplaint(null)
    }catch(error){
      console.error("Error in marking complaint as done", error)
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <h1 style={{ marginTop: "10px" }}>Approved Complaints</h1>

      {complaints.length > 0 ? (
        complaints.map((complaint) => (
          <div>
          <div key={complaint._id} className="bg-gray-100 p-10 m-10 rounded-lg shadow-md min-h-[220px] border border-blue-500">
            <div className="h-2"/>
            <div className="mb-6">
              <h2 className="text-center text-2xl font-bold text-gray-800">{complaint.title}</h2>
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
                      <td className="border border-gray-300 px-4 py-2 text-justify">{opinion.opinion}</td>
                    </tr>
                ))}
              </tbody>
            </table>
            <div className="h-5"/>
            <div className="mt-2 flex justify-center">
              <button 
                onClick={() => setSelectedComplaint(complaint)}
                className="bg-green-600 text-white px-12 py-3 rounded hover:bg-green-700"
              >
                Mark as Done
              </button>
            </div>     
            <div className="h-5"/>     
          </div> 
          <div className="h-6" /> 
          </div>        
        ))
      ) : (
        <p>No complaints available.</p>
      )}

      {/* Approval Modal with Blurred Background */}
      {selectedComplaint && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-md">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center w-96" style={{ padding: "20px "}}>
          <h3 className="text-xl font-bold mb-4">Mark Complaints</h3>
          <p>Do you want to mark this complaint as <strong>Done?</strong></p>
          <div className="mt-4 flex justify-center" style={{ gap: "16px", marginTop: "5px" }}>
            <button
            onClick={()=> handleApproveClick(selectedComplaint._id)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 mx-2">
              Yes
            </button>
            <button
            onClick={()=> setSelectedComplaint(null)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 mx-2">
              No
            </button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentComplaints;
