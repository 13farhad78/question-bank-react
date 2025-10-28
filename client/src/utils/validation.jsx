
// --------------------------------------------------------------------------------
// 🧰 UTILITY: validateMultipleChoiceCorrectOption
// --------------------------------------------------------------------------------
/**
 * Checks if at least one option in a multiple-choice question is marked as correct.
 *
 * 🔹 Step-by-step:
 * 1. Check if the input array exists and is non-empty.
 * 2. Use `.some()` to see if any option has `isCorrect: true`.
 * 3. Return true if at least one correct option exists; otherwise, false.
 *
 * ⚠️ Weaknesses / Limitations:
 * - Does not validate structure of each option object (could throw if `isCorrect` is missing).
 * - Assumes `isCorrect` is strictly boolean; truthy/falsy values may behave unexpectedly.
 *
 * 💡 Recommendations:
 * - Consider adding runtime checks for object structure.
 * - Could be extended to accept custom keys or support multiple correct answers validation rules.
 */
export const validateMultipleChoiceCorrectOption = (options) => {
    if (!options || options.length === 0) {
        return false;
    }
    
    return options.some((option) => option.isCorrect === true);
}