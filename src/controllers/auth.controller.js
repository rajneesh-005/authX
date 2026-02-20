import User from "../models/user.model.js";
import authService from "../services/auth.services.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const register = async (req,res) => {
    try{
        const {email , password } = req.body;

        const result = await authService.registerUser(email , password);

        res.status(201).json(result)
    }catch(err){
        res.status(400).json({message : err.message})
    }
}



const login = async (req,res) =>{
    try{
        const {email , password} = req.body;

        const {accessToken,refreshToken} = await authService.loginUser(email,password);

        res
        .status(200)
        .cookie("accessToken",accessToken,{
            httpOnly : true,
            secure : false,
            sameSite : "lax",
            maxAge : 15*60*1000
        })
        .cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge : 7*24*60*60*1000
        })
        .json({message : "Login successfull"});

    }catch(err){
        res.status(400).json({message : err.message})
    }
}

const refresh = async (req,res) => {
    const token = req.cookies.refreshToken

    if(!token){
        return res.status(401).json({message : "No Refresh Token"})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_REFRESH_SECRET)

        const user = await User.findById(decoded.id)

        const isValid = await bcrypt.compare(token,user.refreshToken)

        if(!user || !isValid){
            return res.status(401).json({message : "Invalid Refresh Token"})
        }
        
        const newAccessToken = jwt.sign({id:user._id},process.env.JWT_SECRET,{"expiresIn":"15m"})

        res
        .cookie("accessToken",newAccessToken,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:15*60*1000
        })
        .json("Access Token Refreshed")
    }catch(err){
        res.status(401).json({message : "Invalid Refresh Token"})
    }
}

const logout = async (req,res)=>{
    const token = req.cookies.refreshToken

    if(!token){
        return res.status(401).json({message:"No refresh token"})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_REFRESH_SECRET)

        await User.findByIdAndUpdate(decoded.id,{refreshToken:null}) 

        res
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json({message : "User Logged Out"})
    }catch(err){
        res
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json({message : "Logged Out"})
    }
}

export default {
    register, 
    login,
    refresh,
    logout
}