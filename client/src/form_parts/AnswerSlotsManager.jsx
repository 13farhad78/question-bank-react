// AnswerSlotsManager.jsx

import { Button, IconButton, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useFormContext, useFieldArray } from "react-hook-form";
import CustomeInputField from "./CustomeInputField"; // فرض بر در دسترس بودن
import { useEffect } from "react";

// این کامپوننت فیلدهای اسلات پاسخ را به صورت پویا مدیریت می‌کند.
export default function AnswerSlotsManager({
    name = "question_data.answer_slots",
}) {
    const {
        control,
    } = useFormContext();

    // 💡 استفاده از useFieldArray
    const { fields, append, remove } = useFieldArray({
        control,
        name: name,
    });

    const defaultSlot = { correct_word: "" };

    // === تغییر ۱ و ۳: هندل کردن فیلد پیش‌فرض و جلوگیری از رندر بی‌پایان ===
    useEffect(() => {
        // اگر آرایه خالی است (یعنی نه در defaultValues و نه در useFormContext فیلدی وجود ندارد)
        if (fields.length === 0) {
            append(defaultSlot);
        }
        // [fields.length] در اینجا تنها یک بار در mount کامپوننت
        // یا هر زمان که طول آرایه به صفر برسد، اجرا می‌شود.
    }, [fields.length, append, defaultSlot]);


    // === توابع دکمه‌ها ===
    const handleRemoveLast = () => {
        // حذف آخرین فیلد
        if (fields.length > 0) {
            remove(fields.length - 1);
        }
    };

    return (
        <Box sx={{ p: 2, border: "1px dashed #ccc", borderRadius: 2, my: 2}}>
            {/* === تغییر ۲: موقعیت دکمه‌ها در کنار تیتر === */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                <Typography variant="h6" sx={{ mb: { xs: 1, sm: 0 } }}>
                    Define Correct Answers (Slots)
                </Typography>
                <div className="flex gap-2">
                    {/* دکمه افزودن */}
                    <Button
                        type="button"
                        onClick={() => append(defaultSlot)}
                        startIcon={<AddIcon />}
                        variant="outlined"
                        size="small"
                    >
                        Add Slot
                    </Button>
                    {/* دکمه حذف آخرین فیلد */}
                    <Button
                        type="button"
                        onClick={handleRemoveLast}
                        startIcon={<RemoveIcon />}
                        variant="outlined"
                        color="error"
                        size="small"
                        // حداقل یک اسلات باید وجود داشته باشد (طبق تغییر ۳)
                        disabled={fields.length <= 1} 
                    >
                        Remove Last
                    </Button>
                </div>
            </div>

            {/* === تغییر ۳: استفاده از Tailwind Grid برای ۵ فیلد در هر ردیف === */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {fields.map((field, index) => (
                    // نیازی به Box اضافی با flex نیست، Grid خودش چیدمان را مدیریت می‌کند
                    <div key={field.id} className="w-full">
                        <CustomeInputField
                            label={`Slot ${index + 1}`}
                            // 💡 مسیر دهی دقیق به فیلد
                            name={`${name}.${index}.correct_word`}
                            rules={{
                                required: true,
                            }}
                        />
                    </div>
                ))}
            </div>
        </Box>
    );
}