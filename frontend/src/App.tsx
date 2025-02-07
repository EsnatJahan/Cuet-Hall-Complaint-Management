//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Header from './Components/Header'
import Login from './Components/Login'

import Home from './Components/Home';

// import AdminDashboard from './Components/StudentDashboard'
import AddComplaint from './Components/AddComplaint';
import PreviousComplaints from './Components/PreviousComplaints';
import Profile from './Components/Profile';
import StudentDashboard from './Components/StudentDashboard';
import ComplaintManager from './Components/ComplaintManager';
import StudentComplaints from './Components/SeeComplaintList';
import ApprovedComplaints from './Components/ApprovedComplaint';
import WorkInProgress from './Components/WorkInProgress';
import SignUpRequests from './Components/SignUpRequests';
import { SnackbarProvider } from 'notistack';


function App() {
  //const [count, setCount] = useState(0)

  return (
    <SnackbarProvider autoHideDuration={2000}>
  
    <BrowserRouter>   
      <Routes>
        <Route path='/' element={<Navigate to = "/home" />}></Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/home" element={<Home />} ></Route>
        {/* <Route path="/manager-dashboard" element={<ComplaintManager />} >  */}
        <Route path="/student-dashboard" element={<StudentDashboard />} >
          <Route index element={<AddComplaint />} />
          <Route path="add-complaint" element={<AddComplaint />} />
          <Route path="in-progress" element={<WorkInProgress/>} />
          <Route path="previous-complaints" element={<PreviousComplaints />} />
          <Route path="profile" element={<Profile />} />
         
        </Route>
        <Route path="/manager-dashboard" element={<ComplaintManager />} >
          <Route index element={<StudentComplaints  />} />
          <Route path="student-complaint" element={<StudentComplaints />} />
          <Route path="approved-complaints" element={<ApprovedComplaints />} />
          <Route path="sign-up-requests" element={<SignUpRequests/>} />
          <Route path="profile" element={<Profile />} />
         
        </Route>
        

      </Routes>
    </BrowserRouter>
   </SnackbarProvider>
    
  )
}

export default App
