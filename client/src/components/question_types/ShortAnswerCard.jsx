export default function ShortAnswerCard({ question }) {
  return (
    <div>
      <p className="mb-3 text-gray-100">{question.question_text}</p>
      <div className="bg-gray-700/70 rounded-lg p-3 text-gray-300 italic">
        {question.short_answer || "— بدون پاسخ —"}
      </div>
    </div>
  );
}
