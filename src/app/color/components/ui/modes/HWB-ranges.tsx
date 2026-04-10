import { useRef } from "react";
import { RangeColorInput, UpdateHandle } from "../range-color-input";

const HWBRanges = () => {
	const whitenessRef = useRef<UpdateHandle>(null);
	const blacknsesRef = useRef<UpdateHandle>(null);

	return (
		<>
			<RangeColorInput
				label="Hue"
				min={0}
				max={360}
				step={1}
				attribute="hue"
				className="hue-gradient"
			/>
			<RangeColorInput
				label="Whiteness"
				min={0}
				max={100}
				step={1}
				attribute="whiteness"
				className="whiteness-gradient"
				ref={whitenessRef}
				peerUpdate={[blacknsesRef]}
			/>
			<RangeColorInput
				label="Blackness"
				min={0}
				max={100}
				step={1}
				attribute="blackness"
				className="blackness-gradient"
				ref={blacknsesRef}
				peerUpdate={[whitenessRef]}
			/>
			<RangeColorInput
				label="Alpha"
				min={0}
				max={1}
				step={0.01}
				attribute="alpha"
				className="alpha-gradient"
			/>
		</>
	);
};

export default HWBRanges;
