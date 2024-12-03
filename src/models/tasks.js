
import sequelize from '../database/database.js';
import { DataTypes } from 'sequelize';
import { Status } from '../constants/index.js';


export const Task = sequelize.define('task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: { 
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
            notNull: {
                msg: 'Title must not be null',
            },
        },
    },

    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,

        validate: {
            isIn: {
                args: [[true, false]],
                msg: 'Done must be either true or false',
            }
        }
    }
})