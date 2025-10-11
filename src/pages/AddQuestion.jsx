import { useState } from "react";
import MultipleChoiceForm from "../components/MultipleChoiceForm";

export default function AddQuestion() {
  const [activeTab, setActiveTab] = useState("Multiple Choice");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    console.log(tab);
  };

  const tabs = ["Multiple Choice", "True/False", "Reading"];

  return (
    <div className="max-w-auto mx-auto mt-6 p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-white">Add Question Page</h1>

      <p className="text-white mb-4">Choose your question type</p>

      <div>
        <ul className="flex gap-4 mb-6 border-b border-white/30">
          {tabs.map((tab) => (
            <li
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`cursor-pointer px-3 py-2 rounded-t-lg transition-colors
                ${
                  activeTab === tab
                    ? " bg-slate-900 text-white font-semibold"
                    : "text-white/70 hover:text-white"
                }`}
            >
              {tab}
            </li>
          ))}
        </ul>

        <div className="text-white">
          {activeTab === "Multiple Choice" && <div><MultipleChoiceForm /></div>}
          {activeTab === "True/False" && <div></div>}
          {activeTab === "Reading" && <div>Reading content goes here</div>}
        </div>
      </div>
    </div>
  );
}
