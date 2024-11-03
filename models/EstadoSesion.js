import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Sesion from './SesionEntrenamiento.js';

const EstadoSesion = sequelize.define('EstadoSesion',{
    idEstado:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion:{
        type: DataTypes.STRING
    }
},{ tableName: 'estadosDeSesion'});

EstadoSesion.hasMany(Sesion,{
    foreignKey: 'idEstado',
    sourceKey: 'idEstado'
});

Sesion.belongsTo(EstadoSesion,{
    foreignKey: 'idEstado',
    targetKey: 'idEstado'
})

export default EstadoSesion;