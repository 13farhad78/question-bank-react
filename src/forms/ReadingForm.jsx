// ReadingForm.jsx
import FormTamplate from "../form_parts/FormTamplate";
import QuestionBasicInfo from "../form_parts/QuestionBasicInfo";
import QuestionStemField from "../form_parts/QuestionStemField";
import CustomeInputField from "../form_parts/CustomeInputField";
import ReadingQuestionsMenu from "../form_parts/ReadingQuestionsMenu";
import { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomRadioGroup from "../form_parts/CustomRadioGroup";
import OptionsContainer from "../form_parts/OptionsContainer";
import { useFormContext } from "react-hook-form";
import {validateMultipleChoiceCorrectOption} from "../utils/validation"

// 🎯 Multiple Choice Fields
function MultipleChoiceFields({ questionIndex }) {
    return (
        <Box sx={{ mt: 2 }}>
            <CustomeInputField
                label={"question text"}
                name={`question_data.questions[${questionIndex}].question_text`}
            />

            <OptionsContainer
                fieldName={`questions[${questionIndex}].options`}
                initialCount={4}
                className={"grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5"}
            />
        </Box>
    );
}

// 🎯 Question Card
function QuestionCard({ question, index, onRemove, children }) {
    const { register } = useFormContext();
    
    return (
        <div
            className="
				rounded-2xl 
				bg-gray-800/70 
				border border-gray-700 
				shadow-md 
				p-5 
			">
            {/* Input مخفی برای ثبت type سوال */}
            <input
                type="hidden"
                {...register(`question_data.questions[${index}].type`)}
                value={question.type}
            />
            
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-blue-300">
                    Question {index + 1} — {getQuestionTypeLabel(question.type)}
                </h3>

                <button
                    onClick={() => onRemove(index)}
                    className="
						text-red-400 
						p-1 
						rounded-md 
						hover:bg-red-500/10 
						transition 
						duration-200
					">
                    <DeleteIcon fontSize="small" />
                </button>
            </div>

            <hr className="border-gray-700 mb-4" />

            <div className="space-y-4">{children}</div>
        </div>
    );
}

// 🎯 Helper
function getQuestionTypeLabel(type) {
    const labels = {
        multi_choice: "Multiple Choice",
        true_false: "True/False",
        short_answer: "Short Answer",
        full_answer: "Full Answer",
    };
    return labels[type] || type;
}

// 🎯 Main Component
export default function ReadingForm() {
    const [questions, setQuestions] = useState([]);

    const handleSubmit = (data) => {
        const questionsData = data.question_data?.questions || [];
        // 1. تکرار بر روی همه سوالات
        for (let i = 0; i < questionsData.length; i++) {
            const question = questionsData[i];

            // 2. بررسی نوع سوال
            if (question.type === "multi_choice") {
                const options = question.options;

                // 3. اعمال اعتبارسنجی چند گزینه‌ای
                const isOneOptionCorrect = validateMultipleChoiceCorrectOption(options);

                if (!isOneOptionCorrect) {
                    // 🚨 نمایش خطا و توقف در صورت ناموفق بودن اعتبارسنجی
                    console.error(
                        `Validation blocked: Multiple Choice Question ${i + 1} has no correct option marked.`
                    );
                    alert(
                        `سوال شماره ${i + 1}: لطفاً حداقل یکی از گزینه‌ها را به عنوان پاسخ صحیح انتخاب کنید.`
                    );
                    
                    // 💡 نکته: اگر از کتابخانه‌ای مثل React Hook Form استفاده می‌کنید،
                    // می‌توانید خطا را به فیلد خاص (مثلاً questions[${i}].options) بفرستید.
                    
                    return; // 👈 توقف تابع و جلوگیری از ارسال داده
                }
            }
        }
        
        // اگر همه اعتبارسنجی‌ها با موفقیت انجام شد
        console.log("✅ Form data is valid and submitted:", data);
        // 🚀 اینجا باید منطق نهایی ارسال (API Call) را قرار دهید
    };

    const handleAddQuestion = (questionType) => {
        const newQuestion = {
            id: Date.now(),
            type: questionType,
            question_text: "",
            ...(questionType === "multi_choice" && {
                options: [
                    { text: "", isCorrect: false },
                    { text: "", isCorrect: false },
                    { text: "", isCorrect: false },
                    { text: "", isCorrect: false },
                ],
            }),
            ...(questionType === "true_false" && { correct_answer: "" }),
            ...(questionType === "short_answer" && { short_answer: "" }),
        };
        setQuestions((prev) => [...prev, newQuestion]);
    };

    const handleRemoveQuestion = (index) => {
        setQuestions((prev) => prev.filter((_, i) => i !== index));
    };

    const renderQuestionFields = (question, index) => {
        switch (question.type) {
            case "multi_choice":
                return <MultipleChoiceFields questionIndex={index} />;
            case "true_false":
                return (
                    <div
                        // 👈 تغییر: اضافه کردن 'gap-6' برای فاصله بین ستون‌ها و 'items-end' برای هم‌ترازی
                        className="grid grid-cols-12 gap-6 items-center">
                        {/* ستون اول: فیلد متن سوال */}
                        <div className="col-span-9">
                            <CustomeInputField
                                key={`tf-text-${question.id}`}
                                name={`question_data.questions[${index}].question_text`}
                                label="Enter the True/False statement here"
                            />
                        </div>

                        {/* ستون دوم: رادیو باتن پاسخ صحیح */}
                        <div className="col-span-3">
                            <CustomRadioGroup
                                key={`radio-${question.id}`}
                                name={`question_data.questions[${index}].correct_answer`}
                                label="Correct Answer"
                                // row={true} را در اینجا حفظ می‌کنیم چون گزینه‌های True/False باید افقی باشند.
                                row={true}
                                rules={{
                                    required:
                                        "لطفاً پاسخ صحیح (صحیح/غلط) را مشخص کنید.",
                                }}
                                options={[
                                    { value: "True", label: "True" },
                                    { value: "False", label: "False" },
                                ]}
                            />
                        </div>
                    </div>
                );
            case "short_answer":
                return (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}>
                        <CustomeInputField
                            label="question text"
                            name={`question_data.questions[${index}].question_text`}
                        />
                        <CustomeInputField
                            label="Short Answer"
                            name={`question_data.questions[${index}].short_answer`}
                            rules={{ required: true }}
                            multiline
                            minRows={2}
                        />
                    </Box>
                );

            default:
                return null;
        }
    };

    return (
        <FormTamplate onSubmit={handleSubmit}>
            <Box
                sx={{
                    maxWidth: "900px",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                }}>
                {/* Stem */}
                <QuestionStemField />

                {/* Reading Passage */}
                <Box sx={{ mt: 4 }}>
                    <Typography
                        variant="h6"
                        sx={{ color: "#93c5fd", fontWeight: 600, mb: 1 }}>
                        📖 Reading Passage
                    </Typography>
                    <CustomeInputField
                        multiline
                        minRows={5}
                        maxRows={15}
                        name={"question_data.reading_passage"}
                        label={"Reading Text"}
                        rules={{ required: true }}
                    />
                </Box>

                {/* Questions Section */}
                <Box sx={{ mt: 6 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                        }}>
                        {questions.map((question, index) => (
                            <QuestionCard
                                key={question.id}
                                question={question}
                                index={index}
                                onRemove={handleRemoveQuestion}>
                                {renderQuestionFields(question, index)}
                            </QuestionCard>
                        ))}

                        {questions.length === 0 && (
                            <Typography
                                variant="body1"
                                sx={{ color: "rgba(255,255,255,0.6)" }}>
                                🎯 No questions added yet. Click "Add Question"
                                to get started.
                            </Typography>
                        )}
                    </Box>

                    <Divider
                        sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 2 }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 1,
                        }}>
                        <Typography
                            variant="h5"
                            sx={{ color: "white", fontWeight: 600 }}>
                            📝 Questions ({questions.length})
                        </Typography>
                        <ReadingQuestionsMenu
                            onQuestionSelect={handleAddQuestion}
                        />
                    </Box>
                </Box>

                {/* Basic Info */}
                <Box sx={{ mt: 2 }}>
                    <QuestionBasicInfo />
                </Box>
            </Box>
        </FormTamplate>
    );
}