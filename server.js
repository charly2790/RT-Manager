import { config } from './config/config.js';
import { dbsConnection } from './config/database.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import entrenamientosRoutes from './routes/entrenamientos.routes.js';
import equiposRoutes from './routes/equipos.routes.js';
import estadosSesionesRoutes from './routes/estadosSesion.routes.js';
import express from 'express';
import methodOverride from 'method-override';
import perfilRoutes from './routes/perfil.routes.js'
import permisosRolRoutes from './routes/permisosRol.routes.js';
import permisosRoutes from './routes/permisos.routes.js';
import rolesRoutes from './routes/roles.routes.js';
import sesionesEntrenamientoRoutes from './routes/sesionesEntrenamiento.routes.js';
import sesionesRoutes from './routes/sesiones.routes.js';
import suscripcionesRoutes from './routes/suscripciones.routes.js';
import thirdPartyApiRoutes from './routes/thirdPartyApi.routes.js';
import tiposSesionRoutes from './routes/tiposSesion.routes.js';
import usuarioRoutes from './routes/usuarios.routes.js';
// import { models } from './models/index.js';
const app = express();

dbsConnection();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cors({
    origin: [
        'https://rtmanager.onrender.com',
        'https://rt-manager-backend.onrender.com/randomImage?query=marathon',
        'http://localhost:5173'
    ]
}));

//Routes
app.use(entrenamientosRoutes);
app.use(estadosSesionesRoutes);
app.use(equiposRoutes);
app.use(permisosRolRoutes);
app.use(permisosRoutes);
app.use(rolesRoutes);
app.use(sesionesEntrenamientoRoutes);
app.use(sesionesRoutes);
app.use(suscripcionesRoutes);
app.use(tiposSesionRoutes);
app.use(usuarioRoutes);
app.use(perfilRoutes);
app.use(thirdPartyApiRoutes);


const responderPeticion = (req, res) => {
    res.send('¡Esta será una gran aplicación!');
}

app.get('/', responderPeticion);


app.listen(config.appPort);

