import { DataTypes } from "sequelize";
import { sequelize } from '../config/database.js'

export const Suscripcion = sequelize.define('Suscripcion',{
    idSuscripcion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idUsuario: {
      type: DataTypes.INTEGER
    },
    idEquipo: {
      type: DataTypes.INTEGER
    },
    activo: {
      type: DataTypes.BOOLEAN
    },
    fechaCreacion: {
      type: DataTypes.DATE
    },
    idUsuarioCreador: {
      type: DataTypes.INTEGER
    },
    idUsuarioModificador: {
      type:DataTypes.INTEGER
    }
},{
  tableName:'suscripciones'
})