import axios from "axios";
import Media from "../models/Media.js";
import dotenv from "dotenv";
import Cast from "../models/Cast.js";
dotenv.config();

const BASE_URL = process.env.TMDB_BASE_URL;
const token = process.env.TMDB_ACCESS_TOKEN;
const TMDB_API_KEY = process.env.TMDB_API_KEY; // Store your API key in .env
// Create an axios instance with Authorization header
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`
    }
});

export const storeTrendingMovies = async (req, res) => {
    try {
        // Ensure no request body is sent
        if (Object.keys(req.body).length > 0) {
            return res.status(400).json({ message: "No request body required" });
        }

        // Fetch trending movies from TMDB
        const url = `${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`;
        const response = await axios.get(url);

        const movies = response.data.results;

        // Map and save movies to the database
        for (const movie of movies) {
            const mediaData = {
                tmdbId: movie.id,
                type: "movie",
                title: movie.title,
                overview: movie.overview,
                posterPath: movie.poster_path,
                backdropPath: movie.backdrop_path,
                releaseDate: movie.release_date,
                genres: movie.genre_ids.map((id) => ({ id })), // Map genre IDs
                popularity: movie.popularity,
                voteAverage: movie.vote_average,
                voteCount: movie.vote_count,
                url: `https://www.themoviedb.org/movie/${movie.id}`,
            };

            // Check if the movie already exists in the database
            const existingMedia = await Media.findOne({ tmdbId: movie.id });
            if (!existingMedia) {
                await Media.create(mediaData);
            } else {
                // Update the existing movie if it already exists
                await Media.updateOne({ tmdbId: movie.id }, mediaData);
            }
        }

        res.status(201).json({ message: "Trending movies stored successfully" });
    } catch (error) {
        console.error("Error storing trending movies:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const storeTrendingTVShows = async (req, res) => {
    try {
        const response = await axiosInstance.get("/trending/tv/week");

        const tvShows = response.data.results;

        for (const tv of tvShows) {
            const mediaData = {
                tmdbId: tv.id,
                title: tv.name,
                type: "tv",
                overview: tv.overview,
                firstAirDate: tv.first_air_date,
                posterPath: tv.poster_path,
                backdropPath: tv.backdrop_path,
                popularity: tv.popularity,
                genres: tv.genre_ids.map((id) => ({ id })), // Map genre IDs
                voteAverage: tv.vote_average,
                voteCount: tv.vote_count,
                url: `https://www.themoviedb.org/tv/${tv.id}`,
            };

            // Check if the TV show already exists in the database
            const existingMedia = await Media.findOne({ tmdbId: tv.id });
            if (!existingMedia) {
                await Media.create(mediaData);
            } else {
                await Media.updateOne({ tmdbId: tv.id }, mediaData);
            }
        }

        res.status(201).json({ message: "Trending TV Shows stored successfully" });
    } catch (error) {
        console.error("Error storing trending TV shows:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const storeMovieDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axiosInstance.get(`/movie/${id}`, {
            params: { append_to_response: "credits" },
        });

        const movie = response.data;
        console.log("data is :",movie);
        const mediaData = {
            tmdbId: movie.id,
            title: movie.title,
            type: "movie",
            overview: movie.overview,
            releaseDate: movie.release_date,
            posterPath: movie.poster_path,
            backdropPath: movie.backdrop_path,
            genres: movie.genres.map((g) => ({ id: g.id, name: g.name })),
            voteAverage: movie.vote_average,
            voteCount: movie.vote_count,
            runtime: movie.runtime,
            cast: movie.credits.cast.map((c) => ({
                id: c.id,
                name: c.name,
                character: c.character,
                profilePath: c.profile_path,
            })),
            url: `https://www.themoviedb.org/movie/${movie.id}`,
        };

        await Media.findOneAndUpdate({ tmdbId: id }, mediaData, { upsert: true });

        res.status(201).json({ message: "Movie details stored successfully" });
    } catch (error) {
        console.error("Error storing movie details:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const storeCastDetails = async (req, res) => {
    try {
        const { mediaId } = req.params;

        // Find the corresponding Media document
        const media = await Media.findOne({ tmdbId: mediaId });
        if (!media) {
            return res.status(404).json({ message: "Media not found" });
        }

        // Determine the correct endpoint based on the media type
        const endpoint = media.type === "movie" ? `/movie/${mediaId}/credits` : `/tv/${mediaId}/credits`;

        // Fetch the cast details from TMDB
        const response = await axiosInstance.get(endpoint);
        const cast = response.data.cast;

        // Iterate over the cast array and save each cast member to the database
        for (const member of cast) {
            const castData = {
                tmdbId: member.id,
                mediaId: media._id, // Reference to the Media document
                name: member.name,
                character: member.character,
                profilePath: member.profile_path,
            };

            // Use upsert to avoid duplicate key errors
            await Cast.updateOne(
                { tmdbId: member.id, mediaId: media._id },
                castData,
                { upsert: true }
            );
        }

        res.status(201).json({ message: "Cast details stored successfully" });
    } catch (error) {
        console.error("Error storing cast details:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
export const storeMediaURL = async (req, res) => {
    let type; // Declare type outside the try block
    try {
        const { mediaId } = req.params;
        type = req.params.type; // Assign type from req.params

        const response = await axiosInstance.get(`/${type}/${mediaId}`);
        console.log("response is :",response.data);
        const mediaUrl = `https://www.themoviedb.org/${type}/${response.data.id}`;

        await Media.findOneAndUpdate(
            { tmdbId: mediaId },
            { url: mediaUrl },
            { upsert: true }
        );

        res.status(201).json({ message: `${type} URL stored successfully` });
    } catch (error) {
        console.error(`Error storing ${type} URL:`, error.message); // type is now accessible here
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const storeTVShowDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axiosInstance.get(`/tv/${id}`, {
            params: { append_to_response: "credits" },
        });

        const tvShow = response.data;

        const mediaData = {
            tmdbId: tvShow.id,
            title: tvShow.name,
            type: "tv",
            overview: tvShow.overview,
            firstAirDate: tvShow.first_air_date,
            posterPath: tvShow.poster_path,
            backdropPath: tvShow.backdrop_path,
            genres: tvShow.genres.map((g) => ({ id: g.id, name: g.name })),
            voteAverage: tvShow.vote_average,
            voteCount: tvShow.vote_count,
            numberOfSeasons: tvShow.number_of_seasons,
            numberOfEpisodes: tvShow.number_of_episodes,
            cast: tvShow.credits.cast.map((c) => ({
                id: c.id,
                name: c.name,
                character: c.character,
                profilePath: c.profile_path,
            })),
            url: `https://www.themoviedb.org/tv/${tvShow.id}`,
        };

        await Media.findOneAndUpdate({ tmdbId: id }, mediaData, { upsert: true });

        res.status(201).json({ message: "TV Show details stored successfully" });
    } catch (error) {
        console.error("Error storing TV show details:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
