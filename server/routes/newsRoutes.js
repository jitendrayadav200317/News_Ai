import express from "express";
import { preferences } from "../controllers/newsControllers.js";
const newsRouter = express.Router();

newsRouter.post('/preferences/:id',preferences);

export default newsRouter;