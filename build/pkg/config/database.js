"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const config_1 = require("src/pkg/config");
exports.default = () => {
    const pool = new pg_1.Pool({
        user: config_1.DB_USER,
        host: config_1.DB_HOST,
        database: config_1.DB_DATABASE,
        password: config_1.DB_PASS,
        port: Number(config_1.DB_PORT),
        ssl: true,
    });
    pool.on("connect", () => {
        console.log(`Connected to database at ${config_1.DB_HOST}`);
    });
    pool.on("error", (err) => {
        console.error("Error connecting to database: ", err.message);
        process.exit(-1);
    });
    return pool;
};
//# sourceMappingURL=database.js.map