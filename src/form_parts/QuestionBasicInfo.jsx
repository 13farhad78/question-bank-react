import CustomAutoComplete from "./CustomAutoComplete"
import {Lessons, grades, subjects, difficulties} from "../data/Data"
import { useFormContext, useWatch } from "react-hook-form";

export default function QuestionBasicInfo() {
      const { control } = useFormContext();

  // مقدار فعلی grade
  const selectedGrade = useWatch({
    control,
    name: "grade",
  });

    // درس‌های مربوط به grade
  const lessonOptions = selectedGrade ? Lessons[selectedGrade] : [];
  return (
    <div className=" grid grid-cols-4 gap-2">
        <CustomAutoComplete name={"grade"} options={grades}/>
        <CustomAutoComplete name={"lesson"} options={lessonOptions}/>
        <CustomAutoComplete name={"subjects"} options={subjects}/>
        <CustomAutoComplete name={"difficulties"} options={difficulties}/>
    </div>
  )
}
