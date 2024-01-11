import { config } from './config/config.js';
import express from 'express';
import Sequelize from 'sequelize';
import postgres from 'postgres';
import bodyParser from 'body-parser';

const app = express();

const responderPeticion = (req, res) => {
    res.send('¡Esta será una gran aplicación!');    
}

app.get('/',responderPeticion);


app.listen(3002);