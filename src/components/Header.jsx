// components/Header.jsx
import TimeDisplay from "./Time-display";
import DateDisplay from "./DateDisplay";

export default function Header() {
  return (
    <header dir="rtl">
      <div className="container">
        <div className="border-b border-white pt-6 pb-3 px-4 flex justify-between items-center ">
          <DateDisplay/>
          <TimeDisplay/>
        </div>
      </div>
    </header>
  );
}
