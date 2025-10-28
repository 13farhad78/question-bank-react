// /client/src/components/form_parts/OptionsContainer.jsx

// --------------------------------------------------------------------------------
// 🧩 IMPORTS
// --------------------------------------------------------------------------------

import OptionField from "./OptionField"; // Our reusable option input component
import useOptions from "../hooks/useOptions"; // Custom hook to manage dynamic options array
import { ButtonGroup, IconButton } from "@mui/material"; // MUI buttons for add/remove
import AddIcon from "@mui/icons-material/Add"; 
import RemoveIcon from "@mui/icons-material/Remove";

// --------------------------------------------------------------------------------
// 🧠 COMPONENT: OptionsContainer
// --------------------------------------------------------------------------------
// Manages a dynamic list of OptionField components.
// Handles adding/removing options and marking one as correct.
// --------------------------------------------------------------------------------

export default function OptionsContainer({
    fieldName = "options",   // 🔹 Form field base path (used in RHF)
    initialCount = 2,        // 🔹 Number of initial options
    className,               // 🔹 CSS class for the container
    minCount = 1,            // 🔹 Minimum number of options allowed
    maxCount = 12,           // 🔹 Maximum number of options allowed
}) {
    // 🔹 Destructure helpers from custom hook
    const { fields, append, remove, toggleCorrect } = useOptions(
        fieldName,
        initialCount
    );

    // 🔹 Determine if "Add" button should be active
    const canAddMore = fields.length < maxCount;

    // 🔹 Determine if "Remove" button should be active
    const canRemove = fields.length > minCount;

    return (
        <div>
            {/* 🔹 Main container for all OptionField components */}
            <div className={className}>
                {fields.map((field, index) => (
                    <OptionField
                        key={field.id} // 🔹 React key for list rendering
                        name={`question_data.${fieldName}.${index}.text`} 
                        // 🔹 RHF path to each option text
                        label={`Option ${index + 1}`} 
                        // 🔹 User-friendly label
                        isCorrect={field.isCorrect} 
                        // 🔹 Highlight border if correct
                        onToggleCorrect={() => toggleCorrect(index)} 
                        // 🔹 Mark/unmark this option as correct
                        disableRemove={!canRemove} 
                        // 🔹 Prevent removing if below minCount
                    />
                ))}
            </div>

            {/* 🔹 Buttons to dynamically add/remove options */}
            <div>
                <ButtonGroup variant="text">
                    {/* 🔹 Add button */}
                    <IconButton>
                        <AddIcon
                            onClick={() => {
                                // 🔹 Only append if under maxCount
                                if (canAddMore)
                                    append({ text: "", isCorrect: false });
                            }}
                            disabled={!canAddMore} // 🔹 Disable when max reached
                        />
                    </IconButton>

                    {/* 🔹 Remove button */}
                    <IconButton>
                        <RemoveIcon
                            onClick={() => {
                                // 🔹 Only remove if above minCount
                                if (canRemove) remove(fields.length - 1);
                            }}
                            disabled={!canRemove} // 🔹 Disable when min reached
                        />
                    </IconButton>
                </ButtonGroup>
            </div>
        </div>
    );
}


// --------------------------------------------------------------------------------
// 🧭 Developer Insight
// --------------------------------------------------------------------------------
// 🔹 This component is fully dynamic: supports variable number of options and integrates tightly with RHF.
// 🔹 useOptions hook abstracts option state logic, keeping the component clean.
// 🔹 Dynamic RHF path (`question_data.${fieldName}.${index}.text`) allows forms with multiple question types.
// 🔹 Inline isCorrect styling in OptionField provides immediate visual feedback.
// 🔹 Scalable: you can add features like drag-and-drop ordering, option validation, or conditional logic.
// 🔹 Security: inputs are controlled; always sanitize on submit. Avoid direct DOM manipulation here.
