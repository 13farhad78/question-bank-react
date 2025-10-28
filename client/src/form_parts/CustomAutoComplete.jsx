// CustomAutoComplete.jsx

import { Autocomplete, Box, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useFormContext } from "react-hook-form";

// 💡 اضافه شدن پراپرتی 'label'
export default function CustomAutoComplete({ name, options = [], label, ...props }) {
    const { control } = useFormContext();

    // تعیین لیبل نمایش داده شده
    const displayLabel = label || name; 

    return (
        <Box sx={{ width: "100%" }}>
            <Controller
                name={name}
                control={control}
                defaultValue={null}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                    <Autocomplete
                        {...field}
                        {...props}
                        options={options}
                        getOptionLabel={(option) => option?.label || ""}
                        isOptionEqualToValue={(option, value) =>
                            option?.value === value?.value
                        }
                        // اتصال RHF: Autocomplete نیاز به تنظیم value در field دارد
                        // و در onChange مقدار جدید را به field.onChange پاس می‌دهد
                        onChange={(event, value) => field.onChange(value )} 
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                // 💡 استفاده از 'displayLabel' به جای 'name'
                                label={displayLabel} 
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message || ""}
                                fullWidth
                                autoComplete="off"
                            />
                        )}
                        slotProps={{
                            paper: { style: { fontFamily: "Vazir" } },
                        }}
                        noOptionsText="No Option"
                    />
                )}
            />
        </Box>
    );
}