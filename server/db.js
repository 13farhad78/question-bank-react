// /server/db.js
const mongoose = require('mongoose');

// تابع connectDB یک تابع ناهمگام (async) است
const connectDB = async () => {
    try {
        // Mongoose از متغیر محیطی MONGO_URI استفاده می‌کند
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log('✅ MongoDB connected successfully!');
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err.message);
        // اگر اتصال با مشکل مواجه شد، فرآیند را متوقف می‌کنیم.
        process.exit(1); 
    }
};

module.exports = connectDB;