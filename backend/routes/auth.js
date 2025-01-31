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
        const { name, userId, email, password } = req.body;
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            userId,
            email,
            password: hashedPassword,
            role: "student",
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
    console.log("entered")
    try{
        const {userName,userId,title,manager,description,status} = req.body;
        if (!req.body.userName || !req.body.title || !req.body.manager || !req.body.description) {
            return res.status(400).json({ success: false, error: "All fields are required" });
          }
        console.log("All field found")
        const newComplaint = new Complaint ({
            userName,
            title,
            manager,
            description,
            status,
            id: userId,
        });
        await newComplaint.save();
        res.status(200).json({ message: "Complaint submitted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
        console.log(error)
    }
    
})

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
      const complaints = await Complaint.find({manager:role});
      console.log(role)
      if (!complaints.length) {
        console.log("No complaints")
        return res.status(404).json({ success: false, message: "No complaints found for this user." });
        
      }
      console.log("Complaints found:", complaints);
      res.status(200).json(complaints);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
});


export default router