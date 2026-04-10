import { colord } from "../colord";
import { ColorAttributeObject, HEXColor } from "./color.types";

export const initColor = (hex: HEXColor) => {
  const hsl = colord(hex).toHsl();
  const rgb = colord(hex).toRgb();
  const hwb = colord(hex).toHwb();

  return {
    hue: hsl.h,
    sat: hsl.s,
    light: hsl.l,
    alpha: hsl.a,
    whiteness: hwb.w,
    blackness: hwb.b,
    redness: rgb.r,
    greenness: rgb.g,
    blueness: rgb.b,
    hex: hex,
  } as ColorAttributeObject;
};
