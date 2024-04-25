import { DataTypes } from "sequelize";
import { sequelize } from '../config/database.js';
import SesionEntrenamiento from "./SesionEntrenamiento.js";

const Suscripcion = sequelize.define('Suscripcion',{
    idSuscripcion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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

Suscripcion.hasMany(SesionEntrenamiento,{
  foreignKey: 'idSuscripcion',
  sourceKey: 'idSuscripcion'
})

SesionEntrenamiento.belongsTo(Suscripcion,{
  foreignKey: 'idSuscripcion',
  targetKey: 'idSuscripcion'
})


export default Suscripcion;