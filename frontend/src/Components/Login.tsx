
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/Login.css'
import axios from "axios";
import { enqueueSnackbar } from "notistack";


const LoginSignUP = () => {
    const [action, setAction] = useState("Login");
    const [name, setName] = useState("")
    const [email,setEmail] = useState('')
    const [ password , setPassword] = useState('')
    const navigate = useNavigate()
    
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)  => {
        e.preventDefault()
        try{
            if (action == "Login") {
                const response = await axios.post("http://localhost:3000/api/auth/Login  ",
                    {email, password})
                console.log("login successful") 
                console.log("API Responsing:", response.data)
                console.log(response)
                localStorage.setItem("userName", response.data.user._name);
                enqueueSnackbar("Login successful", {variant: "success"})
                navigate("/student-dashboard")
            } else if (action == "Sign UP") {
                const res = await axios.post("http://localhost:3000/api/auth/Signup", {
                    name,
                    email,
                    password
                })
                enqueueSnackbar("Signup successful")
            }
     
       
        }catch(error) {
            console.log("login failed", error) 
        }
    }
  return (
    <div className="container-bg">
    <div className='container'>
        <div className="header">
            <div className="text">Taposhi Rabeya Hall</div>
            <div className="underline"></div>
        </div>
        <form onSubmit={handleSubmit} className="loginform">
        <div className="inputs">
            {action!=="Login" &&
            <div className="input">
                {/* <img src={user_icon} alt=""  /> */}
                <input 
                    type="text" placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>}
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



// function Login(){
//     return(
//         <p>Login</p>

//     )
// }

// export default Login