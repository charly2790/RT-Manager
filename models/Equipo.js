import { DataTypes } from "sequelize";
import { sequelize } from '../config/database.js'
import Suscripcion from "./Suscripcion.js";

const Equipo = sequelize.define('Equipo', {
  idEquipo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
  activo: {
    type: DataTypes.BOOLEAN,
  },
  direccion: {
    type: DataTypes.STRING,
  },
  fechaFundacion: {
    type: DataTypes.DATE,
  },
  avatar: {
    type: DataTypes.STRING,
  },
  nroTelefono: {
    type: DataTypes.STRING,
  },
  nroTelefonoAlternativo: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  idUsuarioCreador: {
    type: DataTypes.INTEGER,
  },
  idUsuarioModificador: {
    type: DataTypes.INTEGER
  },
}, { tableName: 'equipos' })

Equipo.hasMany(Suscripcion, {
  foreignKey: 'idEquipo',
  sourceKey: 'idEquipo'
});

Suscripcion.belongsTo(Equipo, {
  foreignKey: 'idEquipo',
  targetKey: 'idEquipo',
});

export default Equipo;