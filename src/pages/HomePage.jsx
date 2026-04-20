import { useCrowdData } from '../hooks/useCrowdData';
import ZoneList from '../components/ZoneList';

export default function HomePage() {
  const { zones, lastUpdated } = useCrowdData();

  return (
    <div className="max-w-md mx-auto relative h-full">
      <header className="py-6 px-2 mb-4 text-left">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-(--accent) rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
            <span className="text-xl">📡</span>
          </div>
          <div>
            <h1 className="text-3xl font-black text-(--text-h) m-0 tracking-tight">Live Radar</h1>
            <p className="text-[10px] font-bold text-(--text) opacity-40 uppercase tracking-[0.2em] leading-none">Stadium Intelligence</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-4 px-3 py-1.5 bg-(--accent-bg) border border-(--accent-border) rounded-full w-fit">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black text-(--accent) uppercase tracking-widest">
            Last Updated: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
      </header>
      <ZoneList zones={zones} />
    </div>
  );
}
