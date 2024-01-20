import express from 'express';
import { config } from './config/config.js';
import { sequelize } from './config/database.js';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import usuarioRoutes from './routes/usuarios.routes.js';
import { models } from './models/index.js';

const app = express();

try {    
    await sequelize.sync();
    console.log('Conexión establecida con la base de datos');
} catch (error) {
    console.error('Error al conectar con la base de datos', error);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(usuarioRoutes);

const responderPeticion = (req, res) => {
    res.send('¡Esta será una gran aplicación!');
}

app.get('/', responderPeticion);


app.listen(3002);

