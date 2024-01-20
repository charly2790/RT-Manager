import { DataTypes } from "sequelize";
import { sequelize } from '../config/database.js'

export const Rol = sequelize.define('Rol',{
  idRol: DataTypes.INTEGER,
    nombre: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoincrement: true
    },
    estado: {
      type: DataTypes.STRING,
    },        
    idUsuarioCreador: {
      type: DataTypes.INTEGER      
    },
    idUsuarioModificador: {
      type: DataTypes.INTEGER,
    }
},{
  tableName:'roles'
})