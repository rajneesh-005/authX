import { Router } from "express";
import taskController from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/',authMiddleware,taskController.createTask);
router.get('/',authMiddleware,taskController.getAllTask);
router.get('/:id',authMiddleware,taskController.getTaskByID);
router.put('/:id',authMiddleware,taskController.updateTask);
router.delete('/:id',authMiddleware,taskController.deleteTaskByID);

export default router