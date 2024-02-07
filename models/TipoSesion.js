import { DataTypes } from "sequelize";
import { sequelize } from '../config/database.js'
import Sesion from "./Sesion.js";

const TipoSesion = sequelize.define('TipoSesion', {
    idTipoSesion:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion:{
        type: DataTypes.STRING
    },
    idUsuarioCreador:{
        type: DataTypes.INTEGER
    },
    idUsuarioModificador:{
        type: DataTypes.INTEGER
    }
},{ tableName: 'tiposDeSesion' });

TipoSesion.hasMany(Sesion, {
    foreignKey: 'idTipoSesion',
    sourceKey: 'idTipoSesion'
});

Sesion.belongsTo(TipoSesion, {
    foreignKey: 'idTipoSesion',
    targetKey: 'idTipoSesion'
})

export default TipoSesion;