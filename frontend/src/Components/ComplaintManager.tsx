import React, {useEffect , useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import AddComplaint from "./AddComplaint.tsx";
import PreviousComplaints from "./PreviousComplaints.tsx";
import Profile from "./Profile.tsx";
import { Outlet } from "react-router-dom";
import "../Styles/StudentDashboard.css"; 

function ComplaintManager(){
  const navigate = useNavigate()
   const [userName, setUserName] = useState("");
  useEffect(() => {
      const storedUser = localStorage.getItem("userName");
      if (storedUser) {
        setUserName(storedUser);
      } else {
        setUserName("Student"); 
      }
    }, []);
    return(

        <div className="dashboard-container">
          {/* Sidebar */}
          <nav className="w-full h-10 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-10 px-8 flex justify-between items-center shadow-lg">
            <h2 className="text-2xl font-semibold tracking-wide">Manager Dashboard</h2>
            <div className="flex items-center space-x-6">
              <span className="text-lg font-medium">{userName}!</span>
              <button 
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition duration-200"
                onClick={() => {
                  localStorage.removeItem("userName");
                  localStorage.removeItem("userId");
                  localStorage.removeItem("userRole");
                  navigate("/home");            
                }}
              >
                Logout
              </button>
            </div>
          </nav>


          <aside className="sidebar h-full">
            <ul>
              <li>
                <Link to="student-complaint">Student Complaints</Link>
              </li>
              <li>
                <Link to="approved-complaints">Approved Complaints</Link>
              </li>
              <li>
                <Link to="previous-complaints">New Student Requests</Link>
              </li>
              <li>
                <Link to="profile">Profile</Link>
              </li>
              {/* <li>
                <div className="mt-auto mb-4 mx-auto " onClick={() => navigate("/home")}>Logout</div>
              </li> */}
            </ul>
          </aside>
  
          {/* Middle Content */}
          <main className="dashboard-content">
            <Outlet />
          </main>
        </div>
     
    );
}

export default ComplaintManager