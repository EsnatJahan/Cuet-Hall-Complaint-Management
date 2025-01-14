//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Header from './Components/Header'
import Login from './Components/Login'

import Home from './Components/Home';

import AdminDashboard from './Components/AdminDashboard'
import AddComplaint from './Components/AddComplaint';
import PreviousComplaints from './Components/PreviousComplaints';
import Profile from './Components/Profile';


function App() {
  //const [count, setCount] = useState(0)

  return (
    <BrowserRouter> 
      <Routes>
        <Route path='/' element={<Navigate to = "/home" />}></Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/home" element={<Home />} ></Route>
        <Route path="/admin-dashboard" element={<AdminDashboard />} >
          <Route index element={<Profile />} />
          <Route path="add-complaint" element={<AddComplaint />} />
          <Route path="previous-complaints" element={<PreviousComplaints />} />
          <Route path="profile" element={<Profile />} />
        </Route>

      </Routes>
    </BrowserRouter>
   // <Home/>
    
  )
}

export default App
