import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/SeeComplaint.css"; 

function StudentComplaints() {
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
                  placeholder="Esnat Jahan"
                  style={{ width: "100%" }}
                /> */}
                <p>Esnat Jahan Ena</p>
              </td>
              <td style={{ }}>
                <label>Title:</label>
              </td>
              <td style={{width:"200px"}}>
                {/* <input
                  type="text"
                  placeholder="Poor Wi-Fi Connection"
                  style={{ width: "100%", height:"100px", padding: "2px" }}
                /> */}
                <p>Poor Wifi Connection in hall for a long time</p>
              </td>
            
            
              {/* <td style={{ padding: "10px" }}> */}
              <td>
                <label>Description:</label>
              </td>
              <td style={{ padding: "10px" }}>
                <p>
                <textarea
                  placeholder="Many students are facing frequent Wi-Fi disruptions in the hall, making it difficult to attend online classes, complete assignments, and communicate effectively. The connection is either too slow or disconnects frequently, especially during peak hours. Despite previous complaints, the issue remains unresolved. We request the hall management to take immediate action to improve the internet service for uninterrupted academic and personal use."
                  rows="4"
                  style={{ width: "100%", height: "150px",  padding: "8px" }}
                ></textarea>
                </p>
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center", padding: "20px" }}>
                <button
                  type="submit"
                  onClick={() => {
                    setAction("Login");
                  }}
                  style={{
                    backgroundColor: "rgb(160, 131, 109)",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Approve
                </button>
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
              <td colSpan={2} style={{ textAlign: "center", padding: "20px" }}>
                <button
                  type="submit"
                  onClick={() => {
                    setAction("Login");
                  }}
                  style={{
                    backgroundColor: "rgb(160, 131, 109)",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Approve
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      </div>


    </div>
  );
}

export default StudentComplaints;
