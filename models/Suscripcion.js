import { DataTypes } from "sequelize";
import { sequelize } from '../config/database.js'
import Sesion from "./Sesion.js";

const Suscripcion = sequelize.define('Suscripcion',{
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

Suscripcion.hasMany(Sesion,{
  foreignKey: 'idSuscripcion',
  sourceKey: 'idSuscripcion'
})

Sesion.belongsTo(Suscripcion,{
  foreignKey: 'idSuscripcion',
  targetKey: 'idSuscripcion'
})


export default Suscripcion;