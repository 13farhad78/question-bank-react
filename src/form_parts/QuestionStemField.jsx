import CustomeInputField from "./CustomeInputField";

export default function QuestionStemField() {
	return (
		<CustomeInputField
			dir={"rtl"}
			label={"Question Stem"}
			name={"question_data.question_stem"}
			rules={{ required: true }}
		/>
	);
}
