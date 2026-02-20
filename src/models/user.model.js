
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    refreshToken:{
        type: String,
        
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
})

const User = mongoose.model('user',userSchema)

export default User