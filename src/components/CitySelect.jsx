import Select from "react-select";

export default function SelectInput(options, placeholder) {
    return (
        <Select
            options={options}
            placeholder={placeholder || "Select..."}
            styles={{
                control: (base) => ({
                    ...base,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "white",
                }),
                menu: (base) => ({
                    ...base,
                    backgroundColor: "rgba(30,30,30,0.9)",
                    color: "white",
                }),
                option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused
                        ? "rgba(80,80,80,0.8)" // رنگ هنگام hover
                        : "transparent",
                    color: "white",
                    cursor: "pointer",
                }),
                input: (base) => ({
                    ...base,
                    color: "white", // رنگ متن تایپ‌شده
                }),
                singleValue: (base) => ({
                    ...base,
                    color: "white",
                }),
                placeholder: (base) => ({
                    ...base,
                    color: "rgba(255,255,255,0.6)",
                }),
            }}
        />
    );
}
