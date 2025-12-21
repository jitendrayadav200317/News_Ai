import express from "express";
import { fetchNewsByCategory, preferences } from "../controllers/newsControllers.js";
const newsRouter = express.Router();

newsRouter.post('/preferences/:id',preferences);
newsRouter.get('/news/:category', fetchNewsByCategory)

export default newsRouter;