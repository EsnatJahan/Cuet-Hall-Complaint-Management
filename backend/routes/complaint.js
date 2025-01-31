import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/users.js'
import Complaint from '../models/complaint.js'

const router = express.Router()
router.post('/Complaint' , async(req,res) => {
    console.log("entered")
    try{
        const {userName,title,manager,description,status} = req.body;
        if (!req.body.userName || !req.body.title || !req.body.manager || !req.body.description) {
            return res.status(400).json({ success: false, error: "All fields are required" });
          }
        console.log("All field foun")
        const newComplaint = new Complaint ({
            userName,
            title,
            manager,
            description,
            status
        });
        await newComplaint.save();
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
        console.log(error)
    }
    
});
export default router