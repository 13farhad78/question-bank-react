import OptionField from "./OptionField";
import useOptions from "../hooks/useOptions";
import { Button } from "@mui/material";

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
            onRemove={() => {
              if (canRemove) remove(index);
            }}
            onToggleCorrect={() => toggleCorrect(index)}
            disableRemove={!canRemove}
          />
        ))}
      </div>

      <Button
        onClick={() => {
          if (canAddMore) append({ text: "", isCorrect: false });
        }}
        sx={{ mt: 2 }}
        variant="outlined"
        disabled={!canAddMore}
      >
        ➕ Add Option
      </Button>
    </div>
  );
}
