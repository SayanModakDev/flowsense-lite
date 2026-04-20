import { ZONES } from './zones';

class CrowdSimulator {
  constructor() {
    this.zonesState = ZONES.map(z => ({
      ...z,
      currentCount: Math.floor(Math.random() * z.capacity * 0.4)
    }));
    this.subscribers = new Set();
    this.intervalId = null;
  }

  start(intervalMs = 5000) {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => this.tick(), intervalMs);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  tick() {
    this.zonesState = this.zonesState.map(zone => {
      const change = Math.floor((Math.random() - 0.5) * zone.capacity * 0.3);
      let nextCount = zone.currentCount + change;
      if (nextCount < 0) nextCount = 0;
      if (nextCount > zone.capacity) nextCount = zone.capacity;
      return { ...zone, currentCount: nextCount };
    });
    this.notify();
  }

  getSnapshot() {
    return [...this.zonesState];
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    const snapshot = this.getSnapshot();
    for (const callback of this.subscribers) {
      callback(snapshot);
    }
  }
}

export const simulator = new CrowdSimulator();
simulator.start();

// Prevent interval leak during Vite HMR
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    simulator.stop();
  });
}
