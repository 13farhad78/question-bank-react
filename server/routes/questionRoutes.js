// /server/routes/questionRoutes.js

const express = require('express');
const router = express.Router();
const Question = require('../models/Question'); // 💡 یک سطح به عقب برمی‌گردیم

// مسیر POST /api/questions
router.post('/', async (req, res) => {
    try {
        const newQuestion = new Question(req.body);
        const savedQuestion = await newQuestion.save();

        res.status(201).json({
            message: 'Question saved successfully!',
            question: savedQuestion
        });
    } catch (error) {
        // این خطاها معمولاً خطاهای اعتبارسنجی دیتابیس هستند (مثل required بودن فیلد)
        console.error("Error during question save:", error);
        res.status(400).json({
            message: 'Error saving question. Check required fields.',
            error: error.message
        });
    }
});

module.exports = router;