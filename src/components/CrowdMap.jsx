import { getDensityLevel, getDensityPercent } from '../utils/crowdHelpers';

export default function CrowdMap({ zones }) {
  const getColor = (level) => {
    const colors = {
      low: 'bg-emerald-400 border-emerald-500',
      medium: 'bg-amber-400 border-amber-500',
      high: 'bg-rose-400 border-rose-500',
    };
    return colors[level] || colors.low;
  };

  return (
    <div className="grid grid-cols-3 gap-3 px-2">
      {zones.map(zone => {
        const level = getDensityLevel(zone.currentCount, zone.capacity);
        const percent = getDensityPercent(zone.currentCount, zone.capacity);
        return (
          <div
            key={zone.id}
            className={`
              relative rounded-2xl border-2 p-3 aspect-square flex flex-col justify-between
              transition-all duration-700 cursor-default
              ${getColor(level)}
            `}
            style={{ opacity: 0.4 + (percent / 100) * 0.6 }}
          >
            <span className="text-white text-[10px] font-black uppercase tracking-widest leading-tight drop-shadow-sm">
              {zone.name}
            </span>
            <div className="flex items-end justify-between mt-auto">
              <span className="text-white/70 text-[9px] font-bold uppercase">{zone.type}</span>
              <span className="text-white text-lg font-black drop-shadow-md">{percent}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
