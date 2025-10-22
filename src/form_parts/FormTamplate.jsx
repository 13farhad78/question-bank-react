import { Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import {cleanData} from "../utils/CleanData"

// Helper function to extract the actual value from AutoComplete objects.
const extractValue = (field) => {
    // Checks if the field is an object and contains a 'value' property.
    if (typeof field === 'object' && field !== null && 'value' in field) {
        return field.value;
    }
    // Returns the field as is if it's already a primitive type (string, number, boolean).
    return field;
};

// Main function to clean the form data.
const cleanFormData = (data) => {
    // Create a shallow copy to avoid modifying the original data object.
    const cleanedData = { ...data };

    // 1. Extract values from top-level fields (e.g., grade, lesson, difficulties).
    cleanedData.grade = extractValue(cleanedData.grade);
    cleanedData.lesson = extractValue(cleanedData.lesson);
    cleanedData.difficulties = extractValue(cleanedData.difficulties);
    cleanedData.subjects = extractValue(cleanedData.subjects); 

    // 2. Extract values from nested fields (e.g., inside questionSource).
    if (cleanedData.questionSource) {
        cleanedData.questionSource.year = extractValue(cleanedData.questionSource.year);
        cleanedData.questionSource.month = extractValue(cleanedData.questionSource.month);
        cleanedData.questionSource.province = extractValue(cleanedData.questionSource.province);
    }
    
    // Note: The 'options' array items are assumed to be clean due to the RHF Controller logic.

    return cleanedData;
};


export default function FormTamplate({ defaultValues = {}, onSubmit, children }) {
    const methods = useForm({ defaultValues });

    // Function to handle the submit event, clean data, and pass it to the final handler.
    const handleFormSubmit = (data) => {
        const finalData = cleanFormData(data);
        // remove properties with null or undefined values from nested objects
        const cleanedFinalData = cleanData(finalData);
        // Call the user's provided onSubmit function with the cleaned data.
        onSubmit(cleanedFinalData);
        // reset the form after submission
        methods.reset();
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                {children}

                <Button 
                    type="submit" 
                    variant="contained" 
                    sx={{ alignSelf: "start", mt: 3 }} 
                    startIcon={<SaveAsIcon/>}
                > 
                    submit form 
                </Button>
            </form>
        </FormProvider>
    );
}