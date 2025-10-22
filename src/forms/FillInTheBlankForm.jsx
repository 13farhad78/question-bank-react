import CustomeInputField from "../form_parts/CustomeInputField";
import FormTamplate from "../form_parts/FormTamplate";
import QuestionBasicInfo from "../form_parts/QuestionBasicInfo";

export default function FillInTheBlankForm() {
    const submitForm = (data) => {

        // add question type
        data.question_type = "fill_in_the_blank";
        
        console.log(data);
    };
    return (
        <FormTamplate onSubmit={submitForm}>
            <div className="space-y-4">
                <CustomeInputField
                    label={"questions stem"}
                    name={"question_stem"}
                    dir={"rtl"}
                    rules={{ required: true }}
                />
                <CustomeInputField
                    label={"questions text"}
                    name={"question_text"}
                    rules={{ required: true }}
                />
            </div>
            <QuestionBasicInfo />
        </FormTamplate>
    );
}
