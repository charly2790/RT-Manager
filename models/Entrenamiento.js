import { DataTypes } from "sequelize";
import { sequelize } from '../config/database.js'

const Entrenamiento = sequelize.define('Entrenamiento', {
    idEntrenamiento:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idSesion:{
        type: DataTypes.INTEGER
    },
    distancia: {
        type: DataTypes.FLOAT
    },
    tiempo: {
        type: DataTypes.TIME
    },
    rpe:{
        type: DataTypes.SMALLINT
    },
    link:{
        type: DataTypes.TEXT
    },
    usuarioCreador:{
        type: DataTypes.INTEGER
    },
    usuarioModificador:{
        type: DataTypes.INTEGER
    }
},{tableName: 'entrenamientos' });

export default Entrenamiento;