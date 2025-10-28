// /client/src/components/form_parts/OptionField.jsx

// --------------------------------------------------------------------------------
// 🧩 IMPORTS
// --------------------------------------------------------------------------------

import { Controller, useFormContext } from "react-hook-form";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";


// --------------------------------------------------------------------------------
// 🧠 COMPONENT: OptionField
// --------------------------------------------------------------------------------
// A reusable text input for a single option in a multiple-choice question.
// Integrates with React Hook Form, shows validation errors, and includes a toggle
// button to mark the option as correct with dynamic green border styling.
// --------------------------------------------------------------------------------

/**
 * OptionField
 *
 * @component
 *
 * @param {Object} props
 * @param {string} props.name - Name of the field in the form (e.g., 'questions[0].options[0].text').
 * @param {string} props.label - Label to display above the input.
 * @param {function} props.onToggleCorrect - Callback executed when the “correct” check button is clicked.
 * @param {boolean} props.isCorrect - Whether this option is marked as correct (controls border color & button color).
 * @param {object} [props.sx] - Optional MUI styling overrides for the TextField.
 *
 * @returns {JSX.Element} Rendered input field connected to RHF with integrated correct toggle.
 *
 * @example
 * <FormProvider {...methods}>
 *   <OptionField
 *       name="questions[0].options[0].text"
 *       label="Option A"
 *       isCorrect={selectedOption === 0}
 *       onToggleCorrect={() => setSelectedOption(0)}
 *   />
 * </FormProvider>
 */

export default function OptionField({
    name,
    label,
    onToggleCorrect,
    isCorrect,
    sx,
}) {
    const { control } = useFormContext(); // 🎛 Access RHF context

    return (
        <Controller
            name={name}         
            control={control}   
            rules={{ required: true }} // Basic validation
            render={({ field, fieldState }) => (
                <TextField
                    {...field}                     
                    label={label}                  
                    error={!!fieldState.error}      
                    helperText={fieldState.error?.message || ""} 
                    fullWidth
                    autoComplete="off"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: isCorrect ? "green" : undefined, 
                            },
                            "&:hover fieldset": {
                                borderColor: isCorrect ? "green" : undefined,
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: isCorrect ? "green" : undefined,
                            },
                        },
                        ...sx,
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton
                                        onClick={onToggleCorrect}
                                        color={isCorrect ? "success" : "default"}
                                    >
                                        <CheckIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            )}
        />
    );
}


// --------------------------------------------------------------------------------
// 🧭 Developer Insight
// --------------------------------------------------------------------------------
// 🔹 Uses Controller to integrate MUI TextField with RHF, ensuring validation works.
// 🔹 Dynamic green border highlights the “correct” option — visual feedback improves UX.
// 🔹 onToggleCorrect is separated from form state; parent manages which option is correct.
// 🔹 slotProps.input with InputAdornment + IconButton is an advanced MUI technique for inline buttons.
// 🔹 sx spreading allows parent components to override or extend styling for flexibility.
// 🔹 Scalability: could easily adapt to multiple-choice lists, drag-and-drop options, or inline editing.
// 🔹 Security: input sanitization should happen on submit — the component itself only handles UI state.
