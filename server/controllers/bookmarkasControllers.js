import { use } from "react";
import User from "../model/User.js";

export const addBookmark = async (req, res) => {
  try {
    const { article } = req.body;
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    console.log(user);

    //  check if bookmarks url alardy existic user.bookmark
    const someArticle = user.bookmarks.some((b) => b.url === article.url);
    if (someArticle) {
      return res.status(400).json({ message: "Article exists" });
    }
    console.log(someArticle);

    user.bookmarks.push(article);
    console.log(article);
    await user.save();
    console.log(user.save());

    res.status(201).json({ message: "Boolmark save" });
  } catch (error) {}
};

export const getBookmarks = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }res.status(200).json({
        data:user.bookmarks
    })
  } catch (error) {}
};

export const revoveBookmarks = async(req,res) => {
    try {
        const {id , articleId}= req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }user.bookmarks = user.bookmarks.filter(b=> b._id !== articleId)

    } catch (error) {
        
    }
};
