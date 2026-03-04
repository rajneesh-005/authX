import taskService from '../services/task.services.js'


const createTask = async(req,res) => {
    try{
        const newTask = await taskService.Create({
            userId:req.user.id,
            title:req.body.title,
            description:req.body.description
        });

        res.status(201).json(newTask)
    }catch(err){
        res.status(400).json({message : err.message})
    }
}
const getAllTask = async(req,res) => {
    try{
        const userId = req.user.id
        const role = req.user.role
        const result = await taskService.GetAll({userId,role})
        res.status(200).json(result)
    }catch(err){
        res.status(400).json({message : err.message})
    }
}
//userid,taskid,role
const getTaskByID = async(req,res)=> {
    try{
        const userId = req.user.id
        const taskId = req.params.id
        const role = req.user.role
        const result = await taskService.GetTask({userId,taskId,role})
        if(!result){
            return res.status(404).json({message : "Task Not Found"})
        }
        res.status(200).json(result)
    }catch(err){
        res.status(400).json({message : err.message})
    }
}
//userId,taskId,title,description
const updateTask = async(req,res) => {
    try{
        const userId = req.user.id
        const taskId = req.params.id
        const title = req.body.title
        const description = req.body.description
        const role = req.user.role
        const result = await taskService.UpdateTask({userId,taskId,title,description,role})
        if(!result){
            return res.status(404).json({message : "Task To Be Updated Not Found"})
        }
        res.status(200).json({message : "Updated Task"})
    }catch(err){
        res.status(400).json({message : err.message})
    }
}
//taskId,userId,role
const deleteTaskByID = async(req,res)=>{
    try{
        const taskId = req.params.id
        const userId = req.user.id
        const role = req.user.role
        const result = await taskService.Delete({taskId,userId,role})
        if(!result){
            return res.status(404).json({message : "Task needed to be deleted does not exists"})
        }
        res.status(201).json(result)

    }catch(err){

        res.status(400).json({message : err.message})
    }
}

export default {
    createTask,
    getAllTask,
    getTaskByID,
    updateTask,
    deleteTaskByID
}