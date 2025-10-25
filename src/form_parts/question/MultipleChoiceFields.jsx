import CustomeInputField from "../CustomeInputField";
import QuestionTextField from "../QuestionTextField";

export default function MultipleChoiceFields(name) {
    return (
        <div className="mt-4">
            <QuestionTextField />
            <CustomeInputField name={name}/>
        </div>
    );
}
