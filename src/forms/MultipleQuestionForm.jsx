import FormTamplate from "../form_parts/FormTamplate";
import OptionsContainer from "../form_parts/OptionsContainer";
import QuestionBasicInfo from "../form_parts/QuestionBasicInfo";
import QuestionStemField from "../form_parts/QuestionStemField";
import QuestionTextField from "../form_parts/QuestionTextField";
import {validateMultipleChoiceCorrectOption} from "../utils/validation"

const submitForm = (data) => {
    // اضافه کردن نوع سوال به داده‌ها
    const questionType = "multiple_choice";
    data.question_type = questionType;

    if (data.question_type === "multiple_choice") {
        // 👈 استفاده از تابع کمکی مستقل
        const isOneOptionCorrect = validateMultipleChoiceCorrectOption(
            data.question_data.options
        );

        if (!isOneOptionCorrect) {
            // 🚨 نمایش پیغام خطا و توقف سابمیت
            console.error(
                "Submission blocked: At least one option must be marked as correct."
            );
            alert(
                "لطفاً حداقل یکی از گزینه‌ها را به عنوان پاسخ صحیح انتخاب کنید."
            );
            return; // توقف تابع و جلوگیری از ارسال داده
        }
    }

    ////////////////////////////// remove unnecessary properties !!!!!! //////////////////////////////
    console.log(data);
};

export default function MultipleQuestionForm() {
	return (
		<FormTamplate
			// defaultValues={{
			//     question_stem: "",
			//     question_text: "",
			//     options: [],
			// }}
			onSubmit={submitForm}
		>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<QuestionStemField />
				<QuestionTextField />
			</div>

			<OptionsContainer
				initialCount={4}
				className={"grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5"}
			/>
			<div className="bg-gray-300/20 h-0.5 w-full my-3 rounded-full"></div>

			<QuestionBasicInfo />
		</FormTamplate>
	);
}
