import FormTamplate from "../form_parts/FormTamplate";
import CustomeInputField from "../form_parts/CustomeInputField";
import OptionsContainer from "../form_parts/OptionsContainer";
import QuestionBasicInfo from "../form_parts/QuestionBasicInfo";

const submitForm = (data) => {
    console.log(data)
};

export default function MultipleQuestionForm() {
    return (
        <FormTamplate
            defaultValues={{
                question_stem: "",
                question_text: "",
                options: [],
            }}
            onSubmit={submitForm}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <CustomeInputField
                    label={"questions text"}
                    name={"question_text"}
                    rules={{ required: true }}
                />
                <CustomeInputField
                    label={"questions stem"}
                    name={"question_stem"}
                    rules={{ required: true }}
                />
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
