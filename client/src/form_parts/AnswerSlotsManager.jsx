// /client/src/form_parts/AnswerSlotsManager.jsx

// --------------------------------------------------------------------------------
// 🧩 IMPORTS
// --------------------------------------------------------------------------------
import { Button, Box, Typography } from "@mui/material"; // MUI components
import AddIcon from "@mui/icons-material/Add";           // Icon for add button
import RemoveIcon from "@mui/icons-material/Remove";     // Icon for remove button
import { useFormContext, useFieldArray } from "react-hook-form"; // RHF hooks
import CustomeInputField from "./CustomeInputField";    // Custom input component
import { useEffect } from "react";

// --------------------------------------------------------------------------------
// 🧠 COMPONENT: AnswerSlotsManager
// --------------------------------------------------------------------------------
// Purpose: Dynamically manage "answer slots" for questions
// Features:
// - Automatically append default slot if none exists
// - Add / remove slots with buttons
// - Integrates seamlessly with RHF FormContext
export default function AnswerSlotsManager({
    name = "question_data.answer_slots", // default path in RHF form state
}) {

    // -----------------------------------------------------------
    // 🔹 RHF CONTEXT & FIELD ARRAY
    // -----------------------------------------------------------
    const { control } = useFormContext(); // Provides form state & methods

    // 💡 useFieldArray allows dynamic array of fields in RHF
    const { fields, append, remove } = useFieldArray({
        control,
        name: name,
    });

    const defaultSlot = { correct_word: "" }; // default structure for new slot

    // -----------------------------------------------------------
    // 🔹 INITIALIZATION EFFECT
    // -----------------------------------------------------------
    useEffect(() => {
        // If no slots exist initially, append a default one
        if (fields.length === 0) {
            append(defaultSlot);
        }
        // ✅ Effect runs only on mount or when fields.length === 0
    }, [fields.length, append, defaultSlot]);

    // -----------------------------------------------------------
    // 🔹 BUTTON HANDLERS
    // -----------------------------------------------------------
    const handleRemoveLast = () => {
        // Remove last field, but don't allow removing if only 1 exists
        if (fields.length > 0) {
            remove(fields.length - 1);
        }
    };

    // -----------------------------------------------------------
    // 🔹 JSX RETURN
    // -----------------------------------------------------------
    return (
        <Box
            sx={{
                p: 2,
                border: "1px dashed #ccc",
                borderRadius: 2,
                my: 2
            }}
        >
            {/* === HEADER + BUTTONS === */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                <Typography variant="h6" sx={{ mb: { xs: 1, sm: 0 } }}>
                    Define Correct Answers (Slots)
                </Typography>

                <div className="flex gap-2">
                    {/* Add Slot Button */}
                    <Button
                        type="button"
                        onClick={() => append(defaultSlot)} // Adds a new slot to the array
                        startIcon={<AddIcon />}
                        variant="outlined"
                        size="small"
                    >
                        Add Slot
                    </Button>

                    {/* Remove Last Slot Button */}
                    <Button
                        type="button"
                        onClick={handleRemoveLast}         // Removes last slot
                        startIcon={<RemoveIcon />}
                        variant="outlined"
                        color="error"
                        size="small"
                        disabled={fields.length <= 1}      // Prevent removing the last remaining slot
                    >
                        Remove Last
                    </Button>
                </div>
            </div>

            {/* === DYNAMIC GRID OF INPUT FIELDS === */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="w-full">
                        <CustomeInputField
                            label={`Slot ${index + 1}`} // Label shows 1-based index
                            name={`${name}.${index}.correct_word`} // precise RHF path
                            rules={{ required: true }}   // Validation: field required
                        />
                    </div>
                ))}
            </div>
        </Box>
    );
}

// --------------------------------------------------------------------------------
// 🧭 Developer Insight
// --------------------------------------------------------------------------------
// 🔹 This component demonstrates dynamic form arrays with RHF + MUI
// 🔹 useFieldArray manages a list of fields efficiently with keys (field.id)
// 🔹 Initial default slot prevents empty form submission
// 🔹 Grid + Tailwind ensures responsive layout up to 5 columns
// 🔹 Add / Remove logic ensures at least one slot always exists
// 🔹 Can be extended for multi-word answers or complex validation rules
