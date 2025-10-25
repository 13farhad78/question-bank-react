// ReadingForm.jsx

import FormTamplate from "../form_parts/FormTamplate";
import QuestionBasicInfo from "../form_parts/QuestionBasicInfo";

// ⚠️ این کامپوننت فعلاً نیازی نیست و باید حذف شود
// import MultipleChoiceFields from "../form_parts/question/multipleChoiceFields"; 

import QuestionStemField from "../form_parts/QuestionStemField";
import CustomeInputField from "../form_parts/CustomeInputField";

import ReadingQuestionsMenu from "../form_parts/ReadingQuestionsMenu";

import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '@mui/material'; // برای دکمه حذف

// --------------------------------------------------------
// ۱. تعریف ساختار داده اولیه (گام حیاتی)
// --------------------------------------------------------
const getInitialQuestion = (type) => {
    // فعلاً فقط برای تست و لاگ گرفتن، یک شیء ساده برمی‌گرداند
    switch(type) {
        case 'multi_choice':
            return { type: 'multi_choice', stem: 'سوال چند گزینه‌ای جدید' };
        case 'true_false':
            return { type: 'true_false', stem: 'سوال صحیح/غلط جدید' };
        case 'short_answer':
            return { type: 'short_answer', stem: 'سوال کوتاه پاسخ جدید' };
        case 'full_answer':
            return { type: 'full_answer', stem: 'سوال پاسخ کامل جدید' };
        default:
            return { type: 'unknown', stem: 'نوع نامشخص' };
    }
};

export default function ReadingForm() {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "related_questions",
    });

    // 👈 تابع اصلی افزودن سؤال (با هدف لاگ گرفتن و افزودن به آرایه)
    const handleAddQuestion = (questionType) => {
        console.log(`✅ نوع سؤال انتخاب شده: ${questionType}`);
        const newQuestion = getInitialQuestion(questionType);
        
        if (newQuestion) {
            // 💡 اگر می‌خواهید فعلاً فقط لاگ بگیرید و آرایه تغییر نکند، خط زیر را کامنت کنید.
            // اما برای دیدن نتیجه‌ی کار Menu و append، بهتر است آن را فعال بگذاریم:
            append(newQuestion); 
        }
    };

    return (
        <FormTamplate defaultValues={{related_questions: []}}>
            <QuestionStemField />
            <div className="mt-4">
                <CustomeInputField
                    multiline
                    minRows={3} 
                    maxRows={15} 
                    name={"reading_passage"}
                    label={"Reading Text"}
                    rules={{ required: true }}
                />
            </div>

            {/* -------------------------------------------------------- */}
            {/* ۲. رندر پویا (Dynamic Rendering) سؤالات */}
            {/* -------------------------------------------------------- */}
            <div className="mt-4">
                {/* 👈 حذف MultipleChoiceFields ثابت و جایگزینی با حلقه پویا */}
                {fields.map((field, index) => (
                    <div key={field.id} className="my-4 p-4 border rounded shadow-sm">
                        
                        {/* 👈 فاز ۱: فقط نمایش نوع سؤال (لاگ بصری) */}
                        <p className="font-bold text-gray-700">
                            **سوال شماره {index + 1}:** نوع {field.type} - (نام فیلد: related_questions.{index})
                        </p>
                        
                        {/* ⚠️ در اینجا کامپوننت‌های شرطی (مثلاً MultiChoiceForm) رندر خواهند شد. */}

                        <Button 
                            onClick={() => remove(index)} 
                            color="error" 
                            size="small" 
                            sx={{mt: 1, textTransform: 'none'}}
                        >
                            حذف سوال
                        </Button>
                    </div>
                ))}
            </div>


            {/* -------------------------------------------------------- */}
            {/* ۳. اتصال منو به تابع افزودن */}
            {/* -------------------------------------------------------- */}
            <ReadingQuestionsMenu onQuestionSelect={handleAddQuestion} /> 

            <QuestionBasicInfo />
        </FormTamplate>
    );
}