import { configDotenv } from "dotenv";

configDotenv();

export const APP_PORT: string = process.env.APP_PORT || "3000";
export const DB_HOST: string = process.env.DB_HOST || "localhost";
export const DB_PORT: string = process.env.DB_PORT || "5432";
export const DB_USER: string = process.env.DB_USER || "";
export const DB_PASS: string = process.env.DB_PASS || "";
export const DB_DATABASE: string = process.env.DB_DATABASE || "";
export const JWT_SECRET: string = process.env.JWT_SECRET || "123";
