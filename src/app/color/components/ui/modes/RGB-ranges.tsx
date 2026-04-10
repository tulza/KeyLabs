import { RangeColorInput } from "../range-color-input";

const RGBRanges = () => {
	return (
		<>
			<RangeColorInput
				label="Red"
				min={0}
				max={255}
				step={1}
				attribute="redness"
				className="red-gradient"
			/>
			<RangeColorInput
				label="Green"
				min={0}
				max={255}
				step={1}
				attribute="greenness"
				className="green-gradient"
			/>
			<RangeColorInput
				label="Blue"
				min={0}
				max={255}
				step={1}
				attribute="blueness"
				className="blue-gradient"
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

export default RGBRanges;
