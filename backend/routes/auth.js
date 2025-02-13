import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from '../models/users.js'
import Complaint from '../models/complaint.js'
import {login} from '../controllers/authController.js'

const router = express.Router()

router.post('/Login',login)
router.post('/Signup', async (req, res) => {
    try {
        const { name, id, role, email, password } = req.body;
        console.log()
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            id,
            email,
            password,
            role,
            active: false
        });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
        console.log(error)
    }
});


router.post('/Complaint' , async(req,res) => {
    try{
        const {userName,userId,title,manager,description,status} = req.body;
        if (!req.body.userName || !req.body.title || !req.body.manager || !req.body.description) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }
        const complaints = await Complaint.find()
        let c_id = complaints.length > 0 ? Math.max(...complaints.map(c => c.c_id)) + 1 : 1;
        console.log("All field found")
        const newComplaint = new Complaint ({
            userName,
            title,
            manager,
            description,
            status,
            id: userId,
            c_id,
            opinions: [
              {
                  userName: userName,  // Default opinion added
                  userId: userId,
                  opinion: description
              }
          ]
        });
        await newComplaint.save();
        res.status(200).json({ message: "Complaint submitted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
        console.log(error)
    }
    
})

router.get("/signup-requests", async (req, res) => {
  try {
    const requests = await User.find({ active: false });
    return res.json(requests);
  } catch (error) {
    console.error("Error fetching sign-up requests:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/update-signup-requests/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.active = true;
    await user.save();

    return res.json({ message: "User approved successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/PrevComplaints/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      console.log("Fetching complaints for user ID:", userId);

      const complaints = await Complaint.find({ id: userId});
  
      if (!complaints.length) {
        return res.status(404).json({ success: false, message: "No complaints found for this user." });
      }
      console.log("Complaints found:", complaints);
      res.status(200).json(complaints);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
});

router.get("/SeeComplaints/:role", async (req, res) => {
    try {
      const role = req.params.role;
      const complaints = await Complaint.find({manager:role, status: 'pending' });
      console.log(role)
      if (!complaints.length) {
        console.log("No complaints")
        return res.status(404).json({ success: false, message: "No complaints found for this user." });
        
      }
      res.status(200).json(complaints);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
});

router.post('/ApproveComplaint', async (req, res) => {
  try {
      const { c_id , actionPlan } = req.body;
 
      const updatedComplaint = await Complaint.findOneAndUpdate(
        { c_id },  
        { message: actionPlan, status: "inprogress" },
        { new: true } 
      );
      res.status(200).json({ message: "Complaint submitted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
      console.log(error)
  }
});

router.post('/DeclineComplaint', async (req, res) => {
  try {
      const { c_id} = req.body;
      console.log("hello")
      const updatedComplaint = await Complaint.findOneAndUpdate(
        { c_id },  
        { status: "declined" },
        { new: true } 
      );
      res.status(200).json({ message: "Complaint submitted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
      console.log(error)
  }
});

router.get("/Approved/:role", async (req, res) => {
  try {
    const role = req.params.role;
    if(role==="student") {
       const complaints = await Complaint.find({status: 'inprogress' });
       console.log(complaints)
       res.status(200).json(complaints);
    }else {
      const complaints = await Complaint.find({manager:role, status: 'inprogress' });
      if (!complaints.length) {
        console.log("No complaints")
        return res.status(404).json({ success: false, message: "No complaints found for this user." });
        
      }
      res.status(200).json(complaints);
    } 
    
  }catch (error) {
      console.error("Error fetching complaints:", error);
      res.status(500).json({ success: false, error: "Server error" });

  }
});

router.post('/AddOpinion', async (req, res) => {
  try {
      const { c_id , actionPlan , userName , userId } = req.body;
      const complaint = await Complaint.findOne({ c_id });
      console.log(c_id)
      if (!complaint) {
          return res.status(404).json({ success: false, message: "Complaint not found" });
      }
      complaint.opinions.push({
        userName: userName,
        userId: userId,
        opinion: actionPlan
      });
      await complaint.save();

      res.status(200).json({ success: true, message: "Opinion added successfully", complaint });
  } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
      console.log(error)
  }
});

router.put('/mark-complaint/:id', async(req, res) =>{
  try{
    const {id} = req.params;
    const complaint = await Complaint.findById(id)
    if(!complaint){
      return res.status(404).json({message: "Complaint not found"})
    }
    complaint.status = "resolved"
    complaint.done = new Date()
    await complaint.save()
    return res.json({message: "Complaint is marked as done successfully", complaint})
  }catch(error){
    console.error("Error marking complaint as done", error)
    res.status(500).json({message: "Error in marking complaint as done"})
  }
});

router.get("/resolved-complaints", async (req, res) =>{
  try{
    const complaints = await Complaint.find({ status: "resolved" })
    res.status(200).json(complaints)
  }catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
})

export default router