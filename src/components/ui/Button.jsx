export default function Button({ children, onClick, isLoading, disabled, className = '' }) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      aria-disabled={isLoading || disabled}
      className={`
        relative w-full overflow-hidden
        bg-linear-to-r from-(--accent) to-purple-600 
        text-white font-black uppercase tracking-widest text-xs py-4 px-6 rounded-2xl
        shadow-lg shadow-purple-500/20
        hover:shadow-purple-500/40 hover:-translate-y-1 active:scale-95 active:translate-y-0
        transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading && (
          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        )}
        <span>{isLoading ? "Analyzing..." : children}</span>
      </div>
    </button>
  );
}
