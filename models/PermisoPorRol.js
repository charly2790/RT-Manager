import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Rol from "./Rol.js";
import Permiso from "./Permiso.js";

const PermisoPorRol = sequelize.define('PermisoPorRol', {}, {
    timestamps: false,
    tableName: 'permisosPorRol'
});

Rol.belongsToMany(Permiso, {
    through: PermisoPorRol,
    onDelete: 'cascade',
    foreignKey: 'idRol',
})

Permiso.belongsToMany(Rol, {
    through: PermisoPorRol,
    onDelete: 'cascade',
    foreignKey: 'idPermiso',
})

export default PermisoPorRol;