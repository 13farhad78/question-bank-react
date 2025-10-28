// --------------------------------------------------------------------------------
// 🧰 UTILITY: cleanData
// --------------------------------------------------------------------------------
/**
 * Removes all `null` or `undefined` values from an object and its first-level nested objects.
 * This ensures that the data sent to API or stored in DB is "clean".
 *
 * 🔹 Step-by-step:
 * 1. Clone the input object to avoid mutating the original.
 * 2. Iterate over top-level keys.
 * 3. If a value is an object, iterate over its keys and remove null/undefined.
 * 4. Remove top-level keys that are null/undefined.
 *
 * ⚠️ Weaknesses / Limitations:
 * - Only cleans **one level of nesting**; deeper nested objects remain untouched.
 * - Arrays are not deeply cleaned; null elements inside arrays stay.
 *
 * 💡 Recommendations:
 * - For deep cleaning, consider a recursive approach or use a utility like lodash's `_.omitBy`.
 * - Keep this function pure — it doesn’t mutate the input, which is good.
 */
export const cleanData = (data) => {
    const cleanedData = { ...data }; // clone

    Object.keys(cleanedData).forEach((key) => {
        if (typeof cleanedData[key] === "object" && cleanedData[key] !== null) {
            Object.keys(cleanedData[key]).forEach((nestedKey) => {
                if (
                    cleanedData[key][nestedKey] === null ||
                    cleanedData[key][nestedKey] === undefined
                ) {
                    delete cleanedData[key][nestedKey];
                }
            });
        }
        if (cleanedData[key] === null || cleanedData[key] === undefined) {
            delete cleanedData[key];
        }
    });

    return cleanedData;
};