// MultipleQuestionForm.jsx

import { useForm } from "react-hook-form";
import CustomeInputField from "../form_parts/CustomeInputField";
import { Button, Grid } from "@mui/material";
import Options from "../form_parts/Options";
import { generateOptions } from "../form_parts/Options";

export default function MultipleQuestionForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      stem: "",
      text: "",
      options: generateOptions(4)
    }
    
  });

  const onSubmit = (data) => console.log("Form data:", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-">
        <Grid container spacing={2}>
            <Grid size={{sm:12, lg:5}}>
                <CustomeInputField
                    name="stem"
                    label="Question Stem"
                    control={control}
                    rules={{ required: "Question Stem is required" }}
                />
            </Grid>

            <Grid size={{sm:12, lg:7}}>
                <CustomeInputField
                    name="text"
                    label="Question Text"
                    control={control}
                    rules={{ required: "Question Text is required" }}
                    />
            </Grid>
        </Grid>

        <Options control={control}/>


      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Submit Question
      </Button>
    </form>
  );
}
