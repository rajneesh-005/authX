import roles from "../utils/roles.js";

const authorize = (requiredPermission) => {
    return (req,res,next) => {
        const userRole = req.user.role
        if(!userRole || !requiredPermission.every(perm => roles[userRole].includes(perm))){
            return res.status(403).json({message : "Route Protected"})
        }
        next()
    }
}

export default authorize 