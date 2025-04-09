import Bookmark from "../models/Bookmark.js";
import Media from "../models/Media.js";
export const addBookmark = async (req, res) => {
    try {
        const { itemId, itemType, title, posterPath } = req.body;
        const userId = req.user.id; // Extract user ID from JW

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

        // Fetch all bookmarks for the user
        const bookmarks = await Bookmark.find({ userId });

        if (!bookmarks || bookmarks.length === 0) {
            return res.status(404).json({ message: "No bookmarks found" });
        }

        // Enrich bookmarks with properties from Media
        const enrichedBookmarks = await Promise.all(
            bookmarks.map(async (bookmark) => {
                const media = await Media.findOne({ tmdbId: bookmark.itemId });
                if (media) {
                    return {
                        ...bookmark.toObject(),
                        ...media.toObject(), // Merge Media properties into the bookmark
                    };
                }
                return bookmark.toObject(); // If no media is found, return the bookmark as is
            })
        );

        res.status(200).json(enrichedBookmarks);
    } catch (error) {
        console.error("Error fetching bookmarks:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
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

