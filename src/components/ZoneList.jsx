import ZoneCard from './ZoneCard';
import { sortByDensity } from '../utils/crowdHelpers';

export default function ZoneList({ zones }) {
  const sortedZones = [...zones].sort(sortByDensity);

  return (
    <div className="w-full flex flex-col pt-2 text-left">
      {sortedZones.map(zone => (
        <ZoneCard key={zone.id} zone={zone} />
      ))}
    </div>
  );
}
