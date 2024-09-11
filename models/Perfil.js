import { sequelize } from "../config/database.js"
import { DataTypes } from 'sequelize';
import Usuario from './'

const Perfil = sequelize.define('Perfil', {
    idPerfil: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombreCompleto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaNacimiento: {
        type: DataTypes.DATE,
    },
    avatar: {
        type: DataTypes.STRING,
    },
    telefono: {
        type: DataTypes.STRING,
    },
    redesSociales: {
        type: DataTypes.JSON
    },
    marcasPersonales:{
        type: DataTypes.JSON
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
},{
    tableName: 'perfiles'
})

Perfil.belongsTo(Usuario);
Usuario.hasOne(Perfil)

export default Perfil;