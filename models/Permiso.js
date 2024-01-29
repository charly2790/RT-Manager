import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Permiso = sequelize.define('Permiso', {
    idPermiso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING,
        unique: true
    },
    idUsuarioCreador: {
        type: DataTypes.INTEGER
    },
    idUsuarioUltimaModificacion: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'permisos'
});

export default Permiso;