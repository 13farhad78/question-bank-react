// /server/routes/questionRoutes.js

// ================================================================================
// 🌐 SECTION 1: DEPENDENCIES AND INITIALIZATION
// -------------------------------------------------------------------------------
// 🧠 Concept:
//   This module defines and exports all API endpoints related to "questions".
//   It uses an Express Router instance to encapsulate routes for modularity.
//
// 💡 Tip:
//   Using separate route files per resource (e.g., /questions, /users, /auth)
//   improves scalability and keeps the codebase maintainable as it grows.
// ================================================================================

const express = require('express');
const router = express.Router();
const Question = require('../models/Question'); 


// ================================================================================
// 📄 SECTION 2: GET ROUTE → FETCH ALL QUESTIONS
// -------------------------------------------------------------------------------
// 🧠 Concept:
//   Handles HTTP GET requests sent to `/api/questions`.
//   It retrieves all documents from the `Question` collection in MongoDB.
//
// 💡 Tip:
//   Use Mongoose query filters (e.g., `.find({difficulty: 'easy'})`) to
//   expand functionality later for filtered or paginated queries.
// ================================================================================

router.get('/', async (req, res) => {
    try {
        // 🔍 Fetch all question documents from the database.
        const questions = await Question.find(); 

        // ✅ Send 200 OK along with the list of questions as JSON.
        res.status(200).json(questions);
        
    } catch (error) {
        console.error("Error fetching questions:", error);

        // ⚠️ Send a 500 Internal Server Error response if fetching fails.
        res.status(500).json({ 
            message: 'Error retrieving questions from database.',
            error: error.message
        });
    }
});


// ================================================================================
// ✏️ SECTION 3: POST ROUTE → CREATE A NEW QUESTION
// -------------------------------------------------------------------------------
// 🧠 Concept:
//   Handles HTTP POST requests to `/api/questions`.
//   It takes question data from the request body, creates a new Question
//   instance, and saves it to the database.
//
// 💡 Tip:
//   Always validate incoming request data before saving it to the database.
//   Libraries like Joi or express-validator are commonly used for this.
// ================================================================================

router.post('/', async (req, res) => {
    try {
        // 🧱 Create a new question document using request body data.
        const newQuestion = new Question(req.body);

        // 💾 Save the document into MongoDB.
        const savedQuestion = await newQuestion.save();

        // 🎉 Respond with 201 Created and the saved question object.
        res.status(201).json({
            message: 'Question saved successfully!',
            question: savedQuestion
        });
    } catch (error) {
        console.error("Error during question save:", error);

        // ⚠️ Return 400 Bad Request if validation or saving fails.
        res.status(400).json({
            message: 'Error saving question. Check required fields.',
            error: error.message
        });
    }
});


// ================================================================================
// 🚀 SECTION 4: MODULE EXPORT
// -------------------------------------------------------------------------------
// 🧠 Concept:
//   Exports the router object to be mounted in `server.js` under
//   the `/api/questions` path.
//
// 💡 Tip:
//   Keeping route definitions isolated per module ensures that new
//   routes can be added easily without affecting existing logic.
// ================================================================================

module.exports = router;


// ================================================================================
// 🧠 DEVELOPER INSIGHT
// -------------------------------------------------------------------------------
// ✅ STRENGTHS:
// - Excellent modular structure: routes separated cleanly from main server file.
// - Proper async/await usage ensures clarity and predictable error handling.
// - Clear, descriptive status codes (200, 201, 400, 500).
//
// ⚠️ IMPROVEMENT AREAS:
// - Add input validation before saving (to prevent malformed or incomplete data).
// - Consider implementing pagination for GET requests if the dataset grows.
// - Include a catch-all error-handling middleware to centralize error logic.
//
// 🚀 NEXT FEATURE IDEAS:
// - Add PUT (update) and DELETE routes for full CRUD coverage.
// - Support search and filtering (e.g., /api/questions?type=reading).
// - Add authentication/authorization middleware (e.g., only teachers can add).
// - Implement rate limiting to prevent abuse of the API.
// ================================================================================
