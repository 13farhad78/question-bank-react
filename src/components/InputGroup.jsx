export default function InputGroup({ label, type, placeholder, error, }) {
  return (
    <div className="mb-4 flex flex-col justify-center">
      <label className="block text-white font-medium mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white 
          placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
