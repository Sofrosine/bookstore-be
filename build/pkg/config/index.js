"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.DB_DATABASE = exports.DB_PASS = exports.DB_USER = exports.DB_PORT = exports.DB_HOST = exports.APP_PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
exports.APP_PORT = process.env.APP_PORT || "3000";
exports.DB_HOST = process.env.DB_HOST || "localhost";
exports.DB_PORT = process.env.DB_PORT || "5432";
exports.DB_USER = process.env.DB_USER || "";
exports.DB_PASS = process.env.DB_PASS || "";
exports.DB_DATABASE = process.env.DB_DATABASE || "";
exports.JWT_SECRET = process.env.JWT_SECRET || "123";
//# sourceMappingURL=index.js.map