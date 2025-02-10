import React, { useEffect, useState } from "react";
import axios from "axios";

interface Complaint {
    _id: string;
  userName: string;
  id: number;
  c_id: number;
  title: string;
  manager: string;
  description: string;
  message: string;
  done: Date;
  status: "pending" | "resolved" | "inprogress";
  opinions: string[];
}

function ResolvedComplaints() {
    const [complaints, setComplaints] = useState<Complaint[]>([])
    const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)

    useEffect(()=>{
        fetchComplaints()
    }, [])

    const fetchComplaints = async () => {
        try{
            const response = await axios.get("http://localhost:3000/api/auth/resolved-complaints")
            setComplaints(response.data)
        }catch (error) {
            console.error("Error fetching requests", error);
          }
    }


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
          <h2 className="text-2xl font-bold mb-4" style={{ marginTop: "10px" }}>Sign Up Requests</h2>
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden" style={{ marginTop: "20px" }}>
            <thead className="bg-gray-300 text-black">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Completion Date</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint._id} className="border-b">
                  <td className="p-3">{complaint.title}</td>
                  <td className="p-3">{new Date(complaint.done).toLocaleDateString("en-GB")}</td>
                  <td className="p-3">
                    {(
                      <button 
                        onClick={() => setSelectedComplaint(complaint)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200">
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    
          {/* Modal for Approval Confirmation */}
          {selectedComplaint && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-md"
            onClick={() => setSelectedComplaint(null)}>
              <div className="bg-white p-8 rounded-lg shadow-lg text-center w-96" style={{ padding: "20px "}}
              onClick={(e) => e.stopPropagation()}>
                <h3 className="text-xl font-bold mb-4">Description</h3>
                <div className="p-4 rounded-md text-gray-700"                                                            
                style={{
                border: "1px solid gold",
                borderRadius: "10px",
                padding: "15px",
                backgroundColor: "#fffbe6",
                fontSize: "16px",
                fontWeight: "500",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}>
                {selectedComplaint.description}
                </div>
              </div>
            </div>
          )}
        </div>
      );
}

export default ResolvedComplaints