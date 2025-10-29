export default function TrueFalseCard({ question }) {
  return (
    <div>
      <p className="mb-3 text-gray-100">{question.question_text}</p>
      <div
        className={`inline-block px-4 py-2 rounded-lg ${
          question.correct_answer === "True"
            ? "bg-green-700/50 text-green-300"
            : "bg-red-700/50 text-red-300"
        }`}
      >
        {question.correct_answer}
      </div>
    </div>
  );
}
