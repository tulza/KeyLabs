import { colord } from "../colord";
import { HSLColor, HWBColor, RGBColor } from "./color.types";

export const hslFormatter = (hsl: HSLColor) => {
  if (hsl.a && hsl.a < 1)
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}% / ${hsl.a})`;
  return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
};

export const rgbFormatter = (rgb: RGBColor) => {
  if (rgb.a && rgb.a < 1) return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b} / ${rgb.a})`;
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
};

export const hwbFormatter = (hwb: HWBColor) => {
  if (hwb.a && hwb.a < 1) return `hwb(${hwb.h} ${hwb.w}% ${hwb.b}% / ${hwb.a})`;
  return `hwb(${hwb.h} ${hwb.w}% ${hwb.b}%)`;
};

export const hexFormatter = (rgb: RGBColor) => {
  const hex = colord(rgb).toHex();
  return hex;
};
