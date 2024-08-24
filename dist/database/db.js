"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("../models/User");
const mysql2_1 = __importDefault(require("mysql2"));
const Area_1 = require("../models/Area");
const Building_1 = require("../models/Building");
const Floor_1 = require("../models/Floor");
const Room_1 = require("../models/Room");
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [User_1.User, Area_1.Area, Building_1.Building, Floor_1.Floor, Room_1.Room],
    logging: false,
    dialectModule: mysql2_1.default,
});
exports.default = sequelize;
