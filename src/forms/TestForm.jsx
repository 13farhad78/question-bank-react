import FormParent from "../form_parts/FormParant";
import FormOptions from "../form_parts/FormOptions";
import useOptionsData from "../hooks/useOptionsData";

export default function TestForm () {

    const { optionsData, updateOption, toggleOptionCorrect, addOption, removeOption } = useOptionsData(4);

    return (
        <FormParent>
            <FormOptions 
                optionsData={optionsData} 
                updateOption={updateOption} 
                toggleOptionCorrect={toggleOptionCorrect} 
                addOption={addOption}
                removeOption={removeOption}
            />
        </FormParent>
    )
}