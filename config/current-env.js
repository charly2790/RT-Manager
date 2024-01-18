import { config } from "./config.js";

export default  {
    username: config.username,
    password: config.password,
    database: config.database,
    host: config.host,    
    dialect: config.dialect,
};