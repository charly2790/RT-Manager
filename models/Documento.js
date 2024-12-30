import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Documento = sequelize.define('Documento',{
    idDocumento:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },    
    link:{
        type: DataTypes.TEXT
    },
    idCategoria:{
        type: DataTypes.INTEGER
    },  
    idUsuarioUltimaModificacion:{
        type: DataTypes.INTEGER
    },
},{tableName: 'documentos'});

export default Documento;