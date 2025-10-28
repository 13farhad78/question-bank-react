// --------------------------------------------------------------------------------
// 🧠 COMPONENT: ReadingForm
// --------------------------------------------------------------------------------

import FormTamplate from "../form_parts/FormTamplate";        // Generic RHF wrapper
import QuestionBasicInfo from "../form_parts/QuestionBasicInfo"; // Metadata (grade, lesson, difficulty, etc.)
import QuestionStemField from "../form_parts/QuestionStemField"; // Question stem input
import CustomeInputField from "../form_parts/CustomeInputField"; // Standard input field
import ReadingQuestionsMenu from "../form_parts/ReadingQuestionsMenu"; // Dropdown to add question types
import { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomRadioGroup from "../form_parts/CustomRadioGroup";
import OptionsContainer from "../form_parts/OptionsContainer";
import { useFormContext } from "react-hook-form";
import { validateMultipleChoiceCorrectOption } from "../utils/validation";

// --------------------------------------------------------------------------------
// 🟢 SUB-COMPONENT: MultipleChoiceFields
// Handles the fields specific to multiple-choice questions
// --------------------------------------------------------------------------------
function MultipleChoiceFields({ questionIndex }) {
    return (
        <Box sx={{ mt: 2 }}>
            {/* Question text input */}
            <CustomeInputField
                label={"question text"}
                name={`question_data.questions[${questionIndex}].question_text`}
            />

            {/* Dynamic options container */}
            <OptionsContainer
                fieldName={`questions[${questionIndex}].options`}
                initialCount={4} // default 4 options
                className={"grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5"}
            />
        </Box>
    );
}

// --------------------------------------------------------------------------------
// 🟢 SUB-COMPONENT: QuestionCard
// Wraps each question into a card with remove button and heading
// --------------------------------------------------------------------------------
function QuestionCard({ question, index, onRemove, children }) {
    const { register } = useFormContext();

    return (
        <div className="rounded-2xl bg-gray-800/70 border border-gray-700 shadow-md p-5">
            {/* Hidden input to store question type */}
            <input
                type="hidden"
                {...register(`question_data.questions[${index}].type`)}
                value={question.type}
            />

            {/* Card header with title + delete button */}
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-blue-300">
                    Question {index + 1} — {getQuestionTypeLabel(question.type)}
                </h3>

                <button
                    onClick={() => onRemove(index)}
                    className="text-red-400 p-1 rounded-md hover:bg-red-500/10 transition duration-200"
                >
                    <DeleteIcon fontSize="small" />
                </button>
            </div>

            <hr className="border-gray-700 mb-4" />

            {/* Question fields */}
            <div className="space-y-4">{children}</div>
        </div>
    );
}

// --------------------------------------------------------------------------------
// 🟢 HELPER: getQuestionTypeLabel
// Returns human-readable label for question type
// --------------------------------------------------------------------------------
function getQuestionTypeLabel(type) {
    const labels = {
        multi_choice: "Multiple Choice",
        true_false: "True/False",
        short_answer: "Short Answer",
        full_answer: "Full Answer",
    };
    return labels[type] || type;
}

// --------------------------------------------------------------------------------
// 🟢 MAIN COMPONENT: ReadingForm
// Dynamic reading passage + questions form
// --------------------------------------------------------------------------------
export default function ReadingForm() {
    const [questions, setQuestions] = useState([]);

    // --------------------------------------------------------------------------------
    // 🔹 SUB-FUNCTION: handleSubmit
    // Validates each question and stops submission if invalid
    // --------------------------------------------------------------------------------
    const handleSubmit = (data) => {
        const questionsData = data.question_data?.questions || [];

        for (let i = 0; i < questionsData.length; i++) {
            const question = questionsData[i];

            // Validate multiple choice questions
            if (question.type === "multi_choice") {
                const options = question.options;

                const isOneOptionCorrect = validateMultipleChoiceCorrectOption(options);

                if (!isOneOptionCorrect) {
                    console.error(
                        `Validation blocked: Multiple Choice Question ${i + 1} has no correct option marked.`
                    );
                    alert(
                        `سوال شماره ${i + 1}: لطفاً حداقل یکی از گزینه‌ها را به عنوان پاسخ صحیح انتخاب کنید.`
                    );

                    // ⚠️ Stops form submission
                    return;
                }
            }
        }

        // ✅ All validations passed
        console.log("✅ Form data is valid and submitted:", data);
        // 💡 API submission logic should go here
    };

    // --------------------------------------------------------------------------------
    // 🔹 SUB-FUNCTION: handleAddQuestion
    // Adds a new question dynamically
    // --------------------------------------------------------------------------------
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

    // --------------------------------------------------------------------------------
    // 🔹 SUB-FUNCTION: handleRemoveQuestion
    // Removes question at a specific index
    // --------------------------------------------------------------------------------
    const handleRemoveQuestion = (index) => {
        setQuestions((prev) => prev.filter((_, i) => i !== index));
    };

    // --------------------------------------------------------------------------------
    // 🔹 SUB-FUNCTION: renderQuestionFields
    // Renders the correct inputs for each question type
    // --------------------------------------------------------------------------------
    const renderQuestionFields = (question, index) => {
        switch (question.type) {
            case "multi_choice":
                return <MultipleChoiceFields questionIndex={index} />;
            case "true_false":
                return (
                    <div className="grid grid-cols-12 gap-6 items-center">
                        <div className="col-span-9">
                            <CustomeInputField
                                key={`tf-text-${question.id}`}
                                name={`question_data.questions[${index}].question_text`}
                                label="Enter the True/False statement here"
                            />
                        </div>
                        <div className="col-span-3">
                            <CustomRadioGroup
                                key={`radio-${question.id}`}
                                name={`question_data.questions[${index}].correct_answer`}
                                label="Correct Answer"
                                row={true} // True/False buttons in one row
                                rules={{
                                    required: "لطفاً پاسخ صحیح (صحیح/غلط) را مشخص کنید.",
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
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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

    // --------------------------------------------------------------------------------
    // 🔹 RENDER
    // --------------------------------------------------------------------------------
    return (
        <FormTamplate onSubmit={handleSubmit}>
            <Box sx={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column" }}>
                {/* Stem Field */}
                <QuestionStemField />

                {/* Reading Passage */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ color: "#93c5fd", fontWeight: 600, mb: 1 }}>
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
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        {questions.map((question, index) => (
                            <QuestionCard
                                key={question.id}
                                question={question}
                                index={index}
                                onRemove={handleRemoveQuestion}
                            >
                                {renderQuestionFields(question, index)}
                            </QuestionCard>
                        ))}

                        {questions.length === 0 && (
                            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)" }}>
                                🎯 No questions added yet. Click "Add Question" to get started.
                            </Typography>
                        )}
                    </Box>

                    <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 2 }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                        <Typography variant="h5" sx={{ color: "white", fontWeight: 600 }}>
                            📝 Questions ({questions.length})
                        </Typography>
                        <ReadingQuestionsMenu onQuestionSelect={handleAddQuestion} />
                    </Box>
                </Box>

                {/* Basic Info Section */}
                <Box sx={{ mt: 2 }}>
                    <QuestionBasicInfo />
                </Box>
            </Box>
        </FormTamplate>
    );
}

/*
====================================================================================
🧠 Developer Analysis / Weaknesses / Recommendations:

1️⃣ Strengths:
- Modular sub-components (QuestionCard, MultipleChoiceFields, etc.).
- Dynamic question adding/removing.
- RHF integration allows field registration.
- Handles multiple question types in a single form.

2️⃣ Weaknesses:
- Manually manages question state via useState → duplicates data with RHF internal state.
- Inline logic for validation → could be extracted.
- Multiple places hardcode `question_data.questions[${index}]` paths → brittle.
- Reading passage + questions tightly coupled → hard to reuse.
- Alerts for validation are blocking → UX not great.
- No backend integration yet.

3️⃣ Scalability / Maintainability Tips:
- Consider using useFieldArray for `questions` → keeps RHF state and component state in sync.
- Split `renderQuestionFields` per type into its own component file.
- Extract validation into RHF resolver (Yup/Zod) instead of manual for-loop.
- Consider `QuestionCard` as a standalone component accepting props for question type.
- Avoid keying on `Date.now()` → better unique ID solution (uuid or nanoid).
- Move all hardcoded strings and colors to constants or theme file.
- Add tests for dynamic addition/removal and validation logic.

====================================================================================
*/
