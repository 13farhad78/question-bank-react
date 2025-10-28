// /client/src/components/form_parts/CustomAutoComplete.jsx

// --------------------------------------------------------------------------------
// 🧩 IMPORTS
// --------------------------------------------------------------------------------

import { Autocomplete, Box, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";


// --------------------------------------------------------------------------------
// 🧠 COMPONENT: CustomAutoComplete
// --------------------------------------------------------------------------------
// A reusable autocomplete dropdown integrated with React Hook Form.
// Supports dynamic options, labels, and error handling.
// --------------------------------------------------------------------------------

export default function CustomAutoComplete({ name, options = [], label, ...props }) {
    const { control } = useFormContext(); // 🎛 Access form context from FormProvider

    // Label to display on the input; falls back to field name if no label provided
    const displayLabel = label || name; 

    return (
        <Box sx={{ width: "100%" }}>
            <Controller
                name={name}              // Field name for RHF registration
                control={control}        // RHF controller instance
                defaultValue={null}      // Initial value
                rules={{ required: true }} // Basic validation
                render={({ field, fieldState }) => (
                    <Autocomplete
                        {...field}       // Connect Autocomplete to RHF state
                        {...props}       // Allow extra props (flexibility)
                        options={options}
                        getOptionLabel={(option) => option?.label || ""} // Display text
                        isOptionEqualToValue={(option, value) =>
                            option?.value === value?.value
                        }
                        // Sync RHF state on selection change
                        onChange={(event, value) => field.onChange(value)} 
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={displayLabel} // Shows label in input
                                error={!!fieldState.error} // Highlight error
                                helperText={fieldState.error?.message || ""} // Show message
                                fullWidth
                                autoComplete="off"
                            />
                        )}
                        slotProps={{
                            paper: { style: { fontFamily: "Vazir" } }, // Custom font
                        }}
                        noOptionsText="No Option" // Text when no results
                    />
                )}
            />
        </Box>
    );
}


// --------------------------------------------------------------------------------
// 🧭 Developer Insight
// --------------------------------------------------------------------------------
// 🔹 Controller is necessary because MUI Autocomplete is not a native input.
// 🔹 Default value must be explicitly set (here null) to avoid uncontrolled → controlled warnings.
// 🔹 Error handling is integrated via fieldState, allowing inline feedback.
// 🔹 Security: this component handles only UI state; no direct risk of injection.
// 🔹 Future scalability: could add async loading options, multi-select mode, or custom renderOption templates.
// 🔹 Flexibility: spread of {...props} allows parent components to modify Autocomplete behavior easily.
