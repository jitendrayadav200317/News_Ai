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
    const sameArticle = user.bookmarks.some((b) => b.url === article.url);
    if (sameArticle) {
      return res.status(400).json({ message: "Article exists" });
    }
    console.log(sameArticle);

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
    }
    res.status(200).json({
      data: user.bookmarks,
    });
  } catch (error) {}
};

export const removeBookmarks = async (req, res) => {
  try {
    const { id } = req.params;
    const { articleUrl } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    user.bookmarks = user.bookmarks.filter((b) => b.url !== articleUrl);
    await user.save();
    res.status(200).json({ message: "bookmark removed" });
  } catch (error) {}
};



// export const removeBookmarks = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { articleUrl } = req.body;

//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.bookmarks = user.bookmarks.filter(
//       (b) => b.url !== articleUrl
//     );

//     await user.save();

//     res.status(200).json({ message: "Bookmark removed" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
