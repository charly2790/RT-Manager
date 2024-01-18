'use strict';
const {
  Model
} = require('sequelize');
export default (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rol.init({
    idRol: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    estado: DataTypes.STRING,
    fecha_creacion: DataTypes.DATE,
    usuario_creador: DataTypes.INTEGER,
    usuario_modificador: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Rol',
  });
  return Rol;
};