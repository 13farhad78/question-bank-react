// /client/src/form_parts/FormTamplate.js

// --------------------------------------------------------------------------------
// 🧩 IMPORTS
// --------------------------------------------------------------------------------

import { Button } from "@mui/material";           // Material UI button
import { useForm, FormProvider } from "react-hook-form"; // RHF form state management
import SaveAsIcon from "@mui/icons-material/SaveAs";      // Icon for submit button
import ScoreSelect from "./ScoreSelect";                  // Component for selecting score
import { cleanData } from "../utils/CleanData";          // Utility: removes null/undefined recursively

// 💡 TIP: extractValue and cleanFormData can be moved to a separate utilities file for reusability

// --------------------------------------------------------------------------------
// 🛠️ UTILITY: extractValue
// --------------------------------------------------------------------------------
// Purpose: For any field object, returns the `.value` if exists, else returns original value
// Teaches: How to safely extract nested values from RHF-controlled components
const extractValue = (field) => {
    if (field && typeof field === "object" && "value" in field) {
        return field.value !== undefined ? field.value : null;
    }
    return field;
};

// --------------------------------------------------------------------------------
// 🛠️ UTILITY: cleanFormData
// --------------------------------------------------------------------------------
// Purpose: Prepare form data before sending it to backend
// Steps:
// 1️⃣ Extract `.value` from nested fields
// 2️⃣ Remove extra keys like grade, lesson, difficulties, subjects
// 3️⃣ Return clean, backend-ready object
const cleanFormData = (data) => {
    const transformedData = { ...data };

    // 🔹 Clean basic_info fields
    if (transformedData.basic_info) {
        transformedData.basic_info.grade = extractValue(transformedData.basic_info.grade);
        transformedData.basic_info.lesson = extractValue(transformedData.basic_info.lesson);
        transformedData.basic_info.difficulty = extractValue(transformedData.basic_info.difficulty);
    }

    // 🔹 Clean language skills field
    if (transformedData.language_skills && transformedData.language_skills.focus) {
        transformedData.language_skills.focus = extractValue(transformedData.language_skills.focus);
    }

    // 🔹 Clean conditional fields for questionSource
    if (transformedData.questionSource) {
        transformedData.questionSource.year = extractValue(transformedData.questionSource.year);
        transformedData.questionSource.month = extractValue(transformedData.questionSource.month);
        transformedData.questionSource.province = extractValue(transformedData.questionSource.province);
    }

    // 🔹 Remove unnecessary top-level keys
    delete transformedData.grade;
    delete transformedData.lesson;
    delete transformedData.difficulties;
    delete transformedData.subjects;

    return transformedData;
};

// --------------------------------------------------------------------------------
// 🧠 COMPONENT: FormTamplate
// --------------------------------------------------------------------------------
// Purpose: Provides a reusable form wrapper with RHF + MUI
// Features:
// - FormProvider to give child components access to RHF context
// - Centralized submit handler with data cleaning
// - ScoreSelect component included
// - Submit button with icon
// Teaches:
// - How to create scalable form wrapper
// - Best practices for data cleaning before submission
export default function FormTamplate({
    defaultValues = {},
    onSubmit,       // Form-specific submit function, e.g., MultipleQuestionForm.submitForm
    children,       // Form fields/components passed as children
}) {

    // -----------------------------------------------------------
    // 🔹 RHF FORM METHODS
    // -----------------------------------------------------------
    const methods = useForm({ defaultValues });

    // -----------------------------------------------------------
    // 🔹 HANDLE SUBMIT
    // -----------------------------------------------------------
    const handleFormSubmit = (data) => {
        // 1️⃣ Clean & transform data
        const transformedData = cleanFormData(data);
        const finalData = cleanData(transformedData); // removes null/undefined recursively

        // 2️⃣ Call parent submit function with cleaned data + reset function
        onSubmit(finalData, methods.reset, defaultValues);
    };

    // -----------------------------------------------------------
    // 🔹 JSX RETURN
    // -----------------------------------------------------------
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                
                {/* 🔹 Form fields passed as children */}
                {children}

                {/* 🔹 Score selector component */}
                <div className="mt-4">
                    <ScoreSelect />
                </div>

                {/* 🔹 Submit button */}
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

// --------------------------------------------------------------------------------
// 🧭 Developer Insight
// --------------------------------------------------------------------------------
// 🔹 This is a highly reusable form wrapper that can be extended for multiple question types
// 🔹 Separating utilities (extractValue, cleanFormData) improves scalability
// 🔹 Children pattern allows any number of form sections/components to be passed
// 🔹 Data cleaning ensures backend receives simple primitives, not objects with `.value`
// 🔹 RHF FormProvider + useForm ensures proper state management across nested components
// 🔹 Future enhancements: add validation schema (Yup/Zod), error handling, loading state
