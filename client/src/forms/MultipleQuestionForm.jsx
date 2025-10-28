// /client/src/forms/MultipleQuestionForm.js (کد اصلاح شده)

import FormTamplate from "../form_parts/FormTamplate";
import OptionsContainer from "../form_parts/OptionsContainer";
import QuestionBasicInfo from "../form_parts/QuestionBasicInfo";
import QuestionStemField from "../form_parts/QuestionStemField";
import QuestionTextField from "../form_parts/QuestionTextField";
import {validateMultipleChoiceCorrectOption} from "../utils/validation"

// 💡 تابع submitForm حالا متدهای reset و defaultValues را دریافت می‌کند
const submitForm = async (data, reset, defaultValues) => {
    // 1. منطق اختصاصی ولیدیشن
    const questionType = "multiple_choice";
    data.question_type = questionType; // اضافه کردن نوع سوال به داده‌ها

    if (data.question_type === "multiple_choice") {
        const isOneOptionCorrect = validateMultipleChoiceCorrectOption(
            data.question_data.options
        );

        if (!isOneOptionCorrect) {
            console.error(
                "Submission blocked: At least one option must be marked as correct."
            );
            alert(
                "لطفاً حداقل یکی از گزینه‌ها را به عنوان پاسخ صحیح انتخاب کنید."
            );
            return; // توقف تابع و جلوگیری از ارسال داده
        }
    }
    
    // 2. منطق API Call (همان منطق قبلی)
    try {
        const response = await fetch('http://localhost:5000/api/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // داده‌های تمیز شده آماده‌ی ارسال هستند
        });

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || 'خطا در ذخیره سازی سوال.');
        }

        const result = await response.json();
        console.log('✅ Question saved successfully:', result);
        alert('سوال با موفقیت ذخیره شد! نوع سوال: ' + data.question_type); 
        
        // 3. ریست کردن فرم پس از موفقیت
        // 💡 متد reset از FormTamplate ارسال شده است
        reset(defaultValues); 

    } catch (error) {
        console.error('Submission Error:', error.message);
        alert(`❌ خطا در ذخیره سازی: ${error.message}`);
    }
};

export default function MultipleQuestionForm() {
    // 💡 تعریف مقادیر پیش‌فرض برای استفاده در ریست
    const defaultFormValues = {
        question_data: {
            question_stem: "",
            question_text: "",
            options: [
                {text: "", isCorrect: false},
                {text: "", isCorrect: false},
                {text: "", isCorrect: false},
                {text: "", isCorrect: false}
            ],
        },
        basic_info: {},
        language_skills: {},
        questionSource: {},
        score_value: 0.5,
        // ... اضافه کردن سایر فیلدها که در فرم وجود دارند
    };

    return (
        <FormTamplate
            defaultValues={defaultFormValues}
            onSubmit={submitForm}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <QuestionStemField />
                <QuestionTextField />
            </div>

            <OptionsContainer
                initialCount={4}
                className={"grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5"}
            />
            <div className="bg-gray-300/20 h-0.5 w-full my-3 rounded-full"></div>

            <QuestionBasicInfo />
        </FormTamplate>
    );
}