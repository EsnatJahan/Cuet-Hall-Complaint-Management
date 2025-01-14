import React from "react";

function AddComplaint() {
  return (
    <div>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddComplaint;
