import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import AddComplaint from "./AddComplaint.tsx";
import PreviousComplaints from "./PreviousComplaints.tsx";
import Profile from "./Profile.tsx";
import { Outlet } from "react-router-dom";
import "../Styles/StudentDashboard.css"; 

function StudentDashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  // Retrieve user data from localStorage or API
  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    if (storedUser) {
      setUserName(storedUser);
    } else {
      setUserName("Student"); 
    }
  }, []);

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="navbar-title">Student Dashboard</h2>
        <div className="user-info">
          <span style={{paddingRight:"15px"}}>  {userName}!</span>
          <button className="logout-btn" onClick={() => {
            localStorage.removeItem("userName"); // Clear stored user info
            navigate("/home");
            
          }}>
            Logout
          </button>
        </div>
      </nav>

      <div className="content-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            <li>
              <Link to="add-complaint">Add Complaints</Link>
            </li>
            <li>
              <Link to="previous-complaints">My Complaints</Link>
            </li>
            <li>
              <Link to="in-progress">Work In Progress</Link>
            </li>
            <li>
              <Link to="profile">Profile</Link>
            </li>
          </ul>
        </aside>

        {/* Middle Content */}
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;
