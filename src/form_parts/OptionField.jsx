import { Controller, useFormContext } from "react-hook-form";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function OptionField({
    name,
    label,
    onToggleCorrect,
    isCorrect,
    sx,
}) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
                <TextField
                    {...field}
                    label={label}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message || ""}
                    fullWidth
                    autoComplete="off"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: isCorrect ? "green" : undefined,
                            },
                            "&:hover fieldset": {
                                borderColor: isCorrect ? "green" : undefined,
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: isCorrect ? "green" : undefined,
                            },
                        },
                        ...sx,
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton
                                        onClick={onToggleCorrect}
                                        color={
                                            isCorrect ? "success" : "default"
                                        }>
                                        <CheckIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            )}
        />
    );
}
