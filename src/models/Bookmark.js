import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    itemId: { type: String, required: true }, // Movie or TV Series ID
    itemType: { type: String, enum: ["movie", "tv"], required: true },
    title: { type: String, required: true },
    posterPath: { type: String }, // Optional
}, { timestamps: true });

export default mongoose.model("Bookmark", bookmarkSchema);
