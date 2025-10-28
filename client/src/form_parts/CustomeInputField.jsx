// /client/src/components/form_parts/CustomeInputField.jsx

// --------------------------------------------------------------------------------
// 🧩 IMPORTS
// --------------------------------------------------------------------------------

import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";


// --------------------------------------------------------------------------------
// 🧠 COMPONENT: CustomeInputField
// --------------------------------------------------------------------------------
// Reusable text input field integrated with React Hook Form and MUI.
// Supports validation rules, text direction, and custom props.
// --------------------------------------------------------------------------------

export default function CustomeInputField({ label, name, dir, rules, ...props }) {
  const { control } = useFormContext(); // 🎛 Access form context

  return (
    <div>
        <Controller
            name={name}         // Field name in the form
            control={control}   // RHF controller instance
            rules={rules}       // Optional validation rules passed from parent
            render={({ field, fieldState }) => (
                <TextField
                    {...field}                 // Connect input to RHF state
                    {...props}                 // Allow additional MUI TextField props
                    dir={dir}                  // Optional text direction (ltr/rtl)
                    label={label}              // Input label
                    value={field.value ?? ""}  // Ensure controlled component
                    error={!!fieldState.error} // Highlight error
                    helperText={fieldState.error?.message || ""} // Show error message
                    fullWidth
                    autoComplete="off"
                />
            )}
        />
    </div>
  );
}


// --------------------------------------------------------------------------------
// 🧭 Developer Insight
// --------------------------------------------------------------------------------
// 🔹 Always set a default value (here via `?? ""`) to avoid uncontrolled → controlled warnings.
// 🔹 Using Controller is necessary for MUI TextField to integrate with RHF validation.
// 🔹 `rules` allows parent forms to pass dynamic validation easily.
// 🔹 `dir` is important for multi-language support (especially for RTL languages like Persian).
// 🔹 This component is purely presentational + form state — safe and reusable.
// 🔹 Future scalability: could add variants (outlined, filled), masks, or custom input formats.
