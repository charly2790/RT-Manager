'use strict';
const {
  Model
} = require('sequelize');
export default (sequelize, DataTypes) => {
  class Suscripcion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Suscripcion.init({
    idSuscripcion: DataTypes.INTEGER,
    idUsuario: DataTypes.INTEGER,
    idEquipo: DataTypes.INTEGER,
    activo: DataTypes.BOOLEAN,
    fecha_creacion: DataTypes.DATE,
    usuario_creador: DataTypes.INTEGER,
    ultima_modificacion: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Suscripcion',
  });
  return Suscripcion;
};