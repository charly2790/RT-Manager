import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Documento from "./Documento.js"

const CategoriaDocumento = sequelize.define('CategoriaDocumento', {
    idCategoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING,
        unique: true
    },
    fechaCreacion: {
        type: DataTypes.DATE
    },
    fechaUltimaModificacion: {
        type: DataTypes.DATE
    },
    idUsuarioUltimaModificacion: {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'categoriasDeDocumentos'
});

CategoriaDocumento.hasMany(Documento, {
    foreignKey: 'idCategoria',
    sourceKey: 'idCategoria'
});

Documento.belongsTo(CategoriaDocumento, {
    foreignKey: 'idCategoria',
    targetKey: 'idCategoria',
});

export default CategoriaDocumento;