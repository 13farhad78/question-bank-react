import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function CustomCheckBox({name, label, ...props}) {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={false}
            render={({ field }) => (
                <FormControlLabel
                    control={
                        <Checkbox
                            {...field}
                            {...props}
                            checked={field.value || false}
                            onChange={(e) => field.onChange(e.target.checked)}
                        />
                    }
                    label={label}
                />
            )}
        />
    );
}
