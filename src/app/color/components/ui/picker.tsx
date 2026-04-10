import HSLRanges from "./modes/HSL-ranges";
import HWBRanges from "./modes/HWB-ranges";
import RGBRanges from "./modes/RGB-ranges";

export const ColorModes = ({ mode }: { mode: string }) => {
	if (mode === "hsl") return <HSLRanges />;
	if (mode === "hwb") return <HWBRanges />;
	if (mode === "rgb") return <RGBRanges />;
};

export default ColorModes;
