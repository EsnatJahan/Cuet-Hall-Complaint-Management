import React, {useEffect , useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import AddComplaint from "./AddComplaint.tsx";
import PreviousComplaints from "./PreviousComplaints.tsx";
import Profile from "./Profile.tsx";
import SignUpRequests from "./SignUpRequests.tsx";
import ResolvedComplaints from "./ResolvedComplaints.tsx";
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
          <nav className="navbar">
            <h1 className="navbar-title">Manager Dashboard</h1>
            <div className="user-info">
              <span style={{paddingRight:"15px"}}>  {userName}!</span>
              <button className="logout-btn" onClick={() => {
                localStorage.removeItem("userName");
                localStorage.removeItem("userId");
                localStorage.removeItem("userRole");
                navigate("/home");            
              }}>
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
                <Link to="resolved-complaints">Resolved Complaints</Link>
              </li>
              <li>
                <Link to="sign-up-requests">New User Requests</Link>
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