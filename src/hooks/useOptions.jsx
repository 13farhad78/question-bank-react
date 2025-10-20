import { useFieldArray, useFormContext } from "react-hook-form";
import { useEffect, useMemo } from "react"; // 💡 useMemo را اضافه کنید

export default function useOptions(fieldName = "options", initialCount = 2) {
    // 💡 از useFormContext همه متدها و control را بگیرید
    const { control, setValue, getValues } = useFormContext();
    
    // 💡 از useFieldArray فقط fields و append/remove را بگیرید
    const { fields, append, remove } = useFieldArray({
        control,
        name: fieldName,
    });

    // 💡 ایجاد آرایه مقادیر پیش‌فرض مورد نیاز
    const initialOptions = useMemo(() => {
        const options = [];
        // مطمئن می‌شویم که initialCount فیلد ساخته شود
        for (let i = 0; i < initialCount; i++) {
            options.push({ text: "", isCorrect: false });
        }
        return options;
    }, [initialCount]);

    // مقدار اولیه فقط یک بار
    useEffect(() => {
        // 💡 شرط اصلی: اگر آرایه فعلی خالی است، مقداردهی اولیه را انجام بده.
        if (fields.length === 0 && initialCount > 0) {
            
            // 💡 راه حل: استفاده از setValue برای جایگزینی کل آرایه
            // این کار از باگ‌های داخلی useFieldArray در مقداردهی اولیه جلوگیری می‌کند
            setValue(fieldName, initialOptions, { shouldValidate: true });
        }
    
    // در وابستگی‌ها، فقط چیزهایی که برای اولین بار لازمند را می‌گذاریم
    // fields.length برای چک کردن وضعیت اولیه
    // setValue و fieldName برای اجرای منطق
    // initialOptions برای دسترسی به مقادیر
    }, [fields.length, setValue, fieldName, initialOptions]); 

    const toggleCorrect = (index) => {
        const values = getValues(fieldName);
        values.forEach((item, i) => {
          item.isCorrect = i === index ? !item.isCorrect : false;
        });
        setValue(fieldName, values);
    };

    return { fields, append, remove, toggleCorrect };
}