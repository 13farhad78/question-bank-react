// CustomeInputField.jsx
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export default function CustomeInputField({ label, name, control,rules, ...props }) {
  return (
    <div>
        <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
            <TextField
            {...field}
            {...props}
            label={label}
            error={!!fieldState.error}
            helperText={fieldState.error?.message || ""}
            fullWidth
            autoComplete="off"
            />
            )}
        />
    </div>
  );
}
