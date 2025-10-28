// /client/src/pages/SavedQuestionsPage.js

import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, CircularProgress, Box, Alert } from '@mui/material';

const SavedQuestionsPage = () => {
    // 1. State برای ذخیره لیست سؤالات
    const [questions, setQuestions] = useState([]);
    // 2. State برای مدیریت وضعیت بارگذاری (Loading)
    const [loading, setLoading] = useState(true);
    // 3. State برای مدیریت خطاها
    const [error, setError] = useState(null);

    // 4. تابع اصلی برای فراخوانی API
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                // 💡 فراخوانی روت GET جدید شما
                const response = await fetch('http://localhost:5000/api/questions'); 
                
                if (!response.ok) {
                    throw new Error('Failed to fetch questions from server.');
                }

                const data = await response.json();
                setQuestions(data); // ذخیره داده‌ها در State

            } catch (err) {
                console.error("Fetch Error:", err);
                setError("خطا در بازیابی اطلاعات: مطمئن شوید سرور Backend فعال است.");
            } finally {
                setLoading(false); // پایان بارگذاری
            }
        };

        fetchQuestions();
    }, []); // 💡 آرایه خالی به معنی اجرای فقط یک بار پس از mount شدن کامپوننت

    // ----------------------------------------------------
    // مدیریت حالت‌های نمایش (Rendering)
    // ----------------------------------------------------

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <CircularProgress />
                <Typography variant="h6" sx={{ ml: 2 }}>در حال بارگذاری سوالات...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ mt: 5 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }
    
    if (questions.length === 0) {
        return (
            <Box sx={{ mt: 5 }}>
                <Alert severity="info">
                    هنوز هیچ سؤالی در دیتابیس ذخیره نشده است. لطفاً ابتدا سؤالی ثبت کنید.
                </Alert>
            </Box>
        );
    }

    // ----------------------------------------------------
    // نمایش لیست سؤالات
    // ----------------------------------------------------

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                📚 لیست سؤالات ذخیره شده ({questions.length})
            </Typography>
            <List>
                {questions.map((q) => (
                    <ListItem 
                        key={q._id} 
                        divider 
                        sx={{ bgcolor: 'grey.100', mb: 1, borderRadius: 1 }}
                    >
                        <ListItemText
                            primary={
                                // نمایش متن اصلی سؤال یا بخشی از آن
                                <Typography variant="body1" fontWeight="bold">
                                    {q.question_data.question_text || 'متن سوال نامشخص'}
                                </Typography>
                            }
                            secondary={
                                // نمایش اطلاعات کلیدی
                                `نوع: ${q.question_type} | پایه: ${q.basic_info.grade} | درس: ${q.basic_info.lesson}`
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default SavedQuestionsPage;