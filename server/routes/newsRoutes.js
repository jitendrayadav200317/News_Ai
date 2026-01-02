import express from "express";
import { fetchNewsByCategory, preferences , fetchAllNews} from "../controllers/newsControllers.js";
const newsRouter = express.Router();

newsRouter.post('/preferences/:id',preferences);
newsRouter.get('/news/:category', fetchNewsByCategory);
newsRouter.get('/news',fetchAllNews);

export default newsRouter;