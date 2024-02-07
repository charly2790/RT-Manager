import { DataTypes } from "sequelize";
import { sequelize } from '../config/database.js'
import Entrenamiento from "./Entrenamiento.js";

const Sesion = sequelize.define('Sesion',{
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

Sesion.hasOne(Entrenamiento,{
  foreignKey: 'idSesion',
  sourceKey: 'idSesion'
});

Entrenamiento.belongsTo(Sesion,{
  foreignKey: 'idSesion',
  targetKey: 'idSesion'
})

export default Sesion;