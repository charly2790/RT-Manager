import express from 'express';
import { config } from './config/config.js';
import { sequelize, redisClient, dbsConnection } from './config/database.js';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import cors from 'cors';
import usuarioRoutes from './routes/usuarios.routes.js';
import sesionesRoutes from './routes/sesiones.routes.js';
import rolesRoutes from './routes/roles.routes.js';
import permisosRoutes from './routes/permisos.routes.js';
import permisosRolRoutes from './routes/permisosRol.routes.js';
import tiposSesionRoutes from './routes/tiposSesion.routes.js';
import sesionesEntrenamientoRoutes from './routes/sesionesEntrenamiento.routes.js';
import entrenamientosRoutes from './routes/entrenamientos.routes.js';
import equiposRoutes from './routes/equipos.routes.js';
import suscripcionesRoutes from './routes/suscripciones.routes.js';
// import { models } from './models/index.js';
const app = express();

dbsConnection();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cors());

//Routes
app.use(usuarioRoutes);
app.use(sesionesRoutes);
app.use(rolesRoutes);
app.use(permisosRoutes);
app.use(permisosRolRoutes);
app.use(tiposSesionRoutes);
app.use(sesionesEntrenamientoRoutes);
app.use(entrenamientosRoutes);
app.use(equiposRoutes);
app.use(suscripcionesRoutes);

const responderPeticion = (req, res) => {
    res.send('¡Esta será una gran aplicación!');
}

app.get('/', responderPeticion);


app.listen(config.appPort);

