import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Documento from "./Documento.js";

const MediaEntrenamiento = sequelize.define('MediaEntrenamiento', {
    idMedia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idEntrenamiento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idDocumento: {
        type: DataTypes.INTEGER,
        references:{
            model: Documento,
            key: 'idDocumento'
        },
        allowNull: false,
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
},{tablename: 'mediaEntrenamientos'});

MediaEntrenamiento.belongsTo(Documento,{foreignKey:'idDocumento'});
Documento.hasOne(MediaEntrenamiento,{foreignKey:'idDocumento'});

export default MediaEntrenamiento;