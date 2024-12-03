import { Task } from '../models/tasks.js';
import  logger  from '../logs/logger.js';


async function getTasks(req, res) {
    const { userId } = req.user
    try {
        const tasks = await Task.findAll({
            attributes: ['id', 'name', 'done'],
            order: [['name', 'ASC']],
            where: {
                userId,
            },
        });
        res.json(tasks);
    } catch (error) {
        logger.error('Error GetTasks' + error );
        res.status(500).json({ message: 'Error al obtener tareas' });
    }
}



async function createTask(req, res){
    const { userId } = req.user
    try {
        const { title, description } = req.body;
        const task = await Task.create({ 
            title, 
            userId, 
        });
        res.json(task);
    } catch (error) {
        logger.error('Error CreateTask' + error );
        res.status(500).json({ message: 'Server Erro' });
    }
}

async function getTask(req, res){
    const { userId } = req.user
    const { id } = req.params;
    try {
        const task = await Task.findOne({ 
            attributtes: ['name', 'done'],            
            where: { 
                id, 
                userId, 
            }, 
        })
        res.json(task);
    } catch (error) {
        logger.error('Error GetTask' + error );
        res.status(500).json({ message: 'Error al obtener tarea' });
    }

}

async function updateTask(req, res){
    const { userId } = req.user
    const { id } = req.params;
    const { name } = req.body;
    try {
        const task = await Task.update({ name }, { where: {id, userId} });
        
        if (task[0] === 0)
            return res.status(404).json({ message: 'Tarea no encontrada' });
        
        res.json(task);
    } catch (error) {
        logger.error('Error UpdateTask' + error );
        res.status(500).json({ message: 'Error al actualizar tarea' });
    }
}


async function taskDone(req, res){
    const { userId } = req.user;
    const { id } = req.params;
    const { done } = req.body; 
    try{
        const task = await taskDone({ done }, { where: { id, userId }});

    }catch(err){
        logger.error('Error taskDone' + err );
        res.status(500).json({ message: 'Error al marcar como completado' });
    }
}


async function deleteTask(req, res){
    const { userId }= req.user;
    const { id } = req.params;
    try {
        const task = await Task.destroy({ where: { id, userId } });

    }catch(error){
        logger.error('Error deleteTask' + error );
        res.status(500).json({ message: 'Error al eliminar tarea' });
    }

}

export default {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    taskDone,
}