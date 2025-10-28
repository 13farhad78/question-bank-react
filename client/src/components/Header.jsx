import DateDisplay from "./DateDisplay";
import TimeDisplay from "./Time-Display";
import { useLocation } from "react-router-dom";

export default function Header() {
const location = useLocation();

  // map مسیر به عنوان صفحه
  const pageTitles = {
    "/": "Dashboard",
    "/add-question": "Add Question",
    "/saved-questions": "Question Bank",
    "/settings": "Settings",
  };

  const title = pageTitles[location.pathname] || "Dashboard";

  return (
    <header className="flex justify-between items-center p-3 bg-gray-900 shadow-sm w-full">
      {/* عنوان صفحه */}
      <h1 className="text-lg font-semibold">{title}</h1>

      {/* ساعت و تاریخ */}
        <div className="flex items-center text-gray-300 text-sm">
            <TimeDisplay />
            
            <div className="border-l border-gray-500 h-6 mx-3"></div> {/* Divider عمودی */}
            
            <DateDisplay />
        </div>

    </header>
  )
}
