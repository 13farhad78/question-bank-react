import { grades, subjects, Lessons, difficulties, years, months, iranProvinces } from "../data/Data";
import SelectInput from "./SelectIput";

export default function BasicQuestionInfo({ formData, errors, onChange }) {
  const { grade, subject, lesson, difficulty, isFinal, year, month, city } = formData;

  return (
    <div className="mt-4 border-t border-white/30 pt-4">
      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
        <SelectInput
          label="Grade"
          options={grades}
          value={grade}
          onChange={(val) => onChange("grade", val)}
          error={errors.grade}
        />
        <SelectInput
          label="Subject"
          options={subjects}
          value={subject}
          onChange={(val) => onChange("subject", val)}
          error={errors.subject}
        />
        <SelectInput
          label="Lesson"
          options={Lessons[grade]}
          value={lesson}
          onChange={(val) => onChange("lesson", val)}
          error={errors.lesson}
        />
        <SelectInput
          label="Difficulty"
          options={difficulties}
          value={difficulty}
          onChange={(val) => onChange("difficulty", val)}
          error={errors.difficulty}
        />

        <div className="flex items-center gap-6 text-white ml-6">
          <label htmlFor="source_final" className="text-md font-medium select-none">
            Is the question final?
          </label>
          <input
            type="checkbox"
            id="source_final"
            checked={isFinal}
            onChange={(e) => onChange("isFinal", e.target.checked)}
            className="appearance-none w-5 h-5 border-2 border-white/40 rounded-md bg-white/5 
              backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-110
              checked:bg-blue-500 checked:border-blue-400 
              relative checked:after:content-['✔'] checked:after:absolute checked:after:text-white 
              checked:after:text-xs checked:after:top-[1px] checked:after:left-[3px]"
          />
        </div>
      </div>

      <div
        className={`
          border-t border-white/30 
          transition-all duration-300 ease-in-out
          ${isFinal && (grade === 12 || grade === 11) 
            ? "opacity-100 h-auto pt-4 mt-6 border-t" 
            : "opacity-0 max-h-0 pt-0 mt-0 border-t-0 overflow-hidden"}
        `}
      >
        <h3 className="font-semibold">12th final question info</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectInput
            label="Year"
            options={years}
            value={year} 
            onChange={(val) => onChange("year", val)}
            error={errors.year}
          />
          <SelectInput
            label="Month"
            options={months}
            value={month}
            onChange={(val) => onChange("month", val)}
            error={errors.month}
          />
        </div>
      </div>

      <div 
        className={`
          border-t border-white/30 
          transition-all duration-300 ease-in-out
          ${isFinal && grade === 9 
            ? "opacity-100 h-auto pt-4 mt-6 border-t" 
            : "opacity-0 max-h-0 pt-0 mt-0 border-t-0 overflow-hidden"}
        `}
          >
          <h3 className="font-semibold ">9th final question info</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectInput
              label="Year"
              options={years}
              value={year}
              onChange={(val) => onChange("year", val)}
              error={errors.year}
            />
            <SelectInput
              label="City"
              options={iranProvinces}
              value={city}
              onChange={(val) => onChange("city", val)}
              error={errors.city}
            />
          </div>
        </div>
    </div>
  );
}
