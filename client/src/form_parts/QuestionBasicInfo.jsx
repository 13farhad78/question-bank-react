// /client/src/components/form_parts/QuestionBasicInfo.jsx

// --------------------------------------------------------------------------------
// 🧩 IMPORTS
// --------------------------------------------------------------------------------

import { useEffect, useRef } from "react"; // React hooks for side effects and persisting values
import CustomAutoComplete from "./CustomAutoComplete"; // Reusable dropdown component integrated with RHF
import CustomCheckBox from "./CustomCheckBox";         // Reusable checkbox component integrated with RHF
import {
	Lessons,
	grades,
	subjects,
	difficulties,
	years,
	months,
	iranProvinces,
} from "../data/Data"; // Static data sets for dropdowns
import { useFormContext, useWatch } from "react-hook-form"; // RHF hooks for controlling form state

// --------------------------------------------------------------------------------
// 🧠 COMPONENT: QuestionBasicInfo
// --------------------------------------------------------------------------------
// Responsible for the "basic info" section of a question form:
// - Select grade, lesson, difficulty, and language skill
// - Conditional fields for final exam questions
// - Dynamic dependent dropdowns
// --------------------------------------------------------------------------------

export default function QuestionBasicInfo() {
	const { control, setValue } = useFormContext(); 
	// 🔹 get control to pass to useWatch and setValue to programmatically update fields

	// --- Watch fields ---
	const selectedGrade = useWatch({ control, name: "basic_info.grade" }); 
    // 🔹 Watch grade to dynamically update lessons dropdown
	const isFinal = useWatch({ control, name: "questionSource.isFinal" }); 
    // 🔹 Watch if this is a final question to show conditional fields

	const previousGrade = useRef(null); 
    // 🔹 Persist previous grade to compare changes across renders
	const gradeKey = selectedGrade?.value ?? null; 
    // 🔹 Extract grade key (used to access Lessons map)
	const lessonOptions = gradeKey ? Lessons[gradeKey] || [] : []; 
    // 🔹 Compute lessons for selected grade

	// --- Reset lesson when grade changes ---
	useEffect(() => {
		if (previousGrade.current !== gradeKey) { 
            // 🔹 Only reset when grade actually changes
			setValue("basic_info.lesson", null); 
            // 🔹 Clear lesson value to prevent mismatch

			previousGrade.current = gradeKey; 
            // 🔹 Update ref to new grade
		}
	}, [gradeKey, setValue]);

	// --- Conditional fields for final questions ---
	const finalFieldMap = {
		12: ["year", "month"], // 🔹 Grade 12 final fields
		11: ["year", "month"], // 🔹 Grade 11 final fields
		9: ["year", "province"], // 🔹 Grade 9 final fields
	};

	// Map dropdown options for each conditional field
	const optionMap = {
		year: years,
		month: months,
		province: iranProvinces,
	};

	const finalFields = isFinal ? finalFieldMap[gradeKey] || [] : []; 
    // 🔹 Only show relevant conditional fields if final question

	return (
		<div>
			{/* 🔹 Divider */}
			<div className="bg-gray-500/20 h-0.5 w-full rounded-full mb-5"></div>

			{/* 🔹 First row: Grade, Lesson, Language Skill, Difficulty */}
			<div className="grid grid-cols-4 gap-2 mx-auto">
				<CustomAutoComplete 
                    name="basic_info.grade" 
                    label={"Grade"} 
                    options={grades} 
                />
				<CustomAutoComplete
					name="basic_info.lesson"
                    label={"Lesson"}
					options={lessonOptions} 
					disabled={!gradeKey} 
                    // 🔹 Disable lesson if grade not selected
				/>
				<CustomAutoComplete
					name="language_skills.focus"
                    label={"Language Skill"}
					options={subjects} 
				/>
				<CustomAutoComplete
					name="basic_info.difficulty"
                    label={"Difficulty"}
					options={difficulties} 
				/>
			</div>

			{/* 🔹 Second row: Final question toggle and conditional fields */}
			<div className="grid grid-cols-12 gap-2 mt-2 items-center justify-center">
				<div className="col-span-3 flex items-center">
					<CustomCheckBox
						name="questionSource.isFinal"
						label="Final Question" 
                        // 🔹 Toggle to mark question as final
					/>
				</div>

				{/* 🔹 Render conditional final fields */}
				{finalFields.map((field) => (
					<div key={field} className="col-span-4 mt-2">
						<CustomAutoComplete
							name={`questionSource.${field}`} 
                            // 🔹 Dynamic field path based on grade and final
							options={optionMap[field]} 
                            // 🔹 Set options according to field type
						/>
					</div>
				))}
			</div>
		</div>
	);
}


// --------------------------------------------------------------------------------
// 🧭 Developer Insight
// --------------------------------------------------------------------------------
// 🔹 Dynamic dropdowns: lesson list depends on grade selection.
// 🔹 Conditional fields appear only for final questions; avoids irrelevant inputs.
// 🔹 useWatch + useRef ensures fields reset properly without infinite loops.
// 🔹 Scalable: you can add new grades, lessons, or conditional fields by updating finalFieldMap or Lessons.
// 🔹 Security: all input controlled via RHF; data sanitization and validation should be done on form submission.
// 🔹 Performance: useEffect only triggers when gradeKey changes, avoiding unnecessary rerenders.
