import OptionField from "./OptionField";
import useOptions from "../hooks/useOptions";
import { ButtonGroup, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function OptionsContainer({
    fieldName = "options",
    initialCount = 2,
    className,
    minCount = 1,
    maxCount = 12,
}) {
    const { fields, append, remove, toggleCorrect } = useOptions(
        fieldName,
        initialCount
    );

    // شرط‌ها برای کنترل دکمه‌ها
    const canAddMore = fields.length < maxCount;
    const canRemove = fields.length > minCount;

    return (
        <div>
            <div className={className}>
                {fields.map((field, index) => (
                    <OptionField
                        key={field.id}
                        name={`question_data.${fieldName}.${index}.text`}
                        label={`Option ${index + 1}`}
                        isCorrect={field.isCorrect}
                        onToggleCorrect={() => toggleCorrect(index)}
                        disableRemove={!canRemove}
                    />
                ))}
            </div>
            <div>
                <ButtonGroup variant="text">
                    <IconButton>
                        <AddIcon
                            onClick={() => {
                                if (canAddMore)
                                    append({ text: "", isCorrect: false });
                            }}
                            disabled={!canAddMore}
                        />
                    </IconButton>
                    <IconButton>
                        <RemoveIcon
                            onClick={() => {
                                if (canRemove) remove(fields.length - 1);
                            }}
                            disabled={!canRemove}
                        />
                    </IconButton>
                </ButtonGroup>
            </div>
        </div>
    );
}
