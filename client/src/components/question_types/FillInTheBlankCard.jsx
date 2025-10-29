export default function FillInTheBlankCard({ question }) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-2">{question.question_stem}</p>
      <p className="text-gray-100 mb-4">{question.question_text}</p>

      <div className="flex flex-wrap gap-2">
        {question.answer_slots?.map((a, i) => (
          <span
            key={i}
            className="bg-gray-700/60 text-blue-300 px-3 py-1 rounded-full"
          >
            {a.correct_word}
          </span>
        ))}
      </div>
    </div>
  );
}
