// /server/server.js

// 1. Import پکیج‌های مورد نیاز
require('dotenv').config();
const express = require('express');
const cors = require('cors'); // 👈 اضافه شدن پکیج CORS
const app = express();
const PORT = process.env.PORT || 5000;

// 2. Import توابع و ماژول‌های داخلی
const connectDB = require('./db');
const questionRoutes = require('./routes/questionRoutes');

// =========================================================
// MIDDLEWARE (ترتیب اهمیت دارد)
// =========================================================

// 🟢 CORS: باید در ابتدای Middlewareها قرار گیرد تا درخواست‌های Preflight (OPTIONS) را پوشش دهد.
app.use(cors({
    // 💡 مهم: مشخص کردن دقیق مبدأ Frontend برای رفع خطای CORS
    // اگر پورت فرانت‌اند شما 5173 است، آن را اینجا ذکر کنید.
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// 🟢 JSON Parser: برای خواندن بدنه درخواست‌های POST
app.use(express.json()); 

// =========================================================
// ROUTES
// =========================================================

// اتصال روت‌های مربوط به سؤال به مسیر اصلی API
app.use('/api/questions', questionRoutes);

// روت اولیه (برای تست)
app.get('/', (req, res) => {
    res.send('Question Bank Backend is running!');
});

// =========================================================
// SERVER STARTUP
// =========================================================

// 1. فراخوانی اتصال به دیتابیس
connectDB(); 

// 2. اجرای سرور
app.listen(PORT, () => {
    console.log(`Server is running in development mode on port ${PORT}`);
    console.log(`Press Ctrl + C to stop`);
});