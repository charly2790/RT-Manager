import express from 'express';
import { config } from './config/config.js';
import { sequelize, redisClient, dbsConnection } from './config/database.js';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import usuarioRoutes from './routes/usuarios.routes.js';
import sesionesRoutes from './routes/sesiones.routes.js';
import rolesRoutes from './routes/roles.routes.js'
import permisosRoutes from './routes/permisos.routes.js'
import permisosRolRoutes from './routes/permisosRol.routes.js'
const app = express();

dbsConnection();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//Routes
app.use(usuarioRoutes);
app.use(sesionesRoutes);
app.use(rolesRoutes);
app.use(permisosRoutes);
app.use(permisosRolRoutes);

const responderPeticion = (req, res) => {
    res.send('¡Esta será una gran aplicación!');
}

app.get('/', responderPeticion);


app.listen(config.appPort);

