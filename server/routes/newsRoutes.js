import express from "express";
import { fetehNewsByCategory, preferences } from "../controllers/newsControllers.js";
const newsRouter = express.Router();

newsRouter.post('/preferences/:id',preferences);
newsRouter.get('/news/:category', fetehNewsByCategory)

export default newsRouter;