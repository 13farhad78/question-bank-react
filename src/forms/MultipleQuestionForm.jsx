import FormTamplate from "../form_parts/FormTamplate";
import OptionsContainer from "../form_parts/OptionsContainer";
import QuestionBasicInfo from "../form_parts/QuestionBasicInfo";
import QuestionStemField from "../form_parts/QuestionStemField";
import QuestionTextField from "../form_parts/QuestionTextField";

const submitForm = (data) => {
	// add question type to data
	const questionType = "multiple_choice";
	data.question_type = questionType;

	// make sure that one option is corrert
	const validateCorrectOption = (options) => {
		if (!options || options.length === 0) {
			return false; // اگر آرایه کلاً خالی بود
		}
		// حداقل یک گزینه باید isCorrect: true داشته باشد
		return options.some((option) => option.isCorrect === true);
	};

	if (data.question_type === "multiple_choice") {
		const isOneOptionCorrect = validateCorrectOption(data.question_data.options);

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

	////////////////////////////// remove unnecessary properties !!!!!!  //////////////////////////////
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
