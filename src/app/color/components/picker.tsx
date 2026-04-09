import HSLRanges from "./modes/HSLRanges";
import HWBRanges from "./modes/HWBRanges";
import RGBRanges from "./modes/RGBRanges";

export const ColorModes = ({ mode }: { mode: string }) => {
	if (mode === "hsl") return <HSLRanges />;
	if (mode === "hwb") return <HWBRanges />;
	if (mode === "rgb") return <RGBRanges />;
};

export default ColorModes;
