// FormOptions.jsx
import InputWithIcons from "../form_parts/InputWithIcons";
import CheckIcon from "../assets/CheckIcon";
import TrashIcon from "../assets/TrashIcon";
import Button from "../components/Button";

export default function FormOptions({ optionsData, updateOption, toggleOptionCorrect, addOption, removeOption }) {

    const handleCheckClick = (key) => {
    toggleOptionCorrect(key); // تابعی که در والد یا hook تعریف شده
  };

  return (

    <>
      <div className="my-2 grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.keys(optionsData).map((key) => (
          <InputWithIcons
            key={key}
            label={`Option ${key}`}
            name={key}
            value={optionsData[key].text}
            placeholder={`Option ${key}`}
            onChange={(e) => updateOption(key, e.target.value)}
            isCorrect={optionsData[key].isCorrect}
            leftIcon={<CheckIcon/>}
            rightIcon={<TrashIcon/>}
            leftIconOnClick={() => handleCheckClick(key)}
            rightIconOnClick={() => removeOption(key)}
          />
        ))}
      </div>

      <Button className="mr-2" onClick={addOption} type={"button"}>
        Add Option
      </Button>
    </>
  );
}
