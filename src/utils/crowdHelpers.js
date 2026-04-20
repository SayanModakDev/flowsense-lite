export const getDensityPercent = (count, max) => {
  return Math.min(100, Math.max(0, Math.round((count / max) * 100)));
};

export const getDensityLevel = (count, max) => {
  const percent = getDensityPercent(count, max);
  if (percent < 40) return 'low';
  if (percent < 75) return 'medium';
  return 'high';
};

export const sortByDensity = (zonesA, zonesB) => {
  const percentA = getDensityPercent(zonesA.currentCount, zonesA.capacity);
  const percentB = getDensityPercent(zonesB.currentCount, zonesB.capacity);
  return percentA - percentB; // Ascending: lowest density first
};
