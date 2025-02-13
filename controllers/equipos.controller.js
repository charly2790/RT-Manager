import _ from "lodash"
import Equipo from "../models/Equipo.js";
import { ErrorFactory } from "../utils/ErrorFactory.js";
import { errorTypes } from "../utils/ErrorTypes.js";
import { feedbackMessages } from "../utils/FeedbackMessages.js";

export const create = async (req, res) => {

    let { nombre, url, activo } = req.body;

    if (!nombre || !url || !activo) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    let data = {
        nombre,
        url,
        activo,
        //restan handlear más campos
    }

    try {
        const newEquipo = await Equipo.create(data);
        return res.status(200).json(newEquipo);
    } catch (error) {
        console.error(`Error al crear nuevo equipo \n${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }


}

export const getEquipoById = async (req, res) => {

    try {
        const { idEquipo } = req.params;
        const attributes = ['idEquipo', 'nombre', 'url', 'activo', 'fechaFundacion', 'avatar']

        const equipo = await Equipo.findOne({
            where: {
                idEquipo,
            },
            attributes,
        });

        if (_.isNil(equipo)) throw ErrorFactory.createError(errorTypes.NO_DATA_ERROR, feedbackMessages.NO_DATA_FOUND);

        return res.status(200).json({ message: 'Ok', result: { equipo } });

    } catch (error) {

        let STATUS_CODE = 500;
        let MESSAGE = `Error interno del servidor: ${error.message}`;

        switch (error.name) {
            case errorTypes.VALIDATION_ERROR:
                STATUS_CODE = error.statusCode;
                MESSAGE = error.message;
                break;
        }

        return res.status(STATUS_CODE).json({ message: MESSAGE });
    }




}