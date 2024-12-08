import { Task } from '../models/tasks.js';
import logger from '../logs/logger.js';

async function getTasks(req, res){
const { userId } = req.user;
try{
const tasks = await Task.findAll({
    attributtes: ['id', 'name', 'done'],
    order: [['name', 'ASC']],
    where: [userId]
});
res.josn(tasks);
} catch(error){
logger.error('Error getTasks:' + error);
res.status(500).json({message: 'Server error'});
}
}

async function createTask(req, res){
const {userId} = req.user;
const{name} = req.body;
try{
const task = await Task.create({
    name,
    userId,
});
res.json(task);
}catch(error){
    logger.error('Error createTask:' + error);
    res.status(500).json({message: 'Server error'});
}
}

async function getTask(req, res){
    const { userId } = req.user;
    const  { id } = req.params;
    try{
        const task = await findOne({
            attributes: ['name', 'done'],
            where: {
                id, 
                userId,
            },
        })
        res.json(task);
    }catch(error){
        logger.error('Error getTask:' + error);
        res.status(500).json({message: 'Server error'});
    }
}

async function updateTask(req, res){
    const { userId } = req.user;
    const { id } = req.params;
    const { name } = req.body;
    try{
        const task = await Task.update({ name: name}, {where: {id, userId } });
            
        if(task[0]===0)
            return res.status(404).json({message: 'Task not Found'});

        res.json(task);
    }catch(error){
        logger.error('Error UpdateTask:' + error);
        res.status(500).json({message: 'Server error'});
    }
}

async function taskDone(req, res){
    const { userId } = req.user;
    const { id } = req.params;
    const { done  } = req.body;
    try{
        const task = await Task.update({ done }, {where: {id, userId } });
            
        if(task[0]===0)
            return res.status(404).json({message: 'Task not Found'});

        res.json(task);
    }catch(error){
        logger.error('Error UpdateTask:' + error);
        res.status(500).json({message: 'Server error'});
    }
}
 
async function deleteTask(req, res){

    const { userId } = req.user;
    const { id } = req.params;
    
    try{
        const task = await Task.destroy({where: {id, userId } });
            
        if(task[0]===0)
            return res.status(404).json({message: 'Task not Found'});

        res.json(task);
    }catch(error){
        logger.error('Error DeleteTask:' + error);
        res.status(500).json({message: 'Server error'});
    }
}

export default {
    getTasks,
    createTask,
    getTask,
    updateTask,
    taskDone,
    deleteTask
}