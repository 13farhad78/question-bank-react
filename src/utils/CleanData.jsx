export const cleanData = (data) => {
    const cleanedData = { ...data };
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