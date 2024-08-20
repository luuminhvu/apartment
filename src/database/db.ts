import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT as "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "apartment_management",
  models: [User],
  logging: false,
});

export default sequelize;
