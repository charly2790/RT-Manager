import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import bcrypt, { genSaltSync } from 'bcrypt';


const Usuario = sequelize.define('Usuario', {
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.VIRTUAL,
    allowNull: false,
  },
  passwordHash: {
    type: DataTypes.STRING
  },
  idRol: {
    type: DataTypes.STRING
  },
  fechaInicio: {
    type: DataTypes.DATE
  },
  fechaFin: {
    type: DataTypes.DATE
  },
  estado: {
    type: DataTypes.STRING
  },
  fechaCreacion: {
    type: DataTypes.DATE,
  },
  idUsuarioCreador: {
    type: DataTypes.INTEGER,
  },
  idUsuarioModificador: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'usuarios',
  hooks: {
    beforeCreate: (Usuario) => {
      return new Promise((resolve, reject) => {
        if (Usuario.password) {
          bcrypt.hash(Usuario.password, 10, (err, hash) => {
            Usuario.passwordHash = hash;
            Usuario.password = null;
            resolve();
          });
        }
      })

    }
  }
})

Usuario.prototype.autenticarPassword = function (password) {  
  return new Promise((res, rej) => {
    bcrypt.compare(password, this.passwordHash, function (err, valid) {
      err ? rej(err) : res(valid)
    })
  })
}

export default Usuario;
