import InputWithIcons from "./InputWithIcons"
import BasicQuestionInfo from "./BasicQuestionInfo"
import Button from "../components/Button"
import { useState } from "react"

export default function FormParent ({children}) {

      const [formData, setFormData] = useState({
        questionStem: "",
        questionText: "",
        options: { },
        grade: 9,
        subject: "",
        lesson: "",
        difficulty: "",
        isFinal: false,
        year: "",
        month: "",
        city: "",
      });

      const [errors, setErrors] = useState({});

      const handleChange = (field, value) => {
        setFormData(data => ({...data, [field]: value}))
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("✅ Final Form Data:", formData);
        };


     
    return (
        <div className="max-w-auto mx-auto mt-6 p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputWithIcons
                        label={"Question stem"}
                        placeholder={"Enter question stem here"}
                        value={formData.questionStem}
                        onChange={(e) => handleChange("questionStem", e.target.value)}
                        error={""}
                    />
                    <InputWithIcons
                        label={"Question text"}
                        placeholder={"Enter your question text here"}
                        value={formData.questionText}
                        onChange={(e) => handleChange("questionText", e.target.value)}
                        error={""}
                    />
                </div>

                {children}

                      <BasicQuestionInfo
                        formData={formData}
                        errors={errors}
                        onChange={(field, value) => handleChange(field, value)}
                      />

                <Button type={"submit"} onClick={() => {}} >
                    Submit
                </Button>
            </form>
        </div>
        
    )
}