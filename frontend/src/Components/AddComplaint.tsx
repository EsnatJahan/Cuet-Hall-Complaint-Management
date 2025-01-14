import React from "react";
import { useNavigate } from "react-router-dom";
function AddComplaint() {
  return (
    <div style={{ width: '80%', height: '100vh' }}>

      <h1>Add Complaint</h1>
      <form>
        <label>
          Title:
          <input type="text" placeholder="Enter complaint title" />
        </label>
        <br />
        <label>
          Description:
          <textarea placeholder="Enter complaint description" rows="4"></textarea>
        </label>
        <br />
        {/* <button type="submit" onClick={()=>{setAction("Login")}}>Submit</button> */}
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
  Submit
</button>
      </form>
    </div>
  );
};

export default AddComplaint;
