import React, { useState, useEffect } from "react";
import QuestionCardWrapper from "../components/QuestionCardWrapper";

// وارد کردن کامپوننت‌های هر نوع سؤال
import MultipleChoiceCard from "../components/question_types/MultipleChoiceCard";
import TrueFalseCard from "../components/question_types/TrueFalseCard.jsx";
import ShortAnswerCard from "../components/question_types/ShortAnswerCard";
import FillInTheBlankCard from "../components/question_types/FillInTheBlankCard";
import ReadingCard from "../components/question_types/ReadingCard";

import { Typography, CircularProgress, Box, Alert, Container } from "@mui/material";
import { sampleQuestions } from "../mock-questions/questions.jsx"; // ← این فایل تستی توی پروژه‌ت هست

const SavedQuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // در این نسخه از داده‌ی تستی استفاده می‌کنیم
  useEffect(() => {
    try {
      setQuestions(sampleQuestions);
    } catch (err) {
      console.error("Error loading sample questions:", err);
      setError("خطا در بارگذاری داده‌ها");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          در حال بارگذاری سوالات...
        </Typography>
      </Box>
    );

  if (error)
    return (
      <Box sx={{ mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  if (questions.length === 0)
    return (
      <Box sx={{ mt: 5 }}>
        <Alert severity="info">هنوز هیچ سؤالی ذخیره نشده است.</Alert>
      </Box>
    );

  return (
    <Container sx={{ py: 5 }}>
      {questions.map((q, index) => {
        const info = {
          پایه: q.basic_info?.grade,
          درس: q.basic_info?.lesson,
          سختی: q.basic_info?.difficulty,
          مهارت: q.language_skills?.focus,
          سال: q.questionSource?.year,
        };

        return (
          <QuestionCardWrapper
            key={index}
            type={q.question_type}
            info={info}
            onEdit={() => console.log("Edit", q._id)}
            onDelete={() => console.log("Delete", q._id)}
          >
            {renderQuestionBody(q)}
          </QuestionCardWrapper>
        );
      })}
    </Container>
  );
};

// 👇 تابع کمکی برای رندر نوع‌های مختلف سؤال
function renderQuestionBody(q) {
  const { question_type, question_data } = q;

  switch (question_type) {
    case "multiple_choice":
      return <MultipleChoiceCard question={question_data} />;

    case "fill_in_the_blank":
      return <FillInTheBlankCard question={question_data} />;

    case "reading":
      return <ReadingCard question={question_data} />;

    case "true_false":
      return <TrueFalseCard question={question_data} />;

    case "short_answer":
      return <ShortAnswerCard question={question_data} />;

    default:
      return <p className="text-gray-400">❓ نوع سؤال ناشناخته است.</p>;
  }
}

export default SavedQuestionsPage;
