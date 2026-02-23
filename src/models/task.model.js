
import mongoose from "mongoose";

const resource = new mongoose.Schema({
    ownerID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
},{timestamps:true})

const task = mongoose.model('task',resource)

export default task

