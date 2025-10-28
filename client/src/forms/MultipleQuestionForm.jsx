// --------------------------------------------------------------------------------
// 🧠 COMPONENT: MultipleQuestionForm
// --------------------------------------------------------------------------------

import FormTamplate from "../form_parts/FormTamplate";      // Generic form wrapper with React Hook Form
import OptionsContainer from "../form_parts/OptionsContainer"; // Manages dynamic multiple-choice options
import QuestionBasicInfo from "../form_parts/QuestionBasicInfo"; // Handles metadata (grade, lesson, difficulty, etc.)
import QuestionStemField from "../form_parts/QuestionStemField"; // Input for question stem
import QuestionTextField from "../form_parts/QuestionTextField"; // Input for question text/body
import { validateMultipleChoiceCorrectOption } from "../utils/validation"; // Custom validation utility

// --------------------------------------------------------------------------------
// 🔹 Function: submitForm
// Handles form submission logic, including validation, API call, and reset
// --------------------------------------------------------------------------------
const submitForm = async (data, reset, defaultValues) => {
    // Step 1: Add question type to the data
    const questionType = "multiple_choice";
    data.question_type = questionType;

    // Step 2: Custom validation logic for multiple-choice questions
    if (data.question_type === "multiple_choice") {
        const isOneOptionCorrect = validateMultipleChoiceCorrectOption(
            data.question_data.options
        );

        if (!isOneOptionCorrect) {
            // 🚫 Prevent submission if no option is marked correct
            console.error("Submission blocked: At least one option must be marked as correct.");
            alert("لطفاً حداقل یکی از گزینه‌ها را به عنوان پاسخ صحیح انتخاب کنید.");
            return; // Stop execution
        }
    }

    // Step 3: API call to save the question
    try {
        const response = await fetch('http://localhost:5000/api/questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data), // Send cleaned & transformed data
        });

        if (!response.ok) {
            // If API returns an error status
            const errorBody = await response.json();
            throw new Error(errorBody.message || 'خطا در ذخیره سازی سوال.');
        }

        const result = await response.json();
        console.log('✅ Question saved successfully:', result);
        alert('سوال با موفقیت ذخیره شد! نوع سوال: ' + data.question_type);

        // Step 4: Reset form to default values
        reset(defaultValues); // Uses reset method passed from FormTamplate

    } catch (error) {
        // Catch network or server errors
        console.error('Submission Error:', error.message);
        alert(`❌ خطا در ذخیره سازی: ${error.message}`);
    }
};

// --------------------------------------------------------------------------------
// 🔹 Component: MultipleQuestionForm
// Renders the full multiple-choice question form using sub-components
// --------------------------------------------------------------------------------
export default function MultipleQuestionForm() {
    // Step 1: Define default form values
    const defaultFormValues = {
        question_data: {
            question_stem: "", // Question stem (header/title)
            question_text: "", // Main question text/body
            options: [
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false }
            ],
        },
        basic_info: {},          // Metadata like grade, lesson, difficulty
        language_skills: {},     // Optional: language skill focus
        questionSource: {},      // Optional: source/year/month/province
        score_value: 0.5,        // Default score value
        // 💡 Tip: Keep additional fields here as your form grows
    };

    return (
        // Step 2: Wrap the form with FormTamplate
        <FormTamplate
            defaultValues={defaultFormValues}
            onSubmit={submitForm} // Pass our custom submit handler
        >
            {/* -----------------------------------------------------------
               Section 1: Question Inputs
               Includes QuestionStemField and QuestionTextField
            ------------------------------------------------------------ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <QuestionStemField />
                <QuestionTextField />
            </div>

            {/* -----------------------------------------------------------
               Section 2: Multiple Choice Options
               Dynamically managed using OptionsContainer
               initialCount = 4 ensures four options by default
            ------------------------------------------------------------ */}
            <OptionsContainer
                initialCount={4}
                className={"grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5"}
            />

            {/* Divider for visual separation */}
            <div className="bg-gray-300/20 h-0.5 w-full my-3 rounded-full"></div>

            {/* -----------------------------------------------------------
               Section 3: Question Metadata
               Uses QuestionBasicInfo to manage grade, lesson, difficulty, etc.
            ------------------------------------------------------------ */}
            <QuestionBasicInfo />
        </FormTamplate>
    );
}

/*
====================================================================================
🧠 Developer Insight:

1️⃣ Strengths:
- Form is cleanly separated into reusable sub-components.
- OptionsContainer handles dynamic option management well.
- Validation is centralized in a utility function (validateMultipleChoiceCorrectOption).
- Reset logic is properly integrated via FormTamplate.

2️⃣ Weaknesses / Potential Issues:
- Hardcoded API URL ('http://localhost:5000') → needs to be environment variable for prod.
- Options count is fixed at initialCount = 4 → not configurable for other question types.
- Alert() for error/success feedback → consider using Snackbar / Toast for better UX.
- No error handling for individual field errors in API response.
- All sub-components tightly coupled to RHF → not easy to reuse outside of RHF forms.

3️⃣ Scalability / Maintainability Hints:
- Extract API call into a separate service function (e.g., questionService.saveQuestion).
- Make initial option count and question type dynamic via props.
- Consider splitting MultipleQuestionForm into smaller sections:
    - QuestionInputsSection
    - OptionsSection
    - MetadataSection
  for better readability & testability.
- Move hardcoded strings (alerts, labels) to a constants or i18n file.
- Add unit & integration tests to cover validation & dynamic option behaviors.

====================================================================================
*/
