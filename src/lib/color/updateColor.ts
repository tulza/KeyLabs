import { AnyColor, Colord } from "colord";
import { colord } from "../colord";
import { ColorAttributeObject } from "./color.types";

/**
 * @param color in hex, rgb, hsl, hwb
 * @param flags options to control how the color is updated
 */
export const updateColor = (
  color: Colord | AnyColor,
  flags: {
    updateHue?: boolean;
    ignore?: (keyof ColorAttributeObject)[];
  } = {}
) => {
  const rgb = colord(color).toRgb();
  const hsl = colord(color).toHsl();
  const hwb = colord(color).toHwb();
  const hex = colord(color).toHex();

  const values: ColorAttributeObject = {
    sat: hsl.s,
    light: hsl.l,
    whiteness: hwb.w,
    blackness: hwb.b,
    redness: rgb.r,
    greenness: rgb.g,
    blueness: rgb.b,
    hex: hex,
  };

  // delete update for ignored keys
  if (flags?.ignore && flags.ignore.length > 0) flags.ignore.forEach((key) => delete values[key]);
  // update hue indirectly
  if (flags?.updateHue) values.hue = colord(color).hue();

  Object.entries(values).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--${key}`, `${value}`);
  });
};
