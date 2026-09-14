const STAT_KEYS = ["str", "dex", "int", "mag"];

export const distributeStats = (points = 10) => {
  const result = { str: 0, dex: 0, int: 0, mag: 0 };

  for (let i = 0; i < points; i += 1) {
    const key = STAT_KEYS[Math.floor(Math.random() * STAT_KEYS.length)];
    result[key] += 1;
  }

  return result;
};

export const addStatGain = (stats, gain) => ({
  str: stats.str + gain.str,
  dex: stats.dex + gain.dex,
  int: stats.int + gain.int,
  mag: stats.mag + gain.mag,
});
