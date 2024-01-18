import { config } from "./config.js";
import Sequelize from 'sequelize';

export const sequelize = new Sequelize(config.database, config.username, config.password, config);

