import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import * as schema from '../models/index';
dotenv.config();

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error('Enviroment variables missing');
}
const connection = mysql.createPool({
  uri: url,
});

export const db = drizzle(connection, { schema: schema, mode: 'default' });
