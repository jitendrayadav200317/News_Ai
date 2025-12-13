import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnect from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import newsRouter from "./routes/newsRoutes.js";
import bookmarksRoutes from "./routes/bookmarksRoutes.js";
import readingHistoryRoutes from "./routes/readingHistoryRoutes.js";

dotenv.config(); //load env file
const app = express(); // create app fist
app.use(express.json()); //call json correctrly
app.use(cookieParser());
dbConnect(); //connect to db
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", userRoutes); //user routes
app.use("/api", newsRouter); //newa ruters
app.use("/api", bookmarksRoutes); //bookmarks routes
app.use("/api",readingHistoryRoutes);

//create server
app.listen(process.env.PORT, () => {
  console.log(`server is running is ${process.env.PORT}`);
});
