"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/add", user_controller_1.addUser);
router.delete("/delete", user_controller_1.deleteUser);
router.get("/get", auth_1.authMiddleware, user_controller_1.getUser);
router.put("/update", user_controller_1.editUser);
exports.default = router;
