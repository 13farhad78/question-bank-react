import { useState } from "react";
import CustomeInputField from "./CustomeInputField";
import { useForm } from "react-hook-form";

export const generateOptions = (initCount) => {
	const init = {};
	for (let i = 0; i < initCount; i++) {
		let key = `option ${i + 1}`;
		init[key] = { text: "", isCorrect: false };
	}
	return init;
};
export default function Options({ initCount = 4, control }) {


	const [initialOptions, setInitialOptions] = useState(
		generateOptions(initCount)
	);

	return (
		<div className="flex flex-1 mt-3 gap-2">
			{Object.keys(initialOptions).map((key) => {
				return (
					<CustomeInputField
						key={key}
						name={`options.${key}.text`}
						label={key}
						control={control}
						rules={{ required: `${key} is required` }}
					/>
				);
			})}
		</div>
	);
}

