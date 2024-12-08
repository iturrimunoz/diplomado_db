import { DataTypes, INTEGER } from 'sequelize';
import sequelize from '../database/database.js';


export const Task =  sequelize.define('tasks', {
id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
},
name: {
    type: DataTypes.STRING,
    allowNull: false,

    validate: {
        noNull: {
            msg: 'name cannot be null the name',
        },
    },
},
done:{
    type: DataTypes.BOOLEAN,
    defaultValue:false,

    validate: {
        isIn: {
            args: [[true, false]],
            msg: 'Done must be either true or false',
        }
    }
}

})