import { config } from "./config.js";
import Sequelize from 'sequelize';
import redis from 'redis';

export const sequelize = new Sequelize(config.database, config.username, config.password, config);
export const redisClient = redis.createClient(config.redisport, config.redishost);
