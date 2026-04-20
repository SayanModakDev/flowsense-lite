import { useCrowdData } from '../hooks/useCrowdData';
import CrowdMap from '../components/CrowdMap';

export default function MapPage() {
  const { zones } = useCrowdData();

  return (
    <div className="max-w-md mx-auto h-full text-left">
      <header className="py-6 px-2 mb-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-(--accent) rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
            <span className="text-xl">🗺️</span>
          </div>
          <div>
            <h1 className="text-3xl font-black text-(--text-h) m-0 tracking-tight">Crowd Map</h1>
            <p className="text-[10px] font-bold text-(--text) opacity-40 uppercase tracking-[0.2em] leading-none">Visual Overview</p>
          </div>
        </div>
      </header>
      <CrowdMap zones={zones} />
    </div>
  );
}
