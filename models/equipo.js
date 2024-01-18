'use strict';
const {
  Model
} = require('sequelize');
export default (sequelize, DataTypes) => {
  class Equipo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Equipo.init({
    idEquipo: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    url: DataTypes.STRING,
    activo: DataTypes.BOOLEAN,
    direccion: DataTypes.STRING,
    fecha_fundacion: DataTypes.DATE,
    avatar: DataTypes.STRING,
    numero_telefono: DataTypes.STRING,
    numero_telefono_2: DataTypes.STRING,
    email: DataTypes.STRING,
    usuario_creador: DataTypes.INTEGER,    
    usuario_modificador: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Equipo',
  });
  return Equipo;
};