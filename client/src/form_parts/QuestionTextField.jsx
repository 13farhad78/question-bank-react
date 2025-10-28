import CustomeInputField from "./CustomeInputField";

export default function QuestionTextField() {
	return (
		<CustomeInputField
			label={"Question Text"}
			name={"question_data.question_text"}
			rules={{ required: true }}
		/>
	);
}
