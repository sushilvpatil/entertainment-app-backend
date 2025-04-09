import mongoose from "mongoose";

const CastSchema = new mongoose.Schema({
    tmdbId: { type: Number, required: true },
    mediaId: { type: mongoose.Schema.Types.ObjectId, ref: "Media", required: true },
    name: { type: String, required: true },
    character: { type: String },
    profilePath: { type: String },
}, { timestamps: true });

// Add a compound unique index on tmdbId and mediaId
CastSchema.index({ tmdbId: 1, mediaId: 1 }, { unique: true });

export default mongoose.model("Cast", CastSchema);