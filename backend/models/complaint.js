import mongoose from "mongoose";

const complaintScheme = new mongoose.Schema({
    //complainer: {type: [mongoose.Schema.Types.ObjectId], ref:"User", requried: true},
    userName: {type: String, required: true},
    id:{type: Number, required: true},
    c_id:{type: Number, required: true},
    title: {type: String, required: true},
    // manager: {type: [mongoose.Schema.Types.ObjectId], ref:"User", requried: true},
    manager: {type: String, required: true},
    description: {type: String, required: true},
    message: {type: String, default: "No action taken still" },
    done: {type: String, default: "false", enum: [ "true", "false"]},
    status: {type: String, required: true, enum: ["pending", "inprogress", "resolved"]},
    opinions: [
        {
            userName: { type: String, required: true },
            userId: { type: Number, required: true },
            opinion: { type: String, required: true },
        }
    ]
})

const complaintModel = mongoose.model("Complaint", complaintScheme)

export default complaintModel;
