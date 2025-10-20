import { Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import SaveAsIcon from '@mui/icons-material/SaveAs';

export default function FormTamplate({ defaultValues, onSubmit, children }) {
    const methods = useForm({ defaultValues });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {children}

                <Button type="submit" variant="contained" sx={{ alignSelf: "start", mt: 3 }} startIcon={<SaveAsIcon/>}> submit form </Button>
            </form>
        </FormProvider>
    );
}
