import { DataTypes } from "sequelize";
import { sequelize } from '../config/database.js'
import Entrenamiento from "./Entrenamiento.js";

const SesionEntrenamiento = sequelize.define('SesionEntrenamiento',{
    idSesion:{
        type: DataTypes.INTEGER,  
        primaryKey: true,
        autoIncrement: true      
    },
    idSuscripcion:{
        type: DataTypes.INTEGER
    },
    fechaSesion:{
        type: DataTypes.DATE
    },
    Objetivo:{
        type: DataTypes.TEXT('medium')
    },
    Completado:{
        type: DataTypes.BOOLEAN
    },
    idEstado:{
        type: DataTypes.INTEGER
    },
    idTipoSesion:{
        type: DataTypes.INTEGER
    },
    idEdicionCarrera:{
        type:DataTypes.INTEGER
    },
    idEntrenamiento:{
        type:DataTypes.INTEGER
    },
    idUsuarioCreador:{
        type:DataTypes.INTEGER
    },
    idUsuarioModificador:{
        type:DataTypes.INTEGER
    }
},{tableName: 'sesiones'});

SesionEntrenamiento.hasOne(Entrenamiento,{
  foreignKey: 'idSesion',
  sourceKey: 'idSesion'
});

Entrenamiento.belongsTo(SesionEntrenamiento,{
  foreignKey: 'idSesion',
  targetKey: 'idSesion'
})

export default SesionEntrenamiento;