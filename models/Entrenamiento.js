import { DataTypes } from "sequelize";
import { sequelize } from '../config/database.js';
import MediaEntrenamiento from "./MediaEntrenamiento.js";

const Entrenamiento = sequelize.define('Entrenamiento', {
    idEntrenamiento:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idSesion:{
        type: DataTypes.INTEGER
    },
    fechaEntrenamiento:{
        type: DataTypes.DATE
    },
    distancia: {
        type: DataTypes.FLOAT
    },
    tiempoNeto: {
        type: DataTypes.TIME
    },
    tiempoTotal: {
        type: DataTypes.TIME
    },
    rpe:{
        type: DataTypes.SMALLINT
    },
    link:{
        type: DataTypes.TEXT
    },
    comentario:{
        type: DataTypes.TEXT,
    },
    entrenamientoRealizado:{
        type: DataTypes.TEXT,
    },
    usuarioCreador:{
        type: DataTypes.INTEGER
    },
    usuarioModificador:{
        type: DataTypes.INTEGER
    }
},{tableName: 'entrenamientos' });

Entrenamiento.hasMany(MediaEntrenamiento,{
    foreignKey: 'idEntrenamiento',
    sourceKey: 'idEntrenamiento'
});

MediaEntrenamiento.belongsTo(Entrenamiento,{
    foreignKey: 'idEntrenamiento',
    targetKey: 'idEntrenamiento'
})

export default Entrenamiento;