import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/users.js'
import Complaint from '../models/complaint.js'
import {login} from '../controllers/authController.js'

const router = express.Router()

router.post('/Login',login)
router.post('/Signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
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
    
})


export default router