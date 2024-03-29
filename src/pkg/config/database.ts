import { Pool } from "pg";
import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_DATABASE,
} from "src/pkg/config";

export default () => {
  const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASS,
    port: Number(DB_PORT),
    ssl: true,
  });

  pool.on("connect", () => {
    console.log(`Connected to database at ${DB_HOST}`);
  });

  pool.on("error", (err: Error) => {
    console.error("Error connecting to database: ", err.message);
    process.exit(-1);
  });

  return pool;
};
