import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/SeeComplaint.css"; 

function ApprovedComplaints() {
  return (
    <div style={{ width: "80%", height: "100vh" }}>
      <h1> Complaint Details</h1>
      <div  style={{padding:"20px"}}>
      <form style={{width:"100%"}}> 
        <table>
          <tbody>
            <tr>
              <td style={{ }}>
                <label>Student Name:</label>
              </td>
              <td style={{width:"150px" }}>
                {/* <input
                  type="text"
                  placeholder="Trayee Das"
                  style={{ width: "100%" }}
                /> */}
                <p>Trayee Das</p>
              </td>
              <td style={{ }}>
                <label>Title:</label>
              </td>
              <td style={{width:"200px"}}>
                {/* <input
                  type="text"
                  placeholder="Water Problem"
                  style={{ width: "100%", height:"100px", padding: "2px" }}
                /> */}
                <p>Water Problem</p>
              </td>
            
            
              {/* <td style={{ padding: "10px" }}> */}
              <td>
                <label>Description:</label>
              </td>
              <td style={{ padding: "10px" }}>
                <textarea
                  placeholder="Many students are facing frequent mineral water disruptions in the hall, causing serious health issue."
                  rows="4"
                  style={{ width: "100%", height: "150px",  padding: "8px" }}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ color:"blue",  textAlign: "center", padding: "10px" }}>
                Deadline: 21/2/2025
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      </div>
      <div style={{padding:"20px"}}>
      <form> 
        <table>
          <tbody>
          <tr>
              <td style={{ }}>
                <label>Student Name:</label>
              </td>
              <td style={{width:"150px" }}>
                {/* <input
                  type="text"
                  placeholder="Arupa Barua"
                  style={{ width: "100%" }}
                /> */}
                <p >Arupa Barua </p>
              </td>
              <td style={{ }}>
                <label>Title:</label>
              </td>
              <td style={{width:"200px"}}>
                {/* <input
                  type="text"
                  placeholder="Dining Issue"
                  style={{ width: "100%", height:"100px", padding: "2px" }}
                /> */}
                <p> Dining Issues</p>
              </td>

              {/* <td style={{ padding: "10px" }}> */}
              <td>
                <label>Description:</label>
              </td>
              <td style={{ padding: "10px" }}>
              
                <textarea
                  placeholder="Dining meal is not nutrisious . Cost of food item is too much in canteen."
                  rows="4"
                  style={{ width: "100%", height: "150px",  padding: "8px" }}
                ></textarea>
                
              </td>
            </tr>
            <tr>
              
              <td colSpan={2} style={{ color:"blue",  textAlign: "center", padding: "10px" }}>
                Deadline: 22/2/2025
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      </div>


    </div>
  );
}

export default ApprovedComplaints;
