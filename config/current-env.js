import { config } from "./config.js";

export default ()=>{    
    return {
        host: config.host,    
        dialect: config.dialect,
        database: config.database,
        username: config.username,
        password: config.password,
        port: config.port,
        dialectOptions: config.ssl ? {
            ssl: {
                require: true,
                rejectUnauthorized: false,
                ca:config.ca,
            },
        }:{}
    }
};