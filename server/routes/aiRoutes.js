import express from "express"
import { newsSummarize } from "../controllers/aiControllers.js";
const aiRoutes = express.Router();
aiRoutes.post('/summarize',newsSummarize);

export default aiRoutes
