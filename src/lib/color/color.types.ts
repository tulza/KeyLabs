import { ColorAttributeKeys } from "./colorKeys";

export type HEXColor = string;

export type RGBColor = {
  r: number;
  g: number;
  b: number;
  a?: number;
};

export type HSLColor = {
  h: number;
  s: number;
  l: number;
  a?: number;
};

export type HWBColor = {
  h: number;
  w: number;
  b: number;
  a?: number;
};

export type ColorAttributeObject = Partial<
  Record<ColorAttributeKeys, string | number>
>;

export type ColorAttributeStyle =
  `--${ColorAttributeKeys}: ${string | number};`;
