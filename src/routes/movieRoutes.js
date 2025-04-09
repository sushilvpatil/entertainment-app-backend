import express from 'express';
//import { fetchTrendingMovies,fetchTrendingTVShows } from '../services/tmdbService';
import authMiddleware from '../middleware/authMiddleware.js';
import { getTrendingMovies,getTrendingTVShows } from '../controllers/movieController.js';
import { searchMoviesHandler, searchTVShowsHandler, getMovieDetails,getMovieURL,getMovieCasts,getTVSeries,getTVSeriesURL,getTVSeriesCast,getTVSeriesDetails} from '../controllers/movieController.js';
const router = express.Router();

router.get("/movies/trending",authMiddleware, getTrendingMovies);
router.get("/tv/trending",authMiddleware, getTrendingTVShows);
router.get("/search/movies",authMiddleware, searchMoviesHandler);
router.get("/search/tv",authMiddleware, searchTVShowsHandler);
router.get("/movies/details/:id", authMiddleware, getMovieDetails);
router.get("/tv/details/:id", authMiddleware, getTVSeriesDetails);
router.get("/search/movie-url", authMiddleware, getMovieURL);
router.get("/movies/:movieId/casts", authMiddleware, getMovieCasts);
router.get("/search/tv-series", authMiddleware, getTVSeries);
router.get("/tv-series/:id/url", authMiddleware, getTVSeriesURL);
router.get("/tv-series/:id/casts", authMiddleware, getTVSeriesCast);
export default router;