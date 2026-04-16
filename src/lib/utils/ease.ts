const easeOutQuad = [0.5, 1, 0.89, 1] as const;
const easeOutExpo = [0.19, 1, 0.22, 1] as const;
const easeInExpo = [0.95, 0.05, 0.795, 0.035] as const;
const easeInQuad = [0.55, 0.085, 0.68, 0.53] as const;

export const ease = {
	outQuad: easeOutQuad,
	inQuad: easeInQuad,
	outExpo: easeOutExpo,
	inExpo: easeInExpo,
};
