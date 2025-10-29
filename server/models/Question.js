// /server/models/Question.js

const mongoose = require('mongoose');

// 🧩 Define the Question schema that represents each question document in MongoDB.
const QuestionSchema = new mongoose.Schema({
    // Type of the question (e.g., multiple_choice, reading, matching)
    question_type: { 
        type: String, 
        required: true 
    },

    // The main question content (text, options, reading passage, etc.)
    // Using "Mixed" allows flexible structures depending on question_type.
    question_data: { 
        type: mongoose.Schema.Types.Mixed, 
        required: true 
    },

    // Basic metadata for the question (grade, subject, difficulty, etc.)
    // Also flexible to support future extension.
    basic_info: { 
        type: mongoose.Schema.Types.Mixed, 
        required: true 
    },

    questionSource : {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },

    score_value: {
      type : Number,
      required: true
    },
    
    // Optional field to mark a question as active/inactive (for future filtering)
    is_active: { 
        type: Boolean, 
        default: true 
    },
    
    // Timestamp for creation, automatically set by default
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Export the model so it can be used in route handlers or controllers
module.exports = mongoose.model('Question', QuestionSchema);

/* 
──────────────────────────────────────────────
🧠 Developer Insight:
──────────────────────────────────────────────
- The use of "Mixed" types here is intentional and strategic:
  it lets each question_type define its own unique structure
  without forcing a rigid schema early on.

- Once the data structure stabilizes, consider splitting this
  into multiple specialized schemas (e.g., MultipleChoiceSchema,
  ReadingSchema) and linking them via "discriminators" or references.

- The field "is_active" will be valuable later for soft-deletion or
  archiving old questions without physically removing them.

- For scalability, you can add indexing (e.g., { createdAt: -1 })
  or constraints later as data volume grows.
*/
