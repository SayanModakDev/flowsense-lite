import { useState, useEffect, useCallback } from 'react';
import { simulator } from '../data/crowdSimulator';

export function useCrowdData() {
  const [zones, setZones] = useState(simulator.getSnapshot());
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Subscribe to simulator ticks
    const unsubscribe = simulator.subscribe((newZones) => {
      setZones(newZones);
      setLastUpdated(new Date());
    });
    
    return () => unsubscribe();
  }, []);

  const refreshCrowd = useCallback(() => {
    simulator.tick(); // Force immediate re-simulation
  }, []);

  return { zones, lastUpdated, refreshCrowd };
}
