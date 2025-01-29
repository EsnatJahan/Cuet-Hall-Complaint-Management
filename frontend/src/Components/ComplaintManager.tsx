import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import AddComplaint from "./AddComplaint.tsx";
import PreviousComplaints from "./PreviousComplaints.tsx";
import Profile from "./Profile.tsx";
import { Outlet } from "react-router-dom";
import "../Styles/StudentDashboard.css"; 

function ComplaintManager(){
  const navigate = useNavigate()
    return(

        <div className="dashboard-container">
          {/* Sidebar */}
          <aside className="sidebar h-full">
            <h2>Dashboard</h2>
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
              <li>
                <div className="mt-auto mb-4 mx-auto " onClick={() => navigate("/home")}>Logout</div>
              </li>
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