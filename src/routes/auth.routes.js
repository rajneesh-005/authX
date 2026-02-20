import { Router } from "express";
import authController from "../controllers/auth.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/auth.rbac.js";

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile',authMiddleware,(req,res)=>{
    res.json({
        message : "Access Granted",
        user : req.user
    })
});
router.get('/admin',authMiddleware,authorize(['admin']),(req,res)=>{
    res.json({
        message : "Admin Access",
        email : req.user.email
    })
})
router.get('/user',authMiddleware,authorize(['user']),(req,res)=>{
    res.json({
        message : "User Access",
        email : req.user.email
    })
})
router.post('/refresh',authController.refresh);
router.post('/logout',authController.logout)

export default router;