# Entertainment App Backend

This is the backend service for the **Entertainment App**, which provides APIs for user authentication, managing bookmarks, and fetching movie/TV show details. The backend is built using **Node.js**, **Express**, and **MongoDB**, and integrates with **TMDB (The Movie Database)** for fetching trending and detailed media information.

---

## Features

- **User Authentication**:
  - Register and login users with secure password hashing.
  - JWT-based authentication for protected routes.

- **Bookmarks**:
  - Add, retrieve, and delete bookmarks for movies and TV shows.

- **Media Information**:
  - Fetch trending movies and TV shows.
  - Search for movies and TV shows.
  - Get detailed information about movies and TV shows, including cast details.

- **Swagger Documentation**:
  - Comprehensive API documentation available at `/api-docs`.

---

## Project Structure

entertainment-app-backend
├── src
│ ├── controllers\ # Business logic for handling requests │ ├── middleware\ # Authentication and other middleware │ ├── models\ # Mongoose models for MongoDB │ ├── routes\ # API route definitions │ ├── config\ # Database and environment configurations ├── docs
│ └── swagger.yaml # Swagger API documentation ├── index.js # Main entry point for the application ├── package.json # Project dependencies and scripts ├── .env # Environment variables (excluded from version control)


---

## API Documentation

The API is documented using **Swagger**. You can access the documentation by running the server and navigating to:

https://ecommerce-backend-5-ocnz.onrender.com/api-docs



### How to Use the Swagger Documentation

1. Start the server:
   ```bash
   npm run dev


   http://localhost:5000/api-docs



   Installation and Setup
Prerequisites
Node.js (v14 or higher)
MongoDB (local or cloud instance)
TMDB API Key (for fetching movie/TV data)
Steps to Run the Project
Clone the repository:
git clone https://github.com/your-username/entertainment-app-backend.git

cd entertainment-app-backend

npm install

PORT=5000
ongodbMONGO_URI=<your-m-connection-string>
JWT_SECRET=<your-jwt-secret>
TMDB_API_KEY=<your-tmdb-api-key>
TMDB_ACCESS_TOKEN=<your-tmdb-access-token>
TMDB_BASE_URL=https://api.themoviedb.org/3

 start the server
npm start or npm run dev

The server will run at:
http://localhost:5000


vailable APIs
Authentication
POST /auth/register: Register a new user.
POST /auth/login: Log in a user and get a JWT token.
User Profile
GET /users/profile: Get the authenticated user's profile.
PUT /users/update: Update the authenticated user's profile (name, email, profile image, or password).

Bookmarks
POST /bookmark: Add a new bookmark.
GET /bookmarks: Get all bookmarks for the authenticated user.
DELETE /bookmarks/{itemId}: Delete a bookmark by its TMDB ID.
Movies
GET /tmdb/movies/trending: Get trending movies.
GET /tmdb/movies/details/{id}: Get details of a specific movie.
GET /tmdb/movies/{movieId}/casts: Get cast details for a specific movie.

Movies
GET /tmdb/movies/trending: Get trending movies.
GET /tmdb/movies/details/{id}: Get details of a specific movie.
GET /tmdb/movies/{movieId}/casts: Get cast details for a specific movie.
TV Shows
GET /tmdb/tv/trending: Get trending TV shows.
GET /tmdb/tv/details/{id}: Get details of a specific TV show.
GET /tmdb/tv-series/{id}/casts: Get cast details for a specific TV show.

Contributing
Contributions are welcome! If you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request.