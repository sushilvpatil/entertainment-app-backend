🎬 Entertainment App Backend
This is the backend service for the Entertainment App, a full-stack media platform that allows users to explore trending movies and TV shows, bookmark their favorites, and manage their profile. It integrates with TMDB for real-time media data.

Built with:

Node.js + Express.js

MongoDB with Mongoose

JWT Authentication

Swagger API Docs


🚀 Features
🔐 User Authentication
Register and login with hashed passwords.

Secure JWT token-based authentication for protected routes.

🔖 Bookmarks
Add, retrieve, and delete bookmarked movies/TV shows.

Each bookmark is associated with a logged-in user.

📺 Media Information (via TMDB)
Get trending movies and TV shows.

Search movies/TV by title.

Get detailed information including cast

📄 API Documentation
Live Swagger docs available at:

http://localhost:5000/api-docs

or on deployment:
https://ecommerce-backend-5-ocnz.onrender.com/api-docs


📁 Project Structure

entertainment-app-backend/
│
├── src/
│   ├── controllers/      # Business logic for handling requests
│   ├── middleware/       # JWT and other middlewares
│   ├── models/           # Mongoose models
│   ├── routes/           # All route handlers
│   ├── config/           # Environment and DB config
│
├── docs/
│   └── swagger.yaml      # Full API documentation in OpenAPI format
│
├── index.js              # Server entry point
├── .env                  # Environment variables (excluded from Git)
├── package.json          # Project metadata and dependencies


nstallation & Setup
✅ Prerequisites
Node.js (v14 or higher)

MongoDB (local or cloud like MongoDB Atlas)

TMDB API Key (sign up here)

📌 Environment Variables
Create a .env file in the root:
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
TMDB_API_KEY=<your_tmdb_api_key>
TMDB_ACCESS_TOKEN=<your_tmdb_access_token>
TMDB_BASE_URL=https://api.themoviedb.org/3

Install Dependencies

npm install

Start Server

npm run dev

The server will be running at:

http://localhost:5000


📚 API Overview
🧑‍💼 Authentication
Method	Endpoint	Description
POST	/auth/register	Register a new user
POST	/auth/login	Login and get a token


User Profile
Method	Endpoint	Description
GET	/users/profile	Get profile info of the logged-in user
PUT	/users/update	Update profile (name, email, password)

🔖 Bookmarks
Method	Endpoint	Description
POST	/bookmark	Add a bookmark
GET	/bookmarks	Get all bookmarks
DELETE	/bookmarks/{itemId}	Remove a bookmark (by TMDB ID)

 Movies (via TMDB)
Method	Endpoint	Description
GET	/tmdb/movies/trending	Get trending movies
GET	/tmdb/movies/details/{id}	Get movie details
GET	/tmdb/movies/{movieId}/casts	Get movie cast


📺 TV Shows (via TMDB)
Method	Endpoint	Description
GET	/tmdb/tv/trending	Get trending TV shows
GET	/tmdb/tv/details/{id}	Get TV show details
GET	/tmdb/tv-series/{id}/casts	Get cast for a TV show


http://localhost:5000/api-docs


https://ecommerce-backend-5-ocnz.onrender.com/api-docs


🤝 Contributing
We welcome contributions!
Feel free to open an issue or submit a pull request for enhancements or bug fixes.

 License
This project is licensed under the MIT License.
