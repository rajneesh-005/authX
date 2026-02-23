import jwt from "jsonwebtoken";

const authMiddleware = (req,res,next) => {
    //1. Reading authorization header
    const authHeader = req.headers.authorization
    console.log("Headers : ",req.headers)

    console.log("Auth Headers : ",authHeader)
    
    //2. Check if valid
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message : " Unautorized Access "})
    }

    const token = authHeader.split(' ')[1]

    console.log("Token ",token)
    const secret = process.env.JWT_SECRET

    try{
        const decoded = jwt.verify(token,secret)
        req.user = decoded;
        console.log("Decoded : ",decoded)
        next();
    }catch(err){
        console.log("Error : ",err.message)
        return res.status(401).json({message : "Cannot be decoded"})
    }
}


export {
    authMiddleware
}