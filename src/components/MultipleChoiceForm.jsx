import InoutWithIcons from "./InputWithIcons";
import CheckIcon from "../assets/CheckIcon";
import TrashIcon from "../assets/TrashIcon";
import { useState } from "react";
import BasicQuestionInfo from "./BasicQuestionInfo";
import Button from "./Button";

export default function MultipleChoiceForm() {
  const MIN_OPTIONS = 2;
  const MAX_OPTIONS = 6;

  const initialOptions = {
    A: { text: "", isCorrect: false },
    B: { text: "", isCorrect: false },
    C: { text: "", isCorrect: false },
    D: { text: "", isCorrect: false },
  };

  const [formData, setFormData] = useState({
    questionStem: "",
    questionText: "",
    options: initialOptions,
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

  // تغییرات فیلدهای اصلی
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // تغییر متن گزینه‌ها
  const handleOptionChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      options: { ...prev.options, [key]: { ...prev.options[key], text: value } },
    }));
    setErrors((prev) => ({ ...prev, [`option${key}`]: undefined }));
  };

  // تعیین گزینه صحیح
  const handleSetCorrect = (key) => {
    const newOptions = {};
    Object.keys(formData.options).forEach((k) => {
      newOptions[k] = { ...formData.options[k], isCorrect: k === key };
    });
    setFormData((prev) => ({ ...prev, options: newOptions }));
  };

  // حذف گزینه با مرتب سازی کلیدها
  const handleRemoveOption = (key) => {
    const optionKeys = Object.keys(formData.options);
    if (optionKeys.length <= MIN_OPTIONS) return;

    const newOptions = { ...formData.options };
    delete newOptions[key];

    // مرتب سازی کلیدها از A شروع
    const sortedOptions = {};
    Object.values(newOptions).forEach((opt, idx) => {
      const newKey = String.fromCharCode(65 + idx); // 65 = "A"
      sortedOptions[newKey] = opt;
    });

    setFormData((prev) => ({ ...prev, options: sortedOptions }));
  };

  // افزودن گزینه
  const handleAddOption = () => {
    const optionKeys = Object.keys(formData.options);
    if (optionKeys.length >= MAX_OPTIONS) return;

    const nextKey = String.fromCharCode(65 + optionKeys.length); // بعد از آخرین گزینه
    setFormData((prev) => ({
      ...prev,
      options: { ...prev.options, [nextKey]: { text: "", isCorrect: false } },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.questionStem) newErrors.questionStem = "Question stem is required";
    if (!formData.questionText) newErrors.questionText = "Question text is required";

    Object.keys(formData.options).forEach((key) => {
      if (!formData.options[key].text)
        newErrors[`option${key}`] = `Option ${key} is required`;
    });

    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.lesson) newErrors.lesson = "Lesson is required";
    if (!formData.difficulty) newErrors.difficulty = "Difficulty is required";

    if (formData.isFinal) {
      if (formData.grade === 12 || formData.grade === 11) {
        if (!formData.year) newErrors.year = "Year is required";
        if (!formData.month) newErrors.month = "Month is required";
      }
      if (formData.grade === 9) {
        if (!formData.year) newErrors.year = "Year is required";
        if (!formData.city) newErrors.city = "City is required";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Form submitted successfully", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Question Stem and Text */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <InoutWithIcons
          label="Question stem"
          placeholder
          value={formData.questionStem}
          onChange={(e) => handleChange("questionStem", e.target.value)}
          error={errors.questionStem}
        />
        <InoutWithIcons
          label="Question text"
          type="text"
          placeholder="Enter your question text here"
          value={formData.questionText}
          onChange={(e) => handleChange("questionText", e.target.value)}
          error={errors.questionText}
        />
      </div>

      {/* Options */}
      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.keys(formData.options).map((key) => {
            const option = formData.options[key];
            return (
              <InoutWithIcons
                key={key}
                label={`Option ${key}`}
                type="text"
                placeholder={`Enter option ${key}`}
                value={option.text}
                onChange={(e) => handleOptionChange(key, e.target.value)}
                isCorrect={option.isCorrect}
                leftIcon={
                    <CheckIcon />
                }
                leftIconOnClick={() => handleSetCorrect(key)}
                rightIconDisabled={Object.keys(formData.options).length <= MIN_OPTIONS}
                rightIconOnClick={() => handleRemoveOption(key)}
                
                
                rightIcon={
                    <TrashIcon />
                }
                error={errors[`option${key}`]}
              />
            );
          })}
        </div>

        {/* Add Option Button */}
        <button
          type="button"
          onClick={handleAddOption}
          disabled={
            Object.values(formData.options).some((o) => o.text.trim() === "") ||
            Object.keys(formData.options).length >= MAX_OPTIONS
          }
          className={`mt-4 px-4 py-2 rounded transition ${
            Object.values(formData.options).some((o) => o.text.trim() === "") ||
            Object.keys(formData.options).length >= MAX_OPTIONS
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          افزودن گزینه +
        </button>
      </div>

      {/* Basic Question Info */}
      <BasicQuestionInfo
        formData={formData}
        errors={errors}
        onChange={(field, value) => handleChange(field, value)}
      />

      <Button onClick={handleSubmit} className="mt-4">
        Submit
      </Button>
    </form>
  );
}
