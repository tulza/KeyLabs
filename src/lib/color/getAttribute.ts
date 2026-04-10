import { HslColor, HwbColor, RgbColor } from "colord";
import { ColorAttributeKeys, colorKeys } from "./colorKeys";

export const getStyleProperty = (key: ColorAttributeKeys): string =>
  document.documentElement.style.getPropertyValue(`--${key}`);

const getStylePropertyFloat = (key: ColorAttributeKeys): number =>
  parseFloat(document.documentElement.style.getPropertyValue(`--${key}`));

export const getAllKeys = () => {
  return Object.values(colorKeys) as ColorAttributeKeys[];
};

export const getHue = (): number => {
  return getStylePropertyFloat(colorKeys.hue);
};

export const getAlpha = (): number => {
  return getStylePropertyFloat(colorKeys.alpha);
};

export const getRgb = (): RgbColor => ({
  r: getStylePropertyFloat(colorKeys.redness),
  g: getStylePropertyFloat(colorKeys.greenness),
  b: getStylePropertyFloat(colorKeys.blueness),
});

export const getHsl = (): HslColor => {
  return {
    h: getStylePropertyFloat(colorKeys.hue),
    s: getStylePropertyFloat(colorKeys.sat),
    l: getStylePropertyFloat(colorKeys.light),
  };
};

export const getHwb = (): HwbColor => ({
  h: getStylePropertyFloat(colorKeys.hue),
  w: getStylePropertyFloat(colorKeys.whiteness),
  b: getStylePropertyFloat(colorKeys.blackness),
});
