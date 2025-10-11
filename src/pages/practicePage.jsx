import FormOptions from "../form_parts/FormOptions"
import useOptionsData from "../hooks/useOptionsData"
import Button from "../components/Button";

export default function PracticePage () {
    const { optionsData, updateOption, toggleOptionCorrect, addOption, removeOption } = useOptionsData(4);

      const handleSubmit = () => {
        console.log("Final Options:", optionsData);
        // می‌تونی این دیتا رو به API بفرستی یا فرم نهایی بسازی
    };
    return (
        <div className="max-w-auto mx-auto mt-6 p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg">
                  <FormOptions 
                    optionsData={optionsData} 
                    updateOption={updateOption} 
                    toggleOptionCorrect={toggleOptionCorrect} 
                    addOption={addOption}
                    removeOption={removeOption}
                  />

                  <Button onClick={handleSubmit}>Submit</Button>


        </div>
    )
}