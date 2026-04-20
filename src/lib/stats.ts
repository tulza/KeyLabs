export const mean = (nums: number[]): number =>
	Math.round((nums.reduce((sum, n) => sum + n, 0) / nums.length) * 100) / 100;

export const median = (nums: number[]): number => {
	const sorted = [...nums].sort((a, b) => a - b);
	const mid = Math.floor(sorted.length / 2);
	return sorted.length % 2 === 0
		? (sorted[mid - 1] + sorted[mid]) / 2
		: sorted[mid];
};

export const mode = (nums: number[]): number => {
	const frequency = nums.reduce<Record<number, number>>((acc, n) => {
		acc[n] = (acc[n] ?? 0) + 1;
		return acc;
	}, {});
	return Number(
		Object.entries(frequency).sort(([, a], [, b]) => b - a)[0][0],
	);
};

export const max = (nums: number[]): number => Math.max(...nums);
