import Task from '../models/task.model.js'

async function Create({userId,title,description}){
    const newTask = await Task.create({
        ownerID:userId,
        title,
        description,
    })

    return newTask
}
async function GetAll({userId,role}) {
    if(role=='admin'){
        return await Task.find()
    }

    return await Task.find({ownerID:userId})
}
async function GetTask({userId,taskId,role}){
    if(role=='admin'){
        return await Task.findById(taskId)
    }

    return await Task.findOne({_id : taskId , ownerID:userId})
}

async function UpdateTask({userId,taskId,title,description,role}){
    if(role=='admin'){
        return await Task.findByIdAndUpdate(taskId,{title,description},{new:true})
    }

    return await Task.findOneAndUpdate(
        {_id:taskId,ownerID:userId},
        {title,description},
        {new : true}
    )
}
async function Delete({taskId,userId,role}){
    if(role=='admin'){
        return await Task.findByIdAndDelete(taskId)
    }

    return await Task.findOneAndDelete({
        _id:taskId,
        ownerID:userId
    })
}
export default {
    Create,
    GetAll,
    GetTask,
    UpdateTask,
    Delete
}