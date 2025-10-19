import { useFieldArray } from "react-hook-form";

export function useOptions({ control, getValues, setValue }, name = "options") {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  // افزودن گزینه جدید
  const addOption = () => append({ text: "", isCorrect: false });

  // حذف گزینه
  const removeOptionByIndex = (index) => remove(index);

  // تغییر گزینه صحیح
  const toggleCorrect = (index) => {
    const current = getValues(name);
    const updated = current.map((opt, i) => ({
      ...opt,
      isCorrect: i === index,
    }));
    setValue(name, updated);
  };

  return {
    fields,
    addOption,
    removeOption: removeOptionByIndex,
    toggleCorrect,
  };
}
