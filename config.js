import dotenv from "dotenv";

// require("dotenv").config();
dotenv.config();

export const config = {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  PORT: process.env.PORT,
};
