import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

function AddComplaint() {
  const [title, setTitle] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [description, setDescription] = useState("");
  const [userName, setUserName] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    if (storedUser) {
      setUserName(storedUser);
    } else {
      setUserName(""); // Empty string to indicate missing user
    }
  }, []);

  const managers = ["Provost", "Hall Manager", "Dining Manager"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!userName) {
      enqueueSnackbar("User is not logged in!", { variant: "error" });
      return;
    }
    if (!title.trim() || !selectedManager || !description.trim()) {
      enqueueSnackbar("Please fill in all fields!", { variant: "error" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/Complaint", {
        userName,
        title,
        manager: selectedManager, // Ensure correct key
        description,
        status: "pending"
      });

      console.log("Submitted Complaint:", { userName, title, selectedManager, description , status });

      if (response.status === 200) {
        enqueueSnackbar("Complaint submitted successfully!", { variant: "success" });
        navigate("/dashboard"); // Navigate to dashboard
      } else {
        enqueueSnackbar("Failed to submit complaint. Please try again.", { variant: "error" });
      }
    } catch (error) {
      console.log("Submitted Complaint:", { userName, description ,status });
      console.error("Complaint submission failed:", error);
      enqueueSnackbar("Error submitting complaint. Please check your connection.", { variant: "error" });
    }
  };

  return (
    <div style={{ width: "80%", height: "100vh" }}>
      <h1>Add Complaint</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            placeholder="Enter complaint title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Complaint Manager:
          <select
            value={selectedManager}
            onChange={(e) => setSelectedManager(e.target.value)}
          >
            <option value="" disabled>
              Select a manager
            </option>
            {managers.map((manager, index) => (
              <option key={index} value={manager}>
                {manager}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Description:
          <textarea
            placeholder="Enter complaint description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <br />
        <button
          type="submit"
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
}

export default AddComplaint;
