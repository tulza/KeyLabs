const getRandom = (
  min: number,
  max: number,
  unit?: string,
): string | number => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return unit ? `${randomNumber}${unit}` : randomNumber;
};

/** 
 * Generates a random HSL color string.
 * 
 * hsl(hue 100% 50%)
 * @returns A random saturated HSL color string.
 */
export const randomHsl = () => {
  const hue = getRandom(0, 360);
  return `hsl(${hue} 100% 50%)`;
};
