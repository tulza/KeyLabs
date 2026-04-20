export const lerp = (
	value: number,
	inMin: number,
	inMax: number,
	outMin: number,
	outMax: number,
): number => ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
