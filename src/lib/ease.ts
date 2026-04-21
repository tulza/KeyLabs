import BezierEasing from "bezier-easing";

const easeOutQuad = [0.5, 1, 0.89, 1] as const;
const easeOutExpo = [0.19, 1, 0.22, 1] as const;
const easeInExpo = [0.95, 0.05, 0.795, 0.035] as const;
const easeInQuad = [0.55, 0.085, 0.68, 0.53] as const;
const easeInQuart = [0.5, 0, 0.75, 0] as const;

export const ease = {
	outQuad: easeOutQuad,
	inQuad: easeInQuad,
	outExpo: easeOutExpo,
	inExpo: easeInExpo,
	inQuart: easeInQuart,
};

export const createEasingFn = (easingName: keyof typeof ease = "inQuad") => {
	const [x1, y1, x2, y2] = ease[easingName];
	const easingFn = BezierEasing(x1, y1, x2, y2);
	return (x: number) => easingFn(x);
};
