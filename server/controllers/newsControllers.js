import User from "../model/User.js";
import News from "../model/News.js";
import axios from "axios";

export const preferences = async (req, res) => {
  try {
    const { id } = req.params;
    const { preferences } = req.body;
    const user = await User.findById(id);
    // user.preferences = [...preferences];
    user.preferences = [...user.preferences, ...preferences];
    await user.save();
    res.status(200).json({
      message: "preference save",
    });
  } catch (error) {}
};

export const fetchNewsByCategory = async (req, res) => {
  const { category } = req.params;
  const { page = 1 } = req.query;
  const pageSize = 10;
  console.log(page);

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?page=${page}&pageSize=${pageSize}&category=${category}&country=us&apiKey=${process.env.NEWS_API_KEY}`
    );

    res.status(200).json({
      news: response.data.articles,
      length: response.data.articles.length,
      nextPage:
        response.data.articles.length === pageSize ? Number(page) + 1 : null,
    });
  } catch (error) {}
};

export const fetchAllNews = async (req, res) => {
  const { limit = 20, page = 1, keyword } = req.query;
  const query = keyword
    ? {
        $or: [
          { title: { $regex: keyword } },
          { content: { $regex: keyword } },
          { description: { $regex: keyword } },
          { author: { $regex: keyword } },
          { url: { $regex: keyword } },
        ],
      }
    : {};
  // const pageNumber = Number(page);
  // const limitNumber = Number(limit);

  try {
    const news = await News.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((page - 1) * limit);

    if (!news) {
      return res.status(400).json({
        message: "No news found",
      });
    }
    const totalCount = await News.countDocuments(query);
    res.status(200).json({
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      length: news.length,
      data: news,
    });
  } catch (error) {}
};
