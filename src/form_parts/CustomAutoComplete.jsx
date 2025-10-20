import { Controller, useFormContext } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function CustomAutoComplete({ name, options = [] }) {
  const { control } = useFormContext();

  return (
    <Box sx={{ width: "100%" }}>
      <Controller
        name={name}
        control={control}
        defaultValue={null} // مقدار اولیه خالی
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <Autocomplete
            {...field}
            options={options}
            getOptionLabel={(option) => option?.label || ""}
            isOptionEqualToValue={(option, value) => option?.value === value?.value}
            onChange={(event, value) => field.onChange(value)} // اتصال RHF
            renderInput={(params) => (
              <TextField
                {...params}
                label={name}
                error={!!fieldState.error}
                helperText={fieldState.error ? `Select ${name}` : ""}
                InputLabelProps={{
                  sx: {
                    fontFamily: "Vazir, sans-serif",
                  },
                }}
                inputProps={{
                  ...params.inputProps,
                  style: {
                    textAlign: "right",
                    fontFamily: "Vazir, sans-serif",
                  },
                }}
              />
            )}
            PaperComponent={(props) => (
              <div
                {...props}
                style={{ direction: "rtl", fontFamily: "Vazir, sans-serif" }}
              />
            )}
            noOptionsText="هیچ گزینه‌ای موجود نیست"
          />
        )}
      />
    </Box>
  );
}
