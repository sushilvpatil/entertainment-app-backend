import { fetchTrendingMovies,fetchTrendingTVShows, searchMovies,searchTVShows,fetchMovieDetails,fetchMovieURL,fetchMovieCasts,fetchTVSeries,fetchTVSeriesURL,fetchTVSeriesCast } from "../services/tmdbService.js";
import Media from "../models/Media.js";
import Cast from "../models/Cast.js";
export const getTrendingMovies = async (req, res) => {
  try {
      const trendingMovies = await Media.find({ type: "movie" }).sort({ popularity: -1 }).limit(20);
      res.status(200).json(trendingMovies);
  } catch (error) {
      console.error("Error fetching trending movies:", error.message);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
  
export const getTrendingTVShows = async (req, res) => {
  try {
      const trendingTVShows = await Media.find({ type: "tv" }).sort({ popularity: -1 }).limit(20);
      res.status(200).json(trendingTVShows);
  } catch (error) {
      console.error("Error fetching trending TV shows:", error.message);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


export const searchMoviesHandler = async (req, res) => {
  try {
      const { query, page = 1, limit = 20 } = req.query;

      // Validate the query parameter
      if (!query) {
          return res.status(400).json({ message: "Query parameter is required" });
      }

      // Search for movies in the Media collection
      const movies = await Media.find({
          title: { $regex: query, $options: "i" },
          type: "movie",
      })
          .skip((page - 1) * limit)
          .limit(parseInt(limit));

      // If no movies are found, return a 404 error
      if (!movies || movies.length === 0) {
          return res.status(404).json({ message: "No movies found" });
      }

      res.status(200).json(movies);
  } catch (error) {
      console.error("Error searching movies:", error.message);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
  
export const searchTVShowsHandler = async (req, res) => {
  try {
      const { query, page = 1, limit = 20 } = req.query;

      // Validate the query parameter
      if (!query) {
          return res.status(400).json({ message: "Query parameter is required" });
      }

      // Search for TV shows in the Media collection
      const tvShows = await Media.find({
          title: { $regex: query, $options: "i" },
          type: "tv",
      })
          .skip((page - 1) * limit)
          .limit(parseInt(limit));

      // If no TV shows are found, return a 404 error
      if (!tvShows || tvShows.length === 0) {
          return res.status(404).json({ message: "No TV shows found" });
      }

      res.status(200).json(tvShows);
  } catch (error) {
      console.error("Error searching TV shows:", error.message);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


  export const getMovieDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Media.findOne({ tmdbId: id, type: "movie" });
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json(movie);
    } catch (error) {
        console.error("Error fetching movie details:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const getTVSeriesDetails = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the TV series in the Media collection using the TMDB ID
        const tvSeries = await Media.findOne({ tmdbId: id, type: "tv" });
        if (!tvSeries) {
            return res.status(404).json({ message: "TV series not found" });
        }

        res.status(200).json(tvSeries);
    } catch (error) {
        console.error("Error fetching TV series details:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const getMovieURL = async (req, res) => {
  try {
      const { query } = req.query;

      // Validate the query parameter
      if (!query) {
          return res.status(400).json({ message: "Query parameter is required" });
      }

      // Fetch the movie from the Media collection
      const movie = await Media.findOne({ title: { $regex: query, $options: "i" }, type: "movie" });

      // If the movie is not found, return a 404 error
      if (!movie) {
          return res.status(404).json({ message: "Movie not found" });
      }

      // Return the movie URL
      res.status(200).json({ url: movie.url });
  } catch (error) {
      console.error("Error fetching movie URL:", error.message);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


export const getMovieCasts = async (req, res) => {
    try {
        const { movieId } = req.params;

        // Convert movieId to a Number since tmdbId is a Number in the Media model
        const tmdbId = Number(movieId);

        // Find the Media document using the TMDB ID
        const media = await Media.findOne({ tmdbId, type: "movie" });
        if (!media) {
            return res.status(404).json({ message: "Movie not found" });
        }

        // Fetch cast details from the Cast collection using the Media's _id
        const casts = await Cast.find({ mediaId: media._id });
        if (!casts || casts.length === 0) {
            return res.status(404).json({ message: "No cast found for this movie" });
        }

        res.status(200).json(casts);
    } catch (error) {
        console.error("Error fetching movie casts:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const getTVSeries = async (req, res) => {
  try {
      const tvSeries = await Media.find({ type: "tv" }).sort({ popularity: -1 }).limit(20);
      res.status(200).json(tvSeries);
  } catch (error) {
      console.error("Error fetching TV series:", error.message);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getTVSeriesURL = async (req, res) => {
  try {
      const { id } = req.params;
      const tvSeries = await Media.findOne({ tmdbId: id, type: "tv" });
      if (!tvSeries) {
          return res.status(404).json({ message: "TV series not found" });
      }
      res.status(200).json({ url: tvSeries.url });
  } catch (error) {
      console.error("Error fetching TV series URL:", error.message);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getTVSeriesCast = async (req, res) => {
  try {
      const { id } = req.params;

      // Find the Media document using the TMDB ID
      const media = await Media.findOne({ tmdbId: id, type: "tv" });
      if (!media) {
          return res.status(404).json({ message: "TV series not found" });
      }

      // Fetch cast details from the Cast collection using the Media's _id
      const casts = await Cast.find({ mediaId: media._id });
      if (!casts || casts.length === 0) {
          return res.status(404).json({ message: "No cast found for this TV series" });
      }

      res.status(200).json(casts);
  } catch (error) {
      console.error("Error fetching TV series cast:", error.message);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};