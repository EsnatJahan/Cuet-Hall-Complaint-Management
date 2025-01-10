import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    name: {type: String , required: true},
    email: {type: String , required: true},
    password: {type: String , required: true},
    role: {type: String , required: true ,  enum:["admin", "student", "managers"]},
    description: String
})

const userModel = mongoose.model("User", userScheme)

export default userModel;
