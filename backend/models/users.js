import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    id: {type: Number , required: true},
    name: {type: String , required: true},
    email: {type: String , required: true},
    password: {type: String , required: true},
    active: {type: Boolean, default: false},
    role: {type: String , required: true ,  enum:["admin", "student", "managers"]},
})

const userModel = mongoose.model("User", userScheme)

export default userModel;
