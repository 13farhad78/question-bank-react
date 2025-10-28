import { Autocomplete, Container, TextField } from "@mui/material";
import MultipleQuestionForm from "../forms/MultipleQuestionForm";
import FillInTheBlankForm from "../forms/FillInTheBlankForm";
import ReadingForm from "../forms/ReadingForm";
import { questionTypes } from "../data/Data";
import { useState } from "react";

export default function AddQuestionPage() {
    const [selectedType, setSelectedType] = useState(null);

    return (
        <Container>
            <Autocomplete
                options={questionTypes}
                onChange={(event, newValue) => {
                    setSelectedType(newValue ? newValue.value : null);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="question Type"
                        sx={{ mb: 4 }}
                    />
                )}
            />

            {/* {conditional rendering} */}
            {selectedType === "multiple_choice" && <MultipleQuestionForm />}
            {selectedType === "fill_in_the_blank" && <FillInTheBlankForm />}
            {selectedType === "Reading" && <ReadingForm />}

            {selectedType === null && (
                <div className=" text-lg">
                    Please select a question type to proceed.
                </div>
            )}
        </Container>
    );
}
