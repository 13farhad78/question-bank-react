import OptionField from "./OptionField";
import useOptions from "../hooks/useOptions";
import { Button } from "@mui/material";

export default function OptionsContainer({
    fieldName = "options",
    initialCount = 2,
    className,
}) {
    const { fields, append, remove, toggleCorrect } = useOptions(
        fieldName,
        initialCount
    );

    return (
        <div>
            <div className={className}>
                {fields.map((field, index) => (
                    <OptionField
                        key={field.id}
                        name={`${fieldName}.${index}.text`}
                        label={`Option ${index + 1}`}
                        isCorrect={field.isCorrect}
                        onRemove={() => remove(index)}
                        onToggleCorrect={() => toggleCorrect(index)}
                    />
                ))}
            </div>

            <Button
                onClick={() => append({ text: "", isCorrect: false })}
                sx={{mt: 2}}
                variant="outlined">
                ➕ Add Option
            </Button>
        </div>
    );
}
