// /client/src/components/form_parts/CustomCheckBox.jsx

// --------------------------------------------------------------------------------
// 🧩 IMPORTS
// --------------------------------------------------------------------------------

// ✅ UI components from Material-UI for styled checkboxes and labels
import { Checkbox, FormControlLabel } from "@mui/material";

// ✅ React Hook Form utilities
// useFormContext → gives access to the form’s context without prop-drilling
// Controller → links external (non-native) components like MUI Checkbox to RHF’s form state
import { Controller, useFormContext } from "react-hook-form";


// --------------------------------------------------------------------------------
// 🧠 COMPONENT: CustomCheckBox
// --------------------------------------------------------------------------------
// Reusable controlled checkbox integrated with React Hook Form.
// Keeps form state in sync with the checkbox UI — no manual state handling needed.
// --------------------------------------------------------------------------------

export default function CustomCheckBox({ name, label, ...props }) {
    const { control } = useFormContext(); // 🎛 Access form context (shared across form)

    return (
        <Controller
            name={name}                // Field name for RHF registration
            control={control}          // RHF controller object
            defaultValue={false}       // Initial checkbox state
            render={({ field }) => (   // field = { value, onChange, onBlur, ref }
                <FormControlLabel
                    control={
                        <Checkbox
                            {...field}                     // Connects Checkbox to RHF state
                            {...props}                     // Allows extra props (like color)
                            checked={field.value || false} // Ensures controlled behavior
                            onChange={(e) => field.onChange(e.target.checked)} // Sync state
                        />
                    }
                    label={label} // 🏷️ Visible text label next to checkbox
                />
            )}
        />
    );
}


// --------------------------------------------------------------------------------
// 🧭 Developer Insight
// --------------------------------------------------------------------------------
// 🔹 Using Controller is essential for MUI inputs — they’re not native HTML inputs.
// 🔹 The double spread (`{...field} {...props}`) ensures full flexibility without breaking RHF linkage.
// 🔹 Always set a defaultValue — otherwise, uncontrolled → controlled warnings may occur.
// 🔹 This component is form-agnostic: plug it anywhere inside a <FormProvider> and it just works.
// 🔒 Security-wise: safe — only handles UI state, no direct data exposure or injection risk.
