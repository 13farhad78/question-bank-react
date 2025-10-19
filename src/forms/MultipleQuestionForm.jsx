import { useForm } from "react-hook-form";
import { Button, IconButton, InputAdornment, Grid2 } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CustomeInputField from "../form_parts/CustomeInputField";
import { useOptions } from "../hooks/useOptions";

export default function MultipleQuestionForm() {
    const methods = useForm({
        defaultValues: {
            stem: "",
            text: "",
            options: [
                { text: "", isCorrect: true },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
            ],
        },
    });

    const { control, handleSubmit, getValues, setValue } = methods;

    const { fields, addOption, removeOption, toggleCorrect } = useOptions({
        control,
        getValues,
        setValue,
    });

    const onSubmit = (data) => console.log("Form data:", data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Question Stem & Text */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <CustomeInputField
                    name="stem"
                    label="Question Stem"
                    control={control}
                    rules={{ required: "Question Stem is required" }}
                />
                <CustomeInputField
                    name="text"
                    label="Question Text"
                    control={control}
                    rules={{ required: "Question Text is required" }}
                />
            </div>

            {/* Options Section */}
            <Grid2 container spacing={2} mt={2}>
                {fields.map((field, index) => (
                    <Grid2 key={field.id} size={{ xs: 12, sm: 6 }}>
                        <CustomeInputField
                            name={`options.${index}.text`}
                            label={`Option ${index + 1}`}
                            control={control}
                            InputLabelProps={{
                                sx: {
                                    color: field.isCorrect
                                        ? "green"
                                        : "inherit",
                                },
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: field.isCorrect
                                            ? "green"
                                            : undefined,
                                    },
                                    "&:hover fieldset": {
                                        borderColor: field.isCorrect
                                            ? "green"
                                            : undefined,
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: field.isCorrect
                                            ? "green"
                                            : undefined,
                                    },
                                },
                            }}
                            rules={{ required: "Option text is required" }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            onClick={() => toggleCorrect(index)}
                                            color={
                                                field.isCorrect
                                                    ? "success"
                                                    : "default"
                                            }>
                                            <CheckIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => removeOption(index)}
                                            color="error">
                                            <HighlightOffIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid2>
                ))}
            </Grid2>

            <Button
                type="button"
                onClick={addOption}
                variant="outlined"
                sx={{ mt: 2 }}>
                ➕ Add Option
            </Button>

            <Button type="submit" variant="contained" sx={{ mt: 4 }}>
                Submit Question
            </Button>
        </form>
    );
}
