// /client/src/components/form_parts/CustomRadioGroup.jsx

// --------------------------------------------------------------------------------
// 🧩 IMPORTS
// --------------------------------------------------------------------------------

import { useController } from "react-hook-form"; // Connects external inputs to RHF
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
    FormHelperText,
    Box,
} from "@mui/material";


// --------------------------------------------------------------------------------
// 🧠 COMPONENT: CustomRadioGroup
// --------------------------------------------------------------------------------
// A reusable Radio Group component integrated with React Hook Form.
// Handles connection, validation, error display, and custom styling (e.g., dark mode).
// --------------------------------------------------------------------------------

/**
 * @component
 *
 * @param {Object} props
 * @param {string} props.name - Field name in the form (e.g., 'questions[0].correct_answer').
 * @param {string} props.label - Group label displayed above the radio buttons.
 * @param {Object} [props.rules] - Validation rules for RHF (e.g., { required: "Required field" }).
 * @param {Array<{ value: string, label: string }>} [props.options=[]] - Array of radio button options.
 * @param {boolean} [props.row=true] - If true, display options horizontally; otherwise vertically.
 * @param {...any} [props] - Any other props are passed to the underlying MUI RadioGroup.
 *
 * @returns {JSX.Element} Rendered RadioGroup connected to RHF.
 *
 * @example
 * <FormProvider {...methods}>
 *   <CustomRadioGroup
 *       name="correct_answer"
 *       label="Select the correct answer"
 *       options={[
 *           { value: "A", label: "Option A" },
 *           { value: "B", label: "Option B" }
 *       ]}
 *       rules={{ required: "Please select an option" }}
 *   />
 * </FormProvider>
 */
export default function CustomRadioGroup({
    name,
    label,
    rules,
    options = [],
    row = true,
    ...props
}) {
    // 🎛 Connect to RHF using useController
    const {
        field,       // { name, value, onChange, onBlur }
        fieldState,  // { error, invalid }
    } = useController({ name, rules });

    const isError = !!fieldState.error;
    const errorText = fieldState.error?.message;
    const controlledValue = field.value || "";

    return (
        <FormControl
            component="fieldset"
            fullWidth
            error={isError}
            margin="normal"
            className="p-3 rounded-lg bg-gray-800 border border-gray-700" // Dark mode styling
        >
            {/* Group label */}
            <FormLabel
                component="legend"
                sx={{
                    color: isError ? "#f87171 !important" : "#9ca3af",
                    fontWeight: "bold",
                    mb: 1,
                }}>
                {label}
            </FormLabel>

            {/* Radio buttons */}
            <RadioGroup
                {...field}                 // value, onChange, onBlur
                value={controlledValue}     
                onChange={field.onChange}   
                onBlur={field.onBlur}       
                row={row}                   
                {...props}                 
            >
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={
                            <Radio
                                sx={{
                                    color: isError ? "#f87171" : "#60a5fa",
                                    "&.Mui-checked": {
                                        color: isError ? "#f87171" : "#3b82f6",
                                    },
                                }}
                            />
                        }
                        label={
                            <Typography sx={{ color: "#f9fafb", fontSize: "0.9rem" }}>
                                {option.label}
                            </Typography>
                        }
                    />
                ))}
            </RadioGroup>

            {/* Error message */}
            {isError && (
                <FormHelperText sx={{ color: "#f87171", mt: 1 }}>
                    {errorText}
                </FormHelperText>
            )}
        </FormControl>
    );
}


// --------------------------------------------------------------------------------
// 🧭 Developer Insight
// --------------------------------------------------------------------------------
// 🔹 useController is preferred over Controller here for cleaner and direct field access.
// 🔹 Setting controlledValue ensures proper controlled component behavior.
// 🔹 Dark mode styling and dynamic error coloring improves UX for complex forms.
// 🔹 Flexible props spread (`...props`) allows future extensions like disabled, size, or custom ARIA labels.
// 🔹 Validation handled through RHF ensures the component stays declarative and form-agnostic.
// 🔹 Security: purely UI + form state — no direct risk. Still always sanitize user input on submission.
