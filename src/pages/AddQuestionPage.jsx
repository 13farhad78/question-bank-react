import { Container } from "@mui/material";
import MultipleQuestionForm from "../forms/MultipleQuestionForm";

export default function AddQuestionPage() {
	return (
		<Container>
			<div className="flex flex-col gap-5">
				add questions
				<MultipleQuestionForm />
			</div>
		</Container>
	);
}
