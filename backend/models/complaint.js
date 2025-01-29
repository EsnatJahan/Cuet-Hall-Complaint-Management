import mongoose from "mongoose";

const complaintScheme = new mongoose.Schema({
    complainer: {type: [mongoose.Schema.Types.ObjectId], ref:"User", requried: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    manager: {type: [mongoose.Schema.Types.ObjectId], ref:"User", requried: true},
    status: {type: String, required: true, enum: ["pending", "inprogress", "resolved"]},
})

const complaintModel = mongoose.model("Complaint", complaintScheme)

export default complaintModel;
