// CustomScoreSelect.jsx

import * as React from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select, FormHelperText } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

// تابع کمکی برای تولید آپشن‌های نمره با فواصل 0.25
const generateScoreOptions = () => {
    const options = [];
    const minScore = 0.25;
    const maxScore = 2.0;
    const interval = 0.25;

    // شروع از minScore و افزایش تا رسیدن به maxScore
    for (let score = minScore; score <= maxScore; score += interval) {
        // برای جلوگیری از خطای محاسبات ممیز شناور (Float Point Errors)
        const displayScore = parseFloat(score.toFixed(2));
        options.push(displayScore);
    }
    return options;
};

// تولید لیست آپشن‌های نمره
const scoreOptions = generateScoreOptions();


export default function ScoreSelect({ name = "score_value", label = "Score" }) {
    
    const { control } = useFormContext();

    return (
        <Box sx={{ minWidth: 120 }}>
            <Controller
                name={name}
                control={control}
                // rules: تضمین می‌کند که نمره انتخاب شود
                rules={{ required: "لطفاً نمره سؤال را انتخاب کنید." }}
                // مقدار پیش‌فرض را روی یک عدد معتبر یا null/undefined تنظیم کنید
                defaultValue={scoreOptions[0] || 0.25} // می‌توانید اولین آپشن را پیش‌فرض بگذارید
                render={({ field, fieldState }) => (
                    <FormControl fullWidth error={!!fieldState.error}>
                        
                        <InputLabel id={`${name}-label`}>{label}</InputLabel>
                        
                        <Select
                            // 💡 اتصال RHF: Spread کردن field پراپرتی‌های value, onChange, onBlur
                            {...field}
                            labelId={`${name}-label`}
                            id={name}
                            label={label}
                            // 💡 اطمینان از اینکه value همیشه یک عدد است
                            value={field.value !== undefined ? field.value : ''} 
                        >
                            {scoreOptions.map((score) => (
                                <MenuItem key={score} value={score}>
                                    {score}
                                </MenuItem>
                            ))}
                        </Select>
                        
                        {/* نمایش پیام خطا */}
                        {fieldState.error && (
                            <FormHelperText>{fieldState.error.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />
        </Box>
    );
}