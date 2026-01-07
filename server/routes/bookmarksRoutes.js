import express from "express"
import { addBookmark, removeBookmarks , getBookmarks } from "../controllers/bookmarkasControllers.js";

const bookmarksRoutes = express.Router();

bookmarksRoutes.get('/:id/bookmarks',getBookmarks);
bookmarksRoutes.post('/:id/bookmarks',addBookmark);
bookmarksRoutes.delete('/:id/bookmarks',removeBookmarks )

export default bookmarksRoutes;