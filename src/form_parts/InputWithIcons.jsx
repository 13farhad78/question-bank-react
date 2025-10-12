export default function InputWithIcons({
  label,
  placeholder,
  error,
  leftIcon,
  rightIcon,
  value,       
  onChange,
  leftIconOnClick,
  rightIconOnClick,
  rightIconDisabled = false,
  leftIconDisabled = false,
  isCorrect = false
}) {
  return (
    <div className="mb-4 flex flex-col justify-start h-20">
      <label className={`block text-white font-medium mb-1`}>{label}</label>
      <div className="relative">
        <textarea
          placeholder={placeholder}
          rows={1}
          value={value}              
          onChange={onChange}        
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          className={`w-full px-4 py-2 rounded-lg bg-black/ backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${leftIcon ? "pl-10" : ""} ${rightIcon ? "pr-10" : ""} ${error ? "border border-red-400 focus:ring-red-400" : ""} resize-none overflow-hidden`}
        />
        {rightIcon && (
          <button 
          className="absolute top-1 right-1 flex items-center cursor-pointer hover:bg-red-700 rounded-full p-1 transition"
          onClick={rightIconOnClick}
          disabled={rightIconDisabled}
          type="button"
          >
            {rightIcon}
          </button>
        )}
        {leftIcon && (
          <button 
          className={`absolute top-1 left-1 flex items-center cursor-pointer hover:bg-green-700 rounded-full p-1 transition ${isCorrect ? "bg-green-700" : ""}`}
          onClick={leftIconOnClick}
          disabled={leftIconDisabled}
          type="button"
          >
            {leftIcon}
          </button>
        )}
      </div>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
