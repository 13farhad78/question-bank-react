// useOptionsData.js
import { useState } from "react";

export default function useOptionsData(initialCount = 4) {
  // تولید اولیه‌ی گزینه‌ها
  const generateOptions = (num) => {
    const options = {};
    for (let i = 0; i < num; i++) {
      const key = i + 1;
      options[key] = { text: "", isCorrect: false };
    }
    return options;
  };

  const [optionsData, setOptionsData] = useState(generateOptions(initialCount));

  // تابع برای آپدیت یک گزینه
  const updateOption = (key, value) => {
    setOptionsData(prev => ({
      ...prev,
      [key]: { ...prev[key], text: value }
    }));
  };

  // امکان افزودن گزینه جدید
  const addOption = () => {
    setOptionsData(prev => {
      const nextKey = Object.keys(prev).length + 1;
      return { ...prev, [nextKey]: { text: "", isCorrect: false } };
    });
  };

  // تابع تعیین گزینه ی صحیح
  const toggleOptionCorrect = (key) => {
    setOptionsData(prev => {
      const updatedOptions = Object.keys(prev).reduce((acc, currKey) => {
        acc[currKey] = { ...prev[currKey], isCorrect: false };
        return acc;
      }, {});
      updatedOptions[key] = { ...updatedOptions[key], isCorrect: true };
      return updatedOptions;
    });
  };

  const removeOption = (key) => {
    setOptionsData(prev => {
      const k = String(key); // اطمینان از string بودن key
      const { [k]: _, ...rest } = prev;

      const sortedKeys = Object.keys(rest).map(Number).sort((a, b) => a - b);

      const reIndexedOptions = {};
      sortedKeys.forEach((oldKey, index) => {
        reIndexedOptions[index + 1] = rest[oldKey];
      });

      return reIndexedOptions;
    });
  };






  return { optionsData, updateOption, addOption, toggleOptionCorrect , removeOption };
}
