import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import mysql2 from "mysql2";
import { Area } from "../models/Area";
import { Building } from "../models/Building";
import { Floor } from "../models/Floor";
import { Room } from "../models/Room";

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT as "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [User, Area, Building, Floor, Room],
  logging: false,
  dialectModule: mysql2,
});

export default sequelize;
