import MultipleChoiceCard from "./MultipleChoiceCard";
import TrueFalseCard from "./TrueFalseCard.jsx";
import ShortAnswerCard from "./ShortAnswerCard";

export default function ReadingCard({ question }) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-400 mb-2">{question.question_stem}</p>

      <div className="bg-gray-800/60 text-gray-200 rounded-lg p-3 mb-4 whitespace-pre-line">
        {question.reading_passage}
      </div>

      <div className="space-y-4">
        {question.questions?.map((subQ, i) => (
          <div key={i} className="border-t border-gray-700 pt-3">
            {subQ.type === "true_false" && <TrueFalseCard question={subQ} />}
            {subQ.type === "multi_choice" && (
              <MultipleChoiceCard question={subQ} />
            )}
            {subQ.type === "short_answer" && (
              <ShortAnswerCard question={subQ} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
