import User from "../model/User.js";
import axios from "axios";

export const preferences = async (req, res) => {
  try {
    const { id } = req.params;
    const { preferences } = req.body;
    const user = await User.findById(id);
    user.preferences = [...preferences];
    user.preferences = [...user.preferences, ...preferences];
    await user.save();
    res.status(200).json({
      message: "preference save",
    });
  } catch (error) {}
};

export const fetehNewsByCategory = async (req, res) => {
  const { category } = req.params;
  const { page = 1 } = req.query;
  const pageSize = 10
  console.log(page);
  
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?page=${page}&pageSize=${pageSize}&Category=${category}&country=us&apiKey=${process.env.NEWS_API_KEY}`
    );
    
      res.status(200).json({
        news: response.data.articles,
        length: response.data.articles.length,
        nextPage: response.data.articles.length === pageSize ? Number(page) +1 : null,
      });
    
  } catch (error) {}
};
