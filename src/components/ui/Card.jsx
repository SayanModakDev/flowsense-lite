export default function Card({ children, className = '', hover = true }) {
  return (
    <div className={`
      bg-(--bg) rounded-3xl border border-(--border) overflow-hidden transition-all duration-300
      ${hover ? 'hover:shadow-lg hover:border-(--accent-border) hover:-translate-y-1' : 'shadow-sm'}
      ${className}
    `}>
      {children}
    </div>
  );
}
