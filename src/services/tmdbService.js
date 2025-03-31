import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const TMDB_API_KEY = process.env.TMDB_API_KEY; // Store your API key in .env
const BASE_URL = process.env.TMDB_BASE_URL;;
const token=process.env.TMDB_ACCESS_TOKEN; // Store your API token in .env
export const fetchTrendingMovies = async () => {
    try {
     
      const url = `${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`;
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) { 
      console.error("Error fetching trending movies:", error.message);
      return "Internel Server Error" // Return an empty array to prevent frontend crashes
    }
  };
  
  export const fetchTrendingTVShows = async () => {
    try {
      const url = `${BASE_URL}/trending/tv/week?api_key=${TMDB_API_KEY}`;
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching trending TV shows:", error.message);
      return "Internel Server Error";
    }
  };
  

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  
  export const searchMovies = async (query, page = 1) => {
    try {
      const response = await axiosInstance.get("/search/movie", {
        params: {
          query: query,
          page: page,
          include_adult: false, // optional
          language: "en-US"    // optional
        }
      });
      return response.data;
    } catch (error) {
      console.error("TMDB API Error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.status_message || 
        "Failed to search movies"
      );
    }
  };
  
  export const searchTVShows = async (query, page = 1) => {
    try {
      const response = await axiosInstance.get("/search/tv", {
        params: {
          query: query,
          page: page,
          include_adult: false,
          language: "en-US"
        }
      });
      return response.data;
    } catch (error) {
      console.error("TMDB API Error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.status_message || 
        "Failed to search TV shows"
      );
    }
  };


  export const fetchMovieDetails = async (id) => {
    try {
        const response = await axiosInstance.get(`/movie/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error.response?.data || error.message);
        return "Internal Server Error";
    }
};

export const fetchMovieURL = async (query) => {
  try {
      const response = await axiosInstance.get("/search/movie", {
          params: { query, include_adult: false, language: "en-US" }
      });

      if (response.data.results.length === 0) {
          return null;  // No movie found
      }

      const movie = response.data.results[0]; // Get the first matching movie
      return {
          id: movie.id,
          title: movie.title,
          url: `https://www.themoviedb.org/movie/${movie.id}`
      };
  } catch (error) {
      console.error("Error fetching movie URL:", error.message);
      return "Internal Server Error";
  }
};


export const fetchMovieCasts = async (movieId) => {
  try {
      const response = await axiosInstance.get(`/movie/${movieId}/credits`);

      if (!response.data.cast || response.data.cast.length === 0) {
          return null;  // No cast found
      }

      // Extract only important details
      const castDetails = response.data.cast.map((member) => ({
          id: member.id,
          name: member.name,
          character: member.character,
          profile_path: member.profile_path ? `https://image.tmdb.org/t/p/w500${member.profile_path}` : null
      }));

      return castDetails;
  } catch (error) {
      console.error("Error fetching movie casts:", error.message);
      return "Internal Server Error";
  }
};

export const fetchTVSeries = async (query) => {
  try {
      const response = await axiosInstance.get("/search/tv", {
          params: { query, include_adult: false, language: "en-US" }
      });

      if (!response.data.results || response.data.results.length === 0) {
          return null;  // No TV series found
      }

      // Extract relevant data for the response
      const tvSeriesList = response.data.results.slice(0, 14).map((tv) => ({
          id: tv.id,
          name: tv.name,
          overview: tv.overview,
          first_air_date: tv.first_air_date,
          poster_path: tv.poster_path ? `https://image.tmdb.org/t/p/w500${tv.poster_path}` : null
      }));

      return tvSeriesList;
  } catch (error) {
      console.error("Error fetching TV series:", error.message);
      return "Internal Server Error";
  }
};

export const fetchTVSeriesURL = async (tvId) => {
  try {
      const response = await axiosInstance.get(`/tv/${tvId}`, {
          params: { append_to_response: "external_ids", language: "en-US" }
      });

      if (!response.data) {
          return null;  // No data found
      }

      return {
          id: response.data.id,
          name: response.data.name,
          homepage: response.data.homepage || null, // Official website link
          imdb_id: response.data.external_ids?.imdb_id || null, // IMDB link
      };
  } catch (error) {
      console.error("Error fetching TV series URL:", error.message);
      return "Internal Server Error";
  }
};

export const fetchTVSeriesCast = async (tvId) => {
  try {
      const response = await axiosInstance.get(`/tv/${tvId}/credits`, {
          params: { language: "en-US" }
      });

      if (!response.data || !response.data.cast) {
          return null; // No cast data found
      }

      return response.data.cast.map((cast) => ({
          id: cast.id,
          name: cast.name,
          character: cast.character,
          profile_path: cast.profile_path ? `https://image.tmdb.org/t/p/w500${cast.profile_path}` : null
      }));
  } catch (error) {
      console.error("Error fetching TV series cast:", error.message);
      return "Internal Server Error";
  }
};
