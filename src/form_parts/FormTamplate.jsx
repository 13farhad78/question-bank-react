import { Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { cleanData } from "../utils/CleanData";
import ScoreSelect from "./ScoreSelect";

/**
 * تابع کمکی برای استخراج مقدار 'value' از آبجکت‌های Autocomplete.
 * اگر ورودی یک آبجکت با کلید 'value' باشد، مقدار آن را برمی‌گرداند.
 * در غیر این صورت، همان ورودی را برمی‌گرداند.
 */
const extractValue = (field) => {
    // اگر فیلد وجود داشته باشد و یک آبجکت باشد، و دارای کلید 'value' باشد
    if (field && typeof field === "object" && "value" in field) {
        // برای مقادیر نال یا undefined که از useWatch می‌آیند، مقدار null را برمی‌گرداند
        return field.value !== undefined ? field.value : null;
    }
    // اگر فیلد یک آرایه یا مقدار ساده باشد، آن را دست نخورده برمی‌گرداند
    return field;
};

/**
 * تابع اصلی برای تمیز کردن داده‌های فرم قبل از سابمیت.
 * این تابع آبجکت‌های {value, label} را به مقادیر ساده تبدیل می‌کند.
 */
const cleanFormData = (data) => {
    // ایجاد یک کپی عمیق (Deep Copy) برای اطمینان از عدم تغییر state اصلی useForm
    // یا می‌توانید از روشی مانند JSON.parse(JSON.stringify(data)) استفاده کنید،
    // اما در اینجا چون ساختار خیلی عمیق نیست، یک کپی سطحی هم موقتاً کافی است.
    const cleanedData = { ...data };

    // 1. تمیز کردن فیلدهای داخل basic_info
    if (cleanedData.basic_info) {
        cleanedData.basic_info.grade = extractValue(
            cleanedData.basic_info.grade
        );
        cleanedData.basic_info.lesson = extractValue(
            cleanedData.basic_info.lesson
        );
        cleanedData.basic_info.difficulty = extractValue(
            cleanedData.basic_info.difficulty
        );
    }

    // 2. تمیز کردن فیلدهای داخل language_skills
    if (cleanedData.language_skills && cleanedData.language_skills.focus) {
        cleanedData.language_skills.focus = extractValue(
            cleanedData.language_skills.focus
        );
    }

    // 3. تمیز کردن فیلدهای داخل questionSource (منبع سؤال)
    if (cleanedData.questionSource) {
        // فرض بر این است که year و month و province نیز از CustomAutoComplete می‌آیند
        cleanedData.questionSource.year = extractValue(
            cleanedData.questionSource.year
        );
        cleanedData.questionSource.month = extractValue(
            cleanedData.questionSource.month
        );
        cleanedData.questionSource.province = extractValue(
            cleanedData.questionSource.province
        );

        // توجه: isFinal یک Boolean است و نیازی به تمیزکاری ندارد.
    }

    // 4. تمیز کردن فیلدهای مربوط به question_data
    // فرض می‌کنیم که question_data.question_stem و question_data.question_text
    // فیلدهای متنی ساده هستند و نیازی به تمیزکاری ندارند.

    // 5. تمیز کردن آرایه‌ی options یا answer_slots
    // این قسمت‌ها به دلیل ساختار RHF معمولاً تمیز هستند و نیاز به پیمایش کامل آرایه نیست،
    // مگر اینکه مطمئن باشید داخل آرایه، آبجکت‌های Autocomplete وجود دارند.

    // 6. حذف فیلدهای سطح اول که به اشتباه باقی مانده‌اند (از کدهای قدیمی)
    // مطمئن شوید که دیگر فیلدهایی مانند 'grade', 'lesson', 'subjects', 'difficulties'
    // در سطح اول باقی نمانده‌اند و از فیلدهای قدیمی حذف شوند. (اگر وجود دارند)
    delete cleanedData.grade;
    delete cleanedData.lesson;
    delete cleanedData.difficulties;
    delete cleanedData.subjects;

    return cleanedData;
};

export default function FormTamplate({
    defaultValues = {},
    onSubmit,
    children,
}) {
    const methods = useForm({ defaultValues });

    // Function to handle the submit event, clean data, and pass it to the final handler.
    const handleFormSubmit = (data) => {
        const finalData = cleanFormData(data);
        // remove properties with null or undefined values from nested objects
        const cleanedFinalData = cleanData(finalData);
        // Call the user's provided onSubmit function with the cleaned data.
        onSubmit(cleanedFinalData);
        // reset the form after submission
        // methods.reset();
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                {children}

                <div className="mt-4">
                    <ScoreSelect />
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ alignSelf: "start", mt: 3 }}
                    startIcon={<SaveAsIcon />}>
                    submit form
                </Button>
            </form>
        </FormProvider>
    );
}
