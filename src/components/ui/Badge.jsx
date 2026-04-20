export default function Badge({ label, variant = 'gray' }) {
  const colors = {
    low: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    medium: 'bg-amber-50 text-amber-600 border-amber-100',
    high: 'bg-rose-50 text-rose-600 border-rose-100',
    gray: 'bg-slate-50 text-slate-500 border-slate-100'
  };
  const colorClass = colors[variant] || colors.gray;

  return (
    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${colorClass}`}>
      {label}
    </span>
  );
}
