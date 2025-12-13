import express from "express"
import { addBookmark, revoveBookmarks, getBookmarks } from "../controllers/bookmarkasControllers.js";

const bookmarksRoutes = express.Router();

bookmarksRoutes.get('/:id/bookmarks',getBookmarks);
bookmarksRoutes.post('/:id/bookmarks',addBookmark);
bookmarksRoutes.delete('/:id/bookmarks/:articleId',revoveBookmarks)

export default bookmarksRoutes;