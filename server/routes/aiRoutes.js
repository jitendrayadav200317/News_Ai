import express from "express"
import { newsSummarize } from "../controllers/aiControllers.js";
const aiRoutes = express.Router();
aiRoutes.get('/summarize',newsSummarize);

export default aiRoutes
