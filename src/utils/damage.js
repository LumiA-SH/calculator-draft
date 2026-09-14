export const CRITICAL_RATE = 0.1;
export const CRITICAL_MULTIPLIER = 1.5;

export const rollMultiplier = () => {
  const value = Math.random() * 1.5 + 2;
  return Number(value.toFixed(2));
};

export const calculateDamage = ({ type, stats }) => {
  const multiplier = rollMultiplier();

  const baseStat = type === "magic" ? stats.int + stats.mag : stats.str + stats.dex;

  const critical = Math.random() < CRITICAL_RATE;
  let damage = baseStat * multiplier;

  if (critical) {
    damage *= CRITICAL_MULTIPLIER;
  }

  return {
    type,
    baseStat,
    multiplier,
    critical,
    damage: Number(damage.toFixed(2)),
    date: new Date().toISOString(),
  };
};
