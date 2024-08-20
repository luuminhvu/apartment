import express from "express";
import {
  getUser,
  deleteUser,
  addUser,
  editUser,
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.post("/add", addUser);
router.delete("/delete", deleteUser);
router.get("/get", authMiddleware, getUser);
router.put("/update", editUser);
export default router;
