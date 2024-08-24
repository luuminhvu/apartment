import express from "express";
import { getAllAreas } from "../controllers/apartment.controller";
const router = express.Router();

router.get("/", getAllAreas);
export default router;
