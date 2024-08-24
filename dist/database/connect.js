"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
db_1.default
    .authenticate()
    .then(() => {
    console.log("Connection to the database has been established successfully.");
})
    .catch((err) => {
    console.error("Unable to connect to the database:", err);
});
db_1.default
    .sync({ alter: true })
    .then(() => {
    console.log("Database synced successfully.");
})
    .catch((err) => {
    console.error("Error syncing database:", err);
});
