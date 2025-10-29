export default function MultipleChoiceCard({ question }) {
  return (
    <div>
      <p className="mb-3 text-gray-100">{question.question_text}</p>
      <ul className="space-y-2">
        {question.options?.map((opt, i) => (
          <li
            key={i}
            className={`px-3 py-2 rounded-lg ${
              opt.isCorrect
                ? "bg-green-700/40 text-green-300 font-semibold"
                : "bg-gray-800 text-gray-200"
            }`}
          >
            {opt.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
