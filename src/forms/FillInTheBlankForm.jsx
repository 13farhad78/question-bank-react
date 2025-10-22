import AnswerSlotsManager from "../form_parts/AnswerSlotsManager";
import FormTamplate from "../form_parts/FormTamplate";
import QuestionBasicInfo from "../form_parts/QuestionBasicInfo";
import QuestionStemField from "../form_parts/QuestionStemField";
import QuestionTextField from "../form_parts/QuestionTextField";

export default function FillInTheBlankForm() {
    const submitForm = (data) => {

        // add question type
        data.question_type = "fill_in_the_blank";
        
        console.log(data);
    };
    return (
        <FormTamplate onSubmit={submitForm}>
            <div className="space-y-4">
                <QuestionStemField/>
                <QuestionTextField/>
            </div>
            <AnswerSlotsManager/>
            <QuestionBasicInfo />
        </FormTamplate>
    );
}
