export const colorKeys = {
  hue: "hue",
  sat: "sat",
  light: "light",
  alpha: "alpha",
  whiteness: "whiteness",
  blackness: "blackness",
  redness: "redness",
  greenness: "greenness",
  blueness: "blueness",
  hex: "hex",
} as const;

export type ColorAttributeKeys = keyof typeof colorKeys;
