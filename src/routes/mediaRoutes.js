import express from "express";
import { storeTrendingMovies ,storeTrendingTVShows,  storeMovieDetails, storeTVShowDetails,   storeCastDetails,    storeMediaURL} from "../controllers/mediaController.js";
const router = express.Router();

router.get("/store/trending/movies", storeTrendingMovies);
router.get("/store/trending/tv", storeTrendingTVShows);
router.get("/store/movie/details/:id", storeMovieDetails);
router.get("/store/tv/details/:id", storeTVShowDetails);
router.get("/store/cast/:mediaId", storeCastDetails);
router.get("/store/url/:type/:mediaId", storeMediaURL);

export default router;
