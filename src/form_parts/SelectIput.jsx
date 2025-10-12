import Select from "react-select";

export default function SelectInput({
  label,
  options,
  error,
  value,
  onChange,
  placeholder,
  isMulti = false, // 👈 حالت چند‌انتخابی (پیش‌فرض false)
}) {
  // ✅ هندلر داخلی برای برگردوندن فقط value یا آرایه‌ای از valueها
  const handleChange = (selectedOption) => {
    if (isMulti) {
      onChange(selectedOption ? selectedOption.map((opt) => opt.value) : []);
    } else {
      onChange(selectedOption ? selectedOption.value : "");
    }
  };

  // ✅ مقدار مناسب برای حالت کنترل‌شده
  const getValue = () => {
    if (isMulti) {
      return options.filter((opt) => value?.includes(opt.value));
    } else {
      return options.find((opt) => opt.value === value) || null;
    }
  };

  return (
    <div className="mb-4 flex flex-col w-full">
      {label && <label className="block text-white font-medium mb-1">{label}</label>}

<Select
  options={options}
  value={getValue()}
  onChange={handleChange}
  placeholder={placeholder || "Select..."}
  isMulti={isMulti}
  styles={{
    control: (base) => ({
      ...base,
      backgroundColor: "rgba(255,255,255,0.1)",
      borderColor: error ? "rgba(255, 100, 100, 0.8)" : "rgba(255,255,255,0.3)", // اضافه شد
      color: "white",
      minHeight: "40px",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "rgba(30,30,30,0.9)",
      color: "white",
      zIndex: 50,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "rgba(80,80,80,0.8)" : "transparent",
      color: "white",
      cursor: "pointer",
    }),
    input: (base) => ({
      ...base,
      color: "white",
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
    placeholder: (base) => ({
      ...base,
      color: "rgba(255,255,255,0.6)",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "rgba(255,255,255,0.2)",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "white",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "white",
      ":hover": { backgroundColor: "red", color: "white" },
    }),
  }}
/>


      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
