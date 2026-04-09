import React from "react";
import { RangeColorInput } from "../RangeColorInput";

const HSLRanges = () => {
  return (
    <>
      <RangeColorInput label="Hue" min={0} max={360} step={1} attribute="hue" className="hue-gradient" />
      <RangeColorInput label="Saturation" min={0} max={100} step={1} attribute="sat" className="saturation-gradient" />
      <RangeColorInput label="Lightness" min={0} max={100} step={1} attribute="light" className="lightness-gradient" />
      <RangeColorInput label="Alpha" min={0} max={1} step={0.01} attribute="alpha" className="alpha-gradient" />
    </>
  );
};

export default HSLRanges;
