import { User } from '../models/users.js';
import { Task } from '../models/tasks.js';  
import  logger  from '../logs/logger.js';
import { Status } from '../constants/index.js';


async function getUsers(req, res) {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'password', 'status'],
            order: [['id', 'DESC']],
            where: {
                status: Status.ACTIVE,
            }
        });
        return res.json(users);
    } catch (error) {       
        logger.error('Error getting users:',+ error);
        res.status(500).json({ message: 'Server error' });
    }
}


async function createUser(req, res) { 
    try {
        const { username, password } = req.body;
        const user = await User.create({ username, password });
        res.json(user);
    } catch (error) {
        logger.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function getUser(req, res) {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: [ 'username', 'status'],
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        logger.error('Error getting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function updateUser(req, res) {
    const { id } = req.params;
    const {username, password } = req.body;
    try{
        if(!username || !password) {
            return res
            .status(400)
            .json({ message: 'Username or password are requiered'});

        }
        res.json(User);
    } catch(error){
        logger.error('Error getUser' + error);
        res.status(500).json({ message: 'Server error' });
    }
}      

async function activateInactivate(req, res){
    const { id } = req.params;
    const { status } = req.body;
    try {
        if (!status) {return res.status(404).json({ message: 'Status is requiered' });
    }
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        if (user.status === status) {
            return res
           .status(400)
           .json({ message: 'Status is the same as the current one ' });
        }
        user.status = status;
        await user.save();
        res.json(user);
    } catch (error) {
        logger.error('Error activating/inactivating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function deleteUser(req, res){
    
    const { id } = req.params;
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted' + error});
    res.status(500).json({ message: ' Server error' });

}

async function getTasks(req, res){
const { id } = req.params
try {
    const user = await User.findOne({
        attributes: ['username'],
        include: [{
            model: Task,
            attributes: ['name', 'done'],
           /* where: { 
                done: true } */
        }],
        where: { id },
    })
    res.json(user)
} catch(error) {
    logger.error('Error deleteUser: ' +error);
    res.status(500).json({ message: 'Server error' });
 }
}


export default {
    getUsers,
    createUser,
    getUser,
    updateUser,
    activateInactivate,
    deleteUser,
    getTasks,
}