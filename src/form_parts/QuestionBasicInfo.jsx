import { useEffect, useRef } from "react";
import CustomAutoComplete from "./CustomAutoComplete";
import { Lessons, grades, subjects, difficulties } from "../data/Data";
import { useFormContext, useWatch } from "react-hook-form";

export default function QuestionBasicInfo() {
  const { control, setValue } = useFormContext();

  const selectedGrade = useWatch({ control, name: "grade" });
  const previousGrade = useRef(null);

  const gradeKey = selectedGrade?.value ?? null;
  const lessonOptions = gradeKey ? Lessons[gradeKey] || [] : [];

  // پاک کردن lesson فقط زمانی که grade واقعاً عوض بشه
  useEffect(() => {
    if (previousGrade.current !== gradeKey) {
      setValue("lesson", null);
      previousGrade.current = gradeKey;
    }
  }, [gradeKey, setValue]);

  return (
    <div className="grid grid-cols-4 gap-2">
      <CustomAutoComplete name="grade" options={grades} />
      <CustomAutoComplete
        name="lesson"
        options={lessonOptions}
        disabled={!gradeKey}
      />
      <CustomAutoComplete name="subjects" options={subjects} />
      <CustomAutoComplete name="difficulties" options={difficulties} />
    </div>
  );
}
