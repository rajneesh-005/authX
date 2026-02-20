import jwt from "jsonwebtoken";

const authMiddleware = (req,res,next) => {
    //1. Reading authorization header
    const token = req.cookies.accessToken
    
    //2. Check if valid
    if(!token){
        return res.status(401).json({message : " Unautorized Access "})
    }

    const secret = process.env.JWT_SECRET

    try{
        const decoded = jwt.verify(token,secret)
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({message : "Cannot be decoded"})
    }
}


export {
    authMiddleware
}