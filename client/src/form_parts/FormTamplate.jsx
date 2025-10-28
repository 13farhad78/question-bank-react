// /client/src/form_parts/FormTamplate.js (کد اصلاح شده)

import { Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import ScoreSelect from "./ScoreSelect";
import { cleanData } from "../utils/CleanData"; // تابع حذف null/undefined
// 💡 extractValue و cleanFormData بهتر است به یک فایل utility منتقل شوند
// اما برای سادگی فعلاً در همینجا باقی می‌مانند. 

// -----------------------------------------------------------
// Utility: استخراج مقدار 'value' (کد قبلی شما)
// -----------------------------------------------------------
const extractValue = (field) => {
    if (field && typeof field === "object" && "value" in field) {
        return field.value !== undefined ? field.value : null;
    }
    return field;
};

// -----------------------------------------------------------
// Utility: تمیز کردن داده‌های فرم (کد قبلی شما)
// -----------------------------------------------------------
const cleanFormData = (data) => {
    const transformedData = { ...data };

    if (transformedData.basic_info) {
        transformedData.basic_info.grade = extractValue(transformedData.basic_info.grade);
        transformedData.basic_info.lesson = extractValue(transformedData.basic_info.lesson);
        transformedData.basic_info.difficulty = extractValue(transformedData.basic_info.difficulty);
    }
    if (transformedData.language_skills && transformedData.language_skills.focus) {
        transformedData.language_skills.focus = extractValue(transformedData.language_skills.focus);
    }
    if (transformedData.questionSource) {
        transformedData.questionSource.year = extractValue(transformedData.questionSource.year);
        transformedData.questionSource.month = extractValue(transformedData.questionSource.month);
        transformedData.questionSource.province = extractValue(transformedData.questionSource.province);
    }

    delete transformedData.grade;
    delete transformedData.lesson;
    delete transformedData.difficulties;
    delete transformedData.subjects;

    return transformedData;
};


export default function FormTamplate({
    defaultValues = {},
    onSubmit, // 💡 حالا این تابع همان تابع submitForm اختصاصی MultipleQuestionForm خواهد بود
    children,
    // اضافه کردن prop برای دسترسی به متدها
}) {
    const methods = useForm({ defaultValues });

    const handleFormSubmit = (data) => {
        // 1. تمیزکاری داده‌ها
        const transformedData = cleanFormData(data);
        const finalData = cleanData(transformedData);
        
        // 2. فراخوانی تابع onSubmit اختصاصی فرم (MultipleQuestionForm.submitForm)
        onSubmit(finalData, methods.reset, defaultValues); // 💡 ارسال متد ریست و defaultValues
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                {children}
                
                <div className="mt-4">
                    <ScoreSelect />
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ alignSelf: "start", mt: 3 }}
                    startIcon={<SaveAsIcon />}>
                    ذخیره و ارسال فرم
                </Button>
            </form>
        </FormProvider>
    );
}