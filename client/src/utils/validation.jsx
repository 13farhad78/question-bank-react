/**
 * بررسی می‌کند که آیا حداقل یک گزینه در آرایه، به عنوان پاسخ صحیح علامت‌گذاری شده است (isCorrect: true).
 *
 * @param {Array<Object>} options - آرایه‌ای از اشیاء گزینه. هر شیء باید شامل یک فیلد `isCorrect` باشد.
 * @returns {boolean} - اگر حداقل یک گزینه صحیح باشد، `true` و در غیر این صورت `false`.
 */
export const validateMultipleChoiceCorrectOption = (options) => {
    // اگر آرایه موجود نبود یا خالی بود، اعتبارسنجی ناموفق است.
    if (!options || options.length === 0) {
        return false;
    }
    
    // از متد .some() برای بررسی وجود حداقل یک عنصر با isCorrect: true استفاده می‌کنیم.
    return options.some((option) => option.isCorrect === true);
};