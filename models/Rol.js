import { DataTypes } from "sequelize";
import { sequelize } from '../config/database.js'

const Rol = sequelize.define('Rol', {
  idRol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    unique: true
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
}, {
  tableName: 'roles'
});

export default Rol;