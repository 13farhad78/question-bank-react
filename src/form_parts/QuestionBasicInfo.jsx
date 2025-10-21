import { useEffect, useRef } from "react";
import CustomAutoComplete from "./CustomAutoComplete";
import CustomCheckBox from "./CustomCheckBox";
import {
    Lessons,
    grades,
    subjects,
    difficulties,
    years,
    months,
    iranProvinces,
} from "../data/Data";
import { useFormContext, useWatch } from "react-hook-form";

export default function QuestionBasicInfo() {
    const { control, setValue } = useFormContext();

    // --- Watch fields ---
    const selectedGrade = useWatch({ control, name: "grade" });
    const isFinal = useWatch({ control, name: "questionSource.isFinal" });

    const previousGrade = useRef(null);
    const gradeKey = selectedGrade?.value ?? null;
    const lessonOptions = gradeKey ? Lessons[gradeKey] || [] : [];

    // پاک کردن درس فقط زمانی که پایه عوض می‌شود
    useEffect(() => {
        if (previousGrade.current !== gradeKey) {
            setValue("lesson", null);
            previousGrade.current = gradeKey;
        }
    }, [gradeKey, setValue]);

    // تعریف نقشه‌ی شرط‌ها برای فیلدهای نهایی
    const finalFieldMap = {
        12: ["year", "month"], // دوازدهم
        11: ["year", "month"], // یازدهم
        9: ["year", "province"], // نهم
    };

    // مپ داده‌های هر فیلد برای پر شدن اتوماتیک
    const optionMap = {
        year: years,
        month: months,
        province: iranProvinces,
    };

    // استخراج فیلدهای مربوط به پایه انتخاب‌شده
    const finalFields = isFinal ? finalFieldMap[gradeKey] || [] : [];

    return (
        <div className="mt-4">
            <div className="grid grid-cols-4 gap-2 mx-auto">
                <CustomAutoComplete name="grade" options={grades} />
                <CustomAutoComplete
                    name="lesson"
                    options={lessonOptions}
                    disabled={!gradeKey}
                />
                <CustomAutoComplete name="subjects" options={subjects} />
                <CustomAutoComplete
                    name="difficulties"
                    options={difficulties}
                />
            </div>

            <div className="grid grid-cols-12 gap-2 mt-2 items-center justify-center">
                <div className="col-span-3 flex items-center">
                    <CustomCheckBox
                        name="questionSource.isFinal"
                        label="Final Question"
                    />
                </div>

                {finalFields.map((field) => (
                    <div key={field} className="col-span-4 mt-2">
                        <CustomAutoComplete
                            name={`questionSource.${field}`}
                            options={optionMap[field]}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
