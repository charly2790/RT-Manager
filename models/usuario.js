import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../config/database.js';
import bcrypt from 'bcrypt';

sequelize.define('Usuario',{
    idUsuario:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }, 
    email:{
      type: DataTypes.STRING,
      unique: true,      
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      set(value) {
        this.setDataValue('password', value);
        bcrypt.hash(value,10,(err, hash)=>{
          this.setDataValue('password_hash', hash)
        })
      }
    },
    password_hash: DataTypes.STRING,
    idRol: DataTypes.STRING,
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    estado: DataTypes.STRING,
    fecha_creacion: DataTypes.DATE,
    usuario_creador: DataTypes.INTEGER,
    ultima_modificacion: DataTypes.DATE
})

export default () => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuario.init({
    idUsuario: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    password_hash: DataTypes.STRING,
    idRol: DataTypes.STRING,
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    estado: DataTypes.STRING,
    fecha_creacion: DataTypes.DATE,
    usuario_creador: DataTypes.INTEGER,
    ultima_modificacion: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Usuario',
  });

  Usuario.beforeCreate((user, options) => {
    return new Promise((resolve, reject) => {
      if(user.password){
        bcrypt.hash(user.password, 10, (err, hash) => {
          user.password_hash = hash,
          resolve();
        })
      }
    })
  })

  return Usuario;
};