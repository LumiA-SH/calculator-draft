export const getRequiredExp = (level) => Math.max(1, level) * 5000;

export const getExpProgress = (level, exp) => {
  const required = getRequiredExp(level);
  const safeExp = Math.max(0, Number(exp) || 0);
  return {
    required,
    percent: Math.min(100, Math.round((safeExp / required) * 100)),
    remaining: Math.max(0, required - safeExp),
  };
};
