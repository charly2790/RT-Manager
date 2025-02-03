import { DataTypes } from "sequelize";
import { sequelize } from '../config/database.js'
import Entrenamiento from "./Entrenamiento.js";
import _ from "lodash"
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek.js"

dayjs.extend(isoWeek);

const SesionEntrenamiento = sequelize.define('SesionEntrenamiento',{
    idSesion:{
        type: DataTypes.INTEGER,  
        primaryKey: true,
        autoIncrement: true      
    },
    idSuscripcion:{
        type: DataTypes.INTEGER
    },
    fechaSesion:{
        type: DataTypes.DATE
    },
    isoWeek:{
        type:DataTypes.VIRTUAL,
        allowNull: false,

    },
    isoWeekYear:{
        type: DataTypes.VIRTUAL,
        allowNull: false,
    },
    Objetivo:{
        type: DataTypes.TEXT('medium')
    },
    Completado:{
        type: DataTypes.BOOLEAN
    },
    idEstado:{
        type: DataTypes.INTEGER
    },
    idTipoSesion:{
        type: DataTypes.INTEGER
    },
    idEdicionCarrera:{
        type:DataTypes.INTEGER
    },
    idEntrenamiento:{
        type:DataTypes.INTEGER
    },
    comentario:{
        type:DataTypes.TEXT
    },
    idUsuarioCreador:{
        type:DataTypes.INTEGER
    },
    idUsuarioModificador:{
        type:DataTypes.INTEGER
    }
},{
    tableName: 'sesiones',
    hooks:{
        afterFind: (sesiones) => {
            if(_.isArray(sesiones)){
                sesiones.forEach(sesion =>{
                    sesion.isoWeek = dayjs(sesion.fechaSesion).isoWeek();
                    sesion.isoWeekYear = dayjs(sesion.fechaSesion).isoWeekYear();
                })
            }else{
                sesiones.isoWeek = dayjs(sesiones.fechaSesion).isoWeek();
                sesiones.isoWeekYear = dayjs(sesiones.fechaSesion).isoWeekYear();
            }
        }
    }
});

SesionEntrenamiento.hasOne(Entrenamiento,{
  foreignKey: 'idSesion',
  sourceKey: 'idSesion'
});

Entrenamiento.belongsTo(SesionEntrenamiento,{
  foreignKey: 'idSesion',
  targetKey: 'idSesion'
})

export default SesionEntrenamiento;