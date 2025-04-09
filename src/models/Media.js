import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema({
    tmdbId: { type: Number, required: true, unique: true },
    type: { type: String, enum: ["movie", "tv"], required: true },
    title: { type: String },
    name: { type: String }, // for TV shows
    overview: { type: String },
    posterPath: { type: String },
    backdropPath: { type: String },
    releaseDate: { type: String },
    firstAirDate: { type: String }, // for TV shows
    genres: [{ id: Number, name: String }],
    popularity: { type: Number },
    voteAverage: { type: Number },
    voteCount: { type: Number },
    homepage: { type: String },
    imdbId: { type: String },
    url: { type: String }, // TMDB URL
}, { timestamps: true });

export default mongoose.model("Media", MediaSchema);
