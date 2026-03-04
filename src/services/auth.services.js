/***
 * Validate Input - Check for Duplicate 
 * Hash Password 
 * Save User into database 
 * return saved data
 */

import User from '../models/user.model.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const validate = ({email , password}) =>{
    if(!email || !password){
        throw new Error("Email and Password are required");
    }

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailReg.test(email)){
        throw new Error("Invalid Email Format")
    }

    if(password.length < 6){
        throw new Error("Password should be minimum 6 characters long ")
    }
}

async function registerUser(email , password){
    validate({email , password})

    //Check for Duplicate User
    const existUser = await User.findOne({ email });
    if(existUser){
        throw new Error("User Already Exists")
    }

    //Hash Password 
    const hashedPassword = await bcrypt.hash(password,10);

    //Create User 
    const newUser = await User.create({
        email,
        password:hashedPassword,
    })

    //return 
    return { id : newUser._id , email : newUser.email ,role:newUser.role, message : "Registered"}
    
}

async function loginUser(email , password){
    validate({email , password})
    const userExists = await User.findOne({email})
    if(!userExists){
        throw new Error("User doesn't exists ")
    }

    const isMatch = await bcrypt.compare(password,userExists.password)

    if(!isMatch){
        throw new Error("Incorrect Password")
    }
    const access_secret = process.env.JWT_SECRET
    const accessToken = jwt.sign({id:userExists._id, role:userExists.role},access_secret,{"expiresIn" :  "1h"})

    const refresh_secret = process.env.JWT_REFRESH_SECRET
    const refreshToken = jwt.sign({id:userExists._id, role:userExists.role},refresh_secret,{"expiresIn":"7d"})


    const hashedRefreshedToken = await bcrypt.hash(refreshToken,12)
    userExists.refreshToken = hashedRefreshedToken
    await userExists.save()
    return {
        accessToken,
        refreshToken
    }
}
export default {
    registerUser,
    loginUser
}