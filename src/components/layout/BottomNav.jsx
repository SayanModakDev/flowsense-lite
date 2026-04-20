import { NavLink } from 'react-router-dom';

export default function BottomNav() {
  const links = [
    { to: '/', label: 'Radar', icon: '📡' },
    { to: '/map', label: 'Map', icon: '🗺️' },
    { to: '/recommend', label: 'AI Pick', icon: '🪄' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[500px] mx-auto z-50 bg-(--glass-bg) backdrop-blur-xl border-t border-(--glass-border) flex justify-around items-center px-4 py-3 pb-6 rounded-t-3xl shadow-2xl">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/'}
          aria-label={link.label}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-all duration-300 ${
              isActive
                ? 'text-(--accent) scale-110'
                : 'text-(--text) opacity-60 hover:opacity-100'
            }`
          }
        >
          <span className="text-xl">{link.icon}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest leading-none">
            {link.label}
          </span>
        </NavLink>
      ))}
    </nav>
  );
}
