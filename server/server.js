// /server/server.js

// ================================================================================
// 🧩 SECTION 1: CONFIGURATION & DEPENDENCIES
// -------------------------------------------------------------------------------
// 🧠 Concept:
//   This section sets up the core environment and brings in essential dependencies
//   used across the backend. It ensures all critical variables and libraries are
//   available before the server starts running.
//
// 💡 Tip:
//   Always keep your configuration imports at the top of the entry file to maintain
//   clarity and predictable execution order.
// ================================================================================

// 🧾 Loads environment variables from the `.env` file into process.env.
// Keeps sensitive credentials (like MONGO_URI, API keys) out of the codebase.
require('dotenv').config(); 

// ⚙️ Express: the backbone of your Node.js web server.
// Handles HTTP requests, routing, middleware, and responses efficiently.
const express = require('express'); 

// 🌐 CORS (Cross-Origin Resource Sharing): enables your frontend (on another origin)
// to communicate safely with this backend. Vital for local dev with React/Vite.
const cors = require('cors'); 

// 🏗️ Creates an instance of the Express app to configure routes and middleware.
const app = express();

// ⚡ Defines which port the server listens on. Falls back to 5000 if not specified.
// Good practice: use environment variables for all deployment-specific values.
const PORT = process.env.PORT || 5000;


// ================================================================================
// 🧱 SECTION 2: INTERNAL MODULE IMPORTS
// -------------------------------------------------------------------------------
// 🧠 Concept:
//   Instead of writing all logic in one file, the app is modularized — database
//   connection, routing, and business logic each live in their own dedicated files.
//
// 🔍 Key Takeaway:
//   This is the foundation for scalability. Each new domain (e.g., users, lessons)
//   can later have its own route and controller folder.
// ================================================================================

// 🗄️ Imports the function responsible for connecting to MongoDB.
const connectDB = require('./db');

// 🚦 Imports question-related API routes (e.g., GET, POST, DELETE).
// ✅ Scalability Tip: Each route group should live in its own file inside /routes.
const questionRoutes = require('./routes/questionRoutes');


// ================================================================================
// 🧩 SECTION 3: MIDDLEWARE SETUP
// -------------------------------------------------------------------------------
// 🧠 Concept:
//   Middleware are functions that run *before* your route handlers.
//   They process the request, validate data, log activity, or modify headers.
//
// 🚧 Order matters — middleware is executed in the order they are defined.
// ================================================================================

// 🌐 Enables secure cross-origin communication between frontend & backend.
app.use(cors({
    // 🎯 Restricts allowed origins to your React dev server for safety.
    origin: 'http://localhost:5173', 
    // Defines allowed HTTP methods — helps prevent accidental misuse.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // Enables cookies or tokens to be sent with requests (optional but handy).
    credentials: true,
}));

// 📦 Built-in JSON parser middleware.
// Converts incoming JSON requests into usable JavaScript objects at req.body.
// 🧠 Without this, req.body will be undefined for POST/PUT requests.
app.use(express.json()); 


// ================================================================================
// 🚏 SECTION 4: ROUTE CONNECTIONS
// -------------------------------------------------------------------------------
// 🧠 Concept:
//   Routes determine *what happens* when the server receives specific requests.
//   Each group of endpoints (e.g., /api/questions) is handled by a separate router.
//
// 💡 Tip:
//   Prefixing routes (e.g., '/api/questions') keeps the API structure clean.
// ================================================================================

// 🔗 Mounts the question-related API routes.
// Example: POST /api/questions → handled inside questionRoutes.js
app.use('/api/questions', questionRoutes);

// 🩺 Basic root route — used for health checks or verifying server status.
// Example usage: opening http://localhost:5000 in a browser.
app.get('/', (req, res) => {
    res.send('Question Bank Backend is running!');
});


// ================================================================================
// 🚀 SECTION 5: SERVER INITIALIZATION & DATABASE CONNECTION
// -------------------------------------------------------------------------------
// 🧠 Concept:
//   This final part initializes your database and starts the server listener.
//
// ⚡ Best Practice:
//   In production-grade apps, the server should start *only after* the database
//   successfully connects. For simplicity, this version allows both in parallel.
// ================================================================================

// 🔌 Connects to MongoDB using async logic in ./db.
// Database errors are handled internally in that module.
connectDB(); 

// 🏁 Starts the Express server.
// Confirms successful startup with console logs — crucial for debugging.
app.listen(PORT, () => {
    console.log(`Server is running in development mode on port ${PORT}`);
    console.log(`Press Ctrl + C to stop`);
});

// 🧰 FUTURE IMPROVEMENT:
// - Add structured logging (e.g., Winston or Pino)
// - Include centralized error-handling middleware
// - Implement graceful shutdown for database and server (SIGINT handling)


// ================================================================================
// 🧠 DEVELOPER INSIGHT
// -------------------------------------------------------------------------------
// ✅ STRENGTHS:
// - Short bullet list of what’s working well.
//
// ⚠️ IMPROVEMENT AREAS:
// - Practical notes on potential refactors, structure, or readability.
//
// 🚀 NEXT FEATURE IDEAS:
// - Suggestions for next logical steps in scaling, modularity, or new features.
// ================================================================================
