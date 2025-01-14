
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/Login.css'
import axios from "axios";


const LoginSignUP = () => {
    const [action, setAction] = useState("Login");
    const [email,setEmail] = useState('')
    const [ password , setPassword] = useState('')
    const navigate = useNavigate()
    
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)  => {
        e.preventDefault()
        try{
            if (action == "Login") {
                const response = await axios.post("http://localhost:3000/api/auth/Login",
                    {email, password})
                console.log("login successful") 
                console.log(response)
                alert('Successful Log In');
                navigate("/student-dashboard")
            }
     
       
        }catch(error) {
            alert('Log In Failed');
            console.log("login failed", error) 
        }
    }
  return (
    <div className='container'>
        <div className="header">
            <div className="text">Tapshi Rabeya Hall</div>
            <div className="underline"></div>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="inputs">
            {action==="Login"?<div></div>:
            <div className="input">
                {/* <img src={user_icon} alt=""  /> */}
                <input type="text" placeholder="Name"/>
            </div>}
            <div className="input">
                {/* <img src={email_icon} alt="" className="" /> */}
                <input 
                    type="email" placeholder='Email ID'
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
  )
}

export default LoginSignUP



// function Login(){
//     return(
//         <p>Login</p>

//     )
// }

// export default Login