import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import { Task } from './tasks.js';
import { Status } from '../constants/index.js';
import logger from '../logs/logger.js';
import { encriptar } from '../common/bycript.js';


export const User = sequelize.define( 'users', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

        validate: {
            notNull:{
                msg: 'Usuario no puede ser Nulo',
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
            notNull:{
                msg: 'Password no puede ser Nulo',
            },
        },
    },
    status:{ 
    type: DataTypes.STRING,
    defaultValue: Status.ACTIVE,
    
    validate: {
        isIn: {
            args: [[Status.ACTIVE, Status.INACTIVE]],
            msg: "Status must be either active or inactive",
        }
    }
}
}
);

User.hasMany(Task);
Task.belongsTo(User);

/*User.hasMany(Task, {
    foreignKey: 'user_id',
    sourceKey: 'id'
})

Task.belongsTo(User, {
    foreignKey: 'user_id',
    target: 'id'
}) */


User.beforeCreate(async(user) => {
        try {
            user.password = await encriptar(user.password);
        } catch(error){
            logger.error(error.message);
            throw new Error ('Error al Encriptar la contrasena');
        }
    })

User.beforeUpdate(async(user) => {
        try {
            user.password = await encriptar(user.password);
        } catch(error){
            logger.error(error.message);
            throw new Error ('Error al comparar la contrasena');
        } 
})