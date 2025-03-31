import { fetchTrendingMovies,fetchTrendingTVShows, searchMovies,searchTVShows,fetchMovieDetails,fetchMovieURL,fetchMovieCasts,fetchTVSeries,fetchTVSeriesURL,fetchTVSeriesCast } from "../services/tmdbService.js";
export const getTrendingMovies = async (req, res) => {
    try {
      const movies = await fetchTrendingMovies();
      if(movies==="Internel Server Error"){
        return res.status(500).json({ message: "Error fetching trending  shows" });
      }
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: "Error fetching trending movies" });
    }
  };
  
  export const getTrendingTVShows = async (req, res) => {
    try {
      const tvShows = await fetchTrendingTVShows();
      if(tvShows==="Internel Server Error"){
        return res.status(500).json({ message: "Error fetching trending  shows" });
      }
      res.json(tvShows);
    } catch (error) {
      res.status(500).json({ message: "Error fetching trending TV shows" });
    }
  };


  export const searchMoviesHandler = async (req, res) => {
    try {
      const { query, page } = req.query;
      if (!query) {
        return res.status(400).json({ message: "Query parameter is required" });
      }
      const results = await searchMovies(query, page || 1);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Error searching movies", error: error.message });
    }
  };
  
  export const searchTVShowsHandler = async (req, res) => {
    try {
      const { query, page } = req.query;
      if (!query) {
        return res.status(400).json({ message: "Query parameter is required" });
      }
      const results = await searchTVShows(query, page || 1);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Error searching TV shows", error: error.message });
    }
  };


  export const getMovieDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await fetchMovieDetails(id);

        if (movie === "Internal Server Error") {
            return res.status(500).json({ message: "Error fetching movie details" });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movie details" });
    }
};

export const getMovieURL = async (req, res) => {
  try {
      const { query } = req.query;
      if (!query) {
          return res.status(400).json({ message: "Query parameter is required" });
      }

      const movieData = await fetchMovieURL(query);

      if (!movieData) {
          return res.status(404).json({ message: "Movie not found" });
      }

      res.json(movieData);
  } catch (error) {
      res.status(500).json({ message: "Error fetching movie URL", error: error.message });
  }
};


export const getMovieCasts = async (req, res) => {
  try {
      const { movieId } = req.params;
      if (!movieId) {
          return res.status(400).json({ message: "Movie ID is required" });
      }

      const casts = await fetchMovieCasts(movieId);

      if (!casts) {
          return res.status(404).json({ message: "Cast information not found" });
      }

      res.json(casts);
  } catch (error) {
      res.status(500).json({ message: "Error fetching movie casts", error: error.message });
  }
};



export const getTVSeries = async (req, res) => {
  try {
      const { search } = req.query;
      if (!search) {
          return res.status(400).json({ message: "Search parameter is required" });
      }

      const tvSeries = await fetchTVSeries(search);

      if (!tvSeries) {
          return res.status(404).json({ message: "Page Not Found" });
      }

      res.json(tvSeries);
  } catch (error) {
      res.status(500).json({ message: "Error fetching TV series", error: error.message });
  }
};

export const getTVSeriesURL = async (req, res) => {
  try {
      const { id } = req.params; // Extract TV series ID from request params

      if (!id) {
          return res.status(400).json({ message: "TV series ID is required" });
      }

      const tvSeriesURL = await fetchTVSeriesURL(id);

      if (!tvSeriesURL) {
          return res.status(404).json({ message: "Page Not Found" });
      }

      res.json(tvSeriesURL);
  } catch (error) {
      res.status(500).json({ message: "Error fetching TV series URL", error: error.message });
  }
};

export const getTVSeriesCast = async (req, res) => {
  try {
      const { id } = req.params; // Extract TV series ID from request params

      if (!id) {
          return res.status(400).json({ message: "TV series ID is required" });
      }

      const tvSeriesCast = await fetchTVSeriesCast(id);

      if (!tvSeriesCast) {
          return res.status(404).json({ message: "Page Not Found" });
      }

      res.json(tvSeriesCast);
  } catch (error) {
      res.status(500).json({ message: "Error fetching TV series cast", error: error.message });
  }
};