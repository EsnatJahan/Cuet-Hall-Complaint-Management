
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/Login.css'
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const LoginSignUP = () => {
    const [action, setAction] = useState("Login");
    const [name, setName] = useState("")
    const [email,setEmail] = useState('')   
    const [role, setRole] = useState("")
    const [id,setId] = useState('')

    const [ password , setPassword] = useState('')
    const navigate = useNavigate()
    
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)  => {
        e.preventDefault()
        try{
            if (action == "Login") {
                const response = await axios.post("http://localhost:3000/api/auth/Login  ",
                    {email, password})
                console.log("login successful") 
                localStorage.setItem("userName", response.data.user._name);
                localStorage.setItem("userId", response.data.user._id);
                localStorage.setItem("userRole", response.data.user._role);
                if(response.data.user._active == false) {
                    enqueueSnackbar("Sign Up request in pending")
                }else if(response.data.user._role === "student") {
                    enqueueSnackbar("Login successful", {variant: "success"})
                    navigate("/student-dashboard")
                }else {
                    enqueueSnackbar("Login successful", {variant: "success"})
                    navigate("/manager-dashboard")
                }
                
            } else if (action == "Sign UP") {
                const res = await axios.post("http://localhost:3000/api/auth/Signup", {
                    name,
                    email,
                    password,
                    role,
                    id
                })
                enqueueSnackbar("Request for Signup Successful")
            }
     
       
        }catch(error) {
            console.log("login failed", error) 
        }
    }
  return (
    <div className="container-bg">
    <div className='container'>
        <div className="header">
            <div className="text">Tapashi Rabeya Hall</div>
            <div className="underline"></div>
        </div>
        <form onSubmit={handleSubmit} className="loginform">
        <div className="inputs">
            {action!=="Login" &&
            <div>
                <div className="input">
                {/* <img src={user_icon} alt=""  /> */}
                    <input 
                        type="text" placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />            
                </div>
                <div className="h-5" />
                <div className="input">

                {/* <img src={user_icon} alt=""  /> */}
                    <input 
                        type="text" placeholder="Id"
                        onChange={(e) => setId(e.target.value)}
                    />            
                </div>
                <div className="h-5" />
                <div className="input">
                {/* <img src={user_icon} alt=""  /> */}
                    <input 
                        type="text" placeholder="Role"
                        onChange={(e) => setRole(e.target.value)}
                    />            
                </div>

            </div>
            
            }
            <div className="input">
                {/* <img src={email_icon} alt="" className="" /> */}
                <input 
                    type="email" placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="input">
                {/* <img src={password_icon} alt="" /> */}
                <input 
                    type="password" placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
        </div>
        {action==="Sign UP"?<div></div>: <div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
        <div className="submit-container">
            {action === "Login" ? (
                <>
                    <div className="submit gray" onClick={()=>{setAction("Sign UP")}}>Sign UP</div>
                    <input type="submit" className="submit" value="Login" />
                </>
            ): (
                <>
                    <input type="submit" className="submit" value="Sign UP" />
                    <div className="submit gray" onClick={()=>{setAction("Login")}}>Login</div>
                </>
            )}
        </div>
        </form>
      
    </div>
    </div>
  )
}

export default LoginSignUP