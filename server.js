import express from 'express';
import { config } from './config/config.js';
import { sequelize, redisClient, dbsConnection } from './config/database.js';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import usuarioRoutes from './routes/usuarios.routes.js';
import sesionesRoutes from './routes/sesiones.routes.js';
// import { models } from './models/index.js';
const app = express();

dbsConnection();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(usuarioRoutes);
app.use(sesionesRoutes);

const responderPeticion = (req, res) => {
    res.send('¡Esta será una gran aplicación!');
}

app.get('/', responderPeticion);


app.listen(config.appPort);

