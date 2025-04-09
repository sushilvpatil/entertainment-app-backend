import mongoose from "mongoose";

const TrendingSchema = new mongoose.Schema({
    mediaId: { type: mongoose.Schema.Types.ObjectId, ref: "Media", required: true },
    type: { type: String, enum: ["movie", "tv"], required: true },
    trendDate: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Trending", TrendingSchema);
