import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddComplaint from "./AddComplaint.tsx";
import PreviousComplaints from "./PreviousComplaints.tsx";
import Profile from "./Profile.tsx";
import { Outlet } from "react-router-dom";
import "../Styles/StudentDashboard.css"; 

function StudentDashboard(){
    return(

        <div className="dashboard-container">
          {/* Sidebar */}
          <aside className="sidebar">
            <h2>Dashboard</h2>
            <ul>
              <li>
                <Link to="add-complaint">Add Complaints</Link>
              </li>
              <li>
                <Link to="previous-complaints">Show Previous Complaints</Link>
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
     
    );
}

export default StudentDashboard