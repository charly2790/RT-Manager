import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { resolve, join } from 'path';
import dotenv from 'dotenv';
import fs from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: resolve(join(__dirname, process.env.NODE_ENV ? `${process.env.NODE_ENV}.env` : 'dev.env')) });

export const config = {        
        database: process.env.DB_DATABASE,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        ssl: parseInt(process.env.DB_SSL) === 1 ? true : false,
        ca: parseInt(process.env.DB_SSL) === 1 ? fs.readFileSync(__dirname + '/ca.pem').toString() : null,
        appPort: process.env.APP_PORT,
        secret: process.env.SECRET,
        redisUrlKey: process.env.REDIS_URLKEY,
        redisHost: process.env.REDIS_HOST,
        redisPort: process.env.REDIS_PORT,
        redisUser: process.env.REDIS_USER,
        redisPassword:process.env.REDIS_PASSWORD,
        redisIndexDb: process.env.REDIS_INDEXDB,
        tokenTTL:process.env.TOKEN_TTL,
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryAPIKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryAPISecret: process.env.CLOUDINARY_API_SECRET, 
        pexelsAPIKey: process.env.PEXELS_API_KEY
}