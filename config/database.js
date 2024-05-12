import { config } from "./config.js";
import Sequelize from 'sequelize';
import { createClient } from 'redis';

const { database, username, password, host, dialect, appPort } = config;

export const sequelize = new Sequelize({
    database,
    username,
    password,
    host,
    dialect,
    appPort,
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
});

export const redisClient = createClient({ url: `redis://${config.redisHost}:${config.redisPort}/${config.redisIndexDb}` });

export const dbsConnection = () => {
    sequelize.authenticate()
        .then(() => {
            console.log("Base de datos postgres: 🆗");

            redisClient.connect()
                .then(() => {
                    console.log("Base de datos redis: 🆗");

                    sequelize.sync({force: false})
                        .then(() => {
                            console.log("Sincronización base de datos postgres: 🆗");
                        })
                        .catch((error) => {
                            console.log("Sincronización base de datos postgres: 🚫\n", error);
                        })
                })
                .catch((error) => {
                    console.log("Base de datos redis: 🚫\n", error);
                })
        })
        .catch((error) => {
            console.error("Base de datos postgres: 🚫\n", error);
        })
}