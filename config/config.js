import dotenv from 'dotenv';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: resolve(join(__dirname, process.env.NODE_ENV ? `${process.env.NODE_ENV}.env` : 'dev.env')) });

export const config = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,    
    dialect: process.env.DB_DIALECT,
}