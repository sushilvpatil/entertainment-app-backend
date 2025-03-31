import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addBookmark,getBookmarks ,deleteBookmark} from "../controllers/bookmarkController.js";

const router = express.Router();

router.post("/bookmark", authMiddleware, addBookmark);
router.get("/bookmarks", authMiddleware, getBookmarks);
router.delete("/bookmarks/:itemId", authMiddleware, deleteBookmark);
export default router;
