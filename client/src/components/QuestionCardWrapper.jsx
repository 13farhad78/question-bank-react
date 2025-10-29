// QuestionCardWrapper.jsx
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function QuestionCardWrapper({
  type, // نوع سوال (مثلاً Multiple Choice)
  info, // اطلاعات پایه (پایه، درس، سطح سختی، منبع و...)
  onEdit, // تابع ویرایش (اختیاری)
  onDelete, // تابع حذف (اختیاری)
  children, // بدنه‌ی سوال
}) {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-md p-5 mb-6 border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/40">
      {/* بخش هدر */}
      <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-3">
        <span className="text-sm font-semibold text-gray-200 tracking-wide">
          {type || "Question Type"}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="p-1.5 rounded-full text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition-colors"
            title="Edit"
          >
            <EditIcon fontSize="small" />
          </button>

          <button
            onClick={onDelete}
            className="p-1.5 rounded-full text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-colors"
            title="Delete"
          >
            <DeleteIcon fontSize="small" />
          </button>
        </div>
      </div>

      {/* بخش اطلاعات پایه */}
      {info && (
        <div className="flex flex-wrap gap-2 text-xs text-gray-400 mb-4">
          {Object.entries(info).map(([key, value]) => (
            <span
              key={key}
              className="bg-gray-700/70 px-2 py-0.5 rounded-full border border-gray-600"
            >
              <strong className="text-gray-300">{key}:</strong> {value}
            </span>
          ))}
        </div>
      )}

      {/* بدنه‌ی سوال */}
      <div className="bg-gray-700 rounded-xl p-4 shadow-inner text-gray-100">
        {children}
      </div>
    </div>
  );
}
