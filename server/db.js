// /server/db.js

// ================================================================================
// 🧩 SECTION 1: DEPENDENCIES
// -------------------------------------------------------------------------------
// 🧠 Concept:
//   This file manages the database connection logic using Mongoose, which provides
//   an elegant abstraction over MongoDB’s native driver.
//
// 💡 Tip:
//   Keep database connection logic in a single dedicated module. This ensures
//   consistent handling of connection errors and easier migration if you ever
//   switch databases.
// ================================================================================

const mongoose = require('mongoose');


// ================================================================================
// ⚙️ SECTION 2: DATABASE CONNECTION FUNCTION
// -------------------------------------------------------------------------------
// 🧠 Concept:
//   The `connectDB` function initializes the MongoDB connection asynchronously.
//   It attempts to connect using the connection string from the environment
//   variables and provides feedback in the terminal.
//
// 💡 Tip:
//   Always wrap asynchronous connection logic in a try/catch block to ensure
//   the server fails gracefully if the database isn’t reachable.
// ================================================================================

const connectDB = async () => {
    try {
        // 🔌 Establish connection using environment variable MONGO_URI.
        // The `mongoose.connect()` method returns a Promise that resolves when
        // the connection is successful.
        await mongoose.connect(process.env.MONGO_URI);

        console.log('✅ MongoDB connected successfully!');
    } catch (err) {
        // ❌ If an error occurs during connection, log it for debugging.
        console.error('❌ MongoDB connection failed:', err.message);

        // 🛑 Exit the process with a non-zero code to indicate a fatal error.
        process.exit(1); 
    }
};


// ================================================================================
// 🚀 SECTION 3: MODULE EXPORT
// -------------------------------------------------------------------------------
// 🧠 Concept:
//   Exporting the `connectDB` function allows it to be imported and executed
//   from the main server file (`server.js`) before the app starts listening.
//
// 💡 Tip:
//   Keep exports minimal and intentional — only export what needs to be used
//   externally to maintain a clean module interface.
// ================================================================================

module.exports = connectDB;


// ================================================================================
// 🧠 DEVELOPER INSIGHT
// -------------------------------------------------------------------------------
// ✅ STRENGTHS:
// - Cleanly structured async connection with error handling.
// - Uses environment variable for connection string (great for security).
// - Graceful process termination prevents undefined behavior on DB failure.
//
// ⚠️ IMPROVEMENT AREAS:
// - Consider adding retry logic (e.g., reconnect every 5 seconds if DB is down).
// - Add more detailed logging (like `err.stack`) in development mode.
// - You could separate configuration (URI options) into a dedicated config file.
//
// 🚀 NEXT FEATURE IDEAS:
// - Implement event listeners: `mongoose.connection.on('disconnected', ...)`
//   to handle reconnection or alert systems.
// - Use a logger library (e.g., Winston) for structured DB logs.
// - Add connection pool monitoring for performance tracking.
// ================================================================================
