// /server/models/Question.js

const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    // نوع سوال (مثلاً: multiple_choice, Reading) - این الزامی است
    question_type: { 
        type: String, 
        required: true 
    },

    // داده‌های اصلی سوال (متن سوال، گزینه‌ها، متن ریدینگ و ...)
    // از نوع Mixed استفاده می‌کنیم زیرا ساختار آن بر اساس question_type تغییر می‌کند.
    question_data: { 
        type: mongoose.Schema.Types.Mixed, 
        required: true 
    },

    // اطلاعات عمومی سوال (درجه، درس، سختی)
    // ساختار این هم آبجکت است.
    basic_info: { 
        type: mongoose.Schema.Types.Mixed, 
        required: true 
    },
    
    // فیلدهای اختیاری برای ردیابی
    is_active: { 
        type: Boolean, 
        default: true 
    },
    
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// صادر کردن مدل برای استفاده در فایل‌های دیگر
module.exports = mongoose.model('Question', QuestionSchema);