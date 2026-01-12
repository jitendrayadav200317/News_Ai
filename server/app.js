import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import axios from "axios";
import cron from "node-cron";
import admin from "firebase-admin";

import dbConnect from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import newsRouter from "./routes/newsRoutes.js";
import bookmarksRoutes from "./routes/bookmarksRoutes.js";
import readingHistoryRoutes from "./routes/readingHistoryRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import News from "./model/News.js";
// import serviceAccount  from './key/key.json' with{type:"json"};

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

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
// google auth
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// auto newa fatch and save the data base
const countries = ["us", "uk", "fr", "in", "it"];
const categories = [
  "health",
  "science",
  "sports",
  "entertainment",
  "politics",
  "business",
];

// news fetch api
const fetchNewsAndStore = async () => {
  for (let country of countries) {
    for (let category of categories) {
      const { data } = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${process.env.NEWS_API_KEY}`
      );
      //  if news alrady exgist then delile the news ans save the new news
      if (data.articles && data.articles.length > 0) {
        for (let d of data.articles) {
          const exist = await News.findOne({ title: d.title });

          if (!exist) {
            const newData = await News.create({
              content: d.content,
              title: d.title,
              author: d.author,
              description: d.description,
              url: d.url,
              urlToImage: d.urlToImage,
              category,
              publishedAt: d.publishedAt,
              country,
              source: {
                id: d.source.id,
                name: d.source.name,
              },
            });
            console.log(`Inserted ${d.title} [${category}-${country}]`);
          } else {
            console.log(`Already exists ${d.title}`);
          }
        }
      } else {
        console.log("no data found");
      }
    }
  }
};

//cron.schedule('*/20 * * * *',fetchNewsAndStore);

app.get("/", (req, res) => {
  res.send("HomePage");
});
app.use("/auth", userRoutes); //user routes
app.use("/api", newsRouter); //newa ruters
app.use("/api", bookmarksRoutes); //bookmarks routes
app.use("/api", readingHistoryRoutes); // reding history routes
app.use("/api", aiRoutes); // ai summary routes

//create server
app.listen(process.env.PORT, () => {
  console.log(`server is running is ${process.env.PORT}`);
});
