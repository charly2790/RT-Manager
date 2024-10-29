import { sequelize } from "../config/database.js"
import { DataTypes } from 'sequelize';
import Usuario from './Usuario.js'

const Perfil = sequelize.define('Perfil', {    
    idPerfil: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model: Usuario,
            key: 'idUsuario'
        },
        allowNull: false,
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
    apodo: {
        type: DataTypes.STRING,        
    },
    genero: {
        type: DataTypes.STRING
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
    idUsuarioCreador: {
        type: DataTypes.INTEGER,
    },
    idUsuarioModificador: {
        type: DataTypes.DATE
    }
},{
    tableName: 'perfiles'
})

Perfil.belongsTo(Usuario, {foreignKey: 'idUsuario'});
Usuario.hasOne(Perfil, { foreignKey: 'idUsuario' });

export default Perfil;