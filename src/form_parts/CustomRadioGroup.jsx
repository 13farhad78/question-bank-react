// CustomRadioGroup.jsx
import { useController } from "react-hook-form"; // 👈 هوک کلیدی برای اتصال
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
    FormHelperText,
    Box, // برای استایل‌دهی Tailwind
} from "@mui/material";

/**
 * کامپوننت کاستوم Radio Group متصل به React Hook Form.
 * این کامپوننت مسئول مدیریت اتصال (Connection)، اعتبار سنجی (Validation) و نمایش خطا (Error Display) است.
 * * @param {string} name - نام فیلد در فرم (مثلاً 'questions[0].correct_answer')
 * @param {string} label - عنوان گروه رادیویی
 * @param {object} rules - قوانین اعتبارسنجی RHF
 * @param {Array<{value: string, label: string}>} options - آرایه‌ای از گزینه‌ها
 * @param {boolean} row - آیا گزینه‌ها به‌صورت افقی نمایش داده شوند
 */
export default function CustomRadioGroup({
    name,
    label,
    rules,
    options = [],
    row = true,
    ...props
}) {
    // ۱. استفاده از useController برای اتصال به RHF
    const {
        field, // شامل: name, value, onChange, onBlur
        fieldState, // شامل: error, invalid
    } = useController({
        name,
        rules,
        // control به طور خودکار از FormProvider گرفته می‌شود.
    });

    const isError = !!fieldState.error;
    const errorText = fieldState.error?.message;
    const controlledValue = field.value || "";

    return (
        <FormControl
            component="fieldset"
            fullWidth
            error={isError}
            margin="normal"
            className="p-3 rounded-lg bg-gray-800 border border-gray-700" // استایل Dark Mode
        >
            {/* ۲. برچسب گروه رادیویی */}
            <FormLabel
                component="legend"
                sx={{
                    color: isError ? "#f87171 !important" : "#9ca3af",
                    fontWeight: "bold",
                    mb: 1,
                }}>
                {label}
            </FormLabel>

            {/* ۳. RadioGroup که field را می‌پذیرد */}
            <RadioGroup
                {...field} // اعمال field.value, field.onChange, field.onBlur
                value={controlledValue}
                onChange={field.onChange} // field.onChange و field.onBlur را مستقیماً پاس می‌دهیم
                onBlur={field.onBlur}
                row={row}
                {...props}>
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={
                            <Radio
                                // استایل رادیو باتن (آبی در حالت عادی، قرمز در حالت خطا)
                                sx={{
                                    color: isError ? "#f87171" : "#60a5fa",
                                    "&.Mui-checked": {
                                        color: isError ? "#f87171" : "#3b82f6",
                                    },
                                }}
                            />
                        }
                        label={
                            <Typography
                                sx={{ color: "#f9fafb", fontSize: "0.9rem" }}>
                                {option.label}
                            </Typography>
                        }
                    />
                ))}
            </RadioGroup>

            {/* ۴. نمایش پیغام خطا */}
            {isError && (
                <FormHelperText sx={{ color: "#f87171", mt: 1 }}>
                    {errorText}
                </FormHelperText>
            )}
        </FormControl>
    );
}
