import Bookmark from "../models/Bookmark.js";

export const addBookmark = async (req, res) => {
    try {
        const { itemId, itemType, title, posterPath } = req.body;
        const userId = req.user.id; // Extract user ID from JWT

        if (!itemId || !itemType || !title) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check if bookmark already exists
        const existingBookmark = await Bookmark.findOne({ userId, itemId });
        if (existingBookmark) {
            return res.status(409).json({ message: "Already bookmarked" });
        }

        const newBookmark = new Bookmark({
            userId,
            itemId,
            itemType,
            title,
            posterPath,
        });

        await newBookmark.save();
        res.status(201).json({ message: "Bookmarked successfully", bookmark: newBookmark });

    } catch (error) {
        res.status(500).json({ message: "Error bookmarking item", error: error.message });
    }
};

export const getBookmarks = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from JWT

        const bookmarks = await Bookmark.find({ userId });

        if (bookmarks.length === 0) {
            return res.status(404).json({ message: "No bookmarks found" });
        }

        res.status(200).json(bookmarks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookmarks", error: error.message });
    }
};


export const deleteBookmark = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from JWT
        const { itemId } = req.params; // Get item ID from request parameters

        const bookmark = await Bookmark.findOneAndDelete({ userId, itemId });

        if (!bookmark) {
            return res.status(404).json({ message: "Bookmark not found" });
        }

        res.status(200).json({ message: "Bookmark deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting bookmark", error: error.message });
    }
};

