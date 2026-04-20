import Card from './ui/Card';
import Badge from './ui/Badge';
import { getDensityLevel, getDensityPercent } from '../utils/crowdHelpers';

export default function ZoneCard({ zone }) {
  const percent = getDensityPercent(zone.currentCount, zone.capacity);
  const level = getDensityLevel(zone.currentCount, zone.capacity);

  const colors = {
    low: 'bg-emerald-500',
    medium: 'bg-amber-500',
    high: 'bg-rose-500'
  };

  return (
    <Card className="p-5 mb-4 group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-(--text-h) text-lg mb-1 leading-tight">{zone.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-tighter text-(--text) opacity-50">{zone.type}</span>
          </div>
        </div>
        <Badge label={level.toUpperCase()} variant={level} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <span className="text-xs font-bold text-(--text) opacity-70">Occupancy</span>
          <span className="text-sm font-black text-(--text-h)">{percent}%</span>
        </div>
        
        <div className="w-full bg-(--bg) border border-(--border) rounded-full h-3 p-0.5 overflow-hidden shadow-inner">
          <div 
            className={`h-full rounded-full transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1) ${colors[level]}`} 
            style={{ width: `${percent}%` }}
          >
            {percent > 20 && (
              <div className="w-full h-full opacity-20 bg-linear-to-r from-transparent via-white to-transparent animate-(--animate-shimmer)" />
            )}
          </div>
        </div>
        
        <div className="flex justify-between text-[10px] font-medium text-(--text) opacity-40">
          <span>0</span>
          <span>{zone.capacity} MAX</span>
        </div>
      </div>
    </Card>
  );
}
