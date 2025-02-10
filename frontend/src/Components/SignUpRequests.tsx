import React, { useEffect, useState } from "react";
import axios from "axios";

interface SignUpRequest {
  _id: string;
  id: number;
  name: string;
  email: string;
  password: string;
  active: boolean;
  role: string;
  __v: number;
}

function SignUpRequests() {
  const [requests, setRequests] = useState<SignUpRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<SignUpRequest | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/signup-requests");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests", error);
    }
  };

  const approveRequest = async (id: string) => {
    try {
      await axios.put(`http://localhost:3000/api/auth/update-signup-requests/${id}`, { active: true });
      setRequests((prevRequests) => prevRequests.filter((req) => req._id !== id));
      setSelectedRequest(null);
    } catch (error) {
      console.error("Error approving request", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4" style={{ marginTop: "10px" }}>Sign Up Requests</h2>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden" style={{ marginTop: "20px" }}>
        <thead className="bg-gray-300 text-black">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Active</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id} className="border-b">
              <td className="p-3">{request.id}</td>
              <td className="p-3">{request.name}</td>
              <td className="p-3">{request.email}</td>
              <td className="p-3">{request.role}</td>
              <td className="p-3">{request.active ? "Yes" : "No"}</td>
              <td className="p-3">
                {!request.active && (
                  <button 
                    onClick={() => setSelectedRequest(request)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200">
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Approval Confirmation */}
      {selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-md">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center w-96" style={{ padding: "20px "}}>
            <h3 className="text-xl font-bold mb-4">Approve Request</h3>
            <p>Do you want to approve this request for <strong>{selectedRequest.name}</strong>?</p>
            <div className="mt-4 flex justify-center" style={{ gap: "16px", marginTop: "5px" }}>
                <button 
                onClick={() => approveRequest(selectedRequest._id)}
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
    </div>
  );
}

export default SignUpRequests;
