import { Analysis, Point, Statistic } from "./types";

const MAX_FAILS = 100;
const MAX_LOOP_RETRY = 5;
const DISTANCE_MULTIPLIER_DECREMENT = 0.2;
const PADDING = 12;

export const distance = (x1: number, y1: number, x2: number, y2: number) => {
	const x = x2 - x1;
	const y = y2 - y1;
	return Math.sqrt(x * x + y * y);
};

const getRandomInt = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getSpawnRange = (
	targetSize: number,
	screen: { width: number; height: number },
) => {
	const widthLength = screen.width - targetSize - PADDING * 2;
	const heightLength = screen.height - targetSize - PADDING * 2;

	const halfTarget = targetSize / 2;

	const minX = halfTarget + PADDING;
	const minY = halfTarget + PADDING;
	const maxX = widthLength + minX;
	const maxY = heightLength + minY;

	return { minX, minY, maxX, maxY };
};

const getRandomPoint = (
	minX: number,
	maxX: number,
	minY: number,
	maxY: number,
): [number, number] => {
	const x = getRandomInt(minX, maxX);
	const y = getRandomInt(minY, maxY);
	return [x, y];
};

export const isTooClose = (
	stack: Point[],
	x: number,
	y: number,
	targetSize: number,
	multiplier: number,
): boolean => {
	const minDistSq = (targetSize * multiplier) ** 2;
	return stack.some((point) => {
		const dx = point.x - x;
		const dy = point.y - y;
		return dx * dx + dy * dy < minDistSq;
	});
};

const createPoint = (
	index: number,
	zeroIndexLength: number,
	word: string,
	x: number,
	y: number,
): Point => {
	return {
		index: zeroIndexLength - index,
		value: word[index],
		x,
		y,
		id: `${word}-${zeroIndexLength - index}`,
	};
};

const resetStack = () => {
	return { stack: [] as Point[], count: 0, index: 0 };
};

export const generateCircleLocation = (
	word: string = "",
	targetSize: number,
	screen: { width: number; height: number },
): Point[] => {
	const letters = word.trim().split("");
	const zeroIndexLength = word.length - 1;

	const { minX, minY, maxX, maxY } = getSpawnRange(targetSize, screen);

	let { stack, count, index } = resetStack();
	let retry = 0;
	let minimumDistanceMultiplier = 2;

	while (true) {
		if (count > MAX_FAILS) {
			if (retry > MAX_LOOP_RETRY) {
				break;
			}
			({ stack, count, index } = resetStack());
			retry++;
			minimumDistanceMultiplier -= DISTANCE_MULTIPLIER_DECREMENT;
		}

		if (stack.length === letters.length) break;

		const [randomX, randomY] = getRandomPoint(minX, maxX, minY, maxY);

		if (
			isTooClose(
				stack,
				randomX,
				randomY,
				targetSize,
				minimumDistanceMultiplier,
			)
		) {
			count++;
			continue;
		}

		stack.push(createPoint(index, zeroIndexLength, word, randomX, randomY));
		count = 0;
		index++;
	}

	return stack.reverse();
};

export const deriveAnalysis = (
	stats: Statistic,
	elapsedTime: number,
): Analysis => {
	const { clicks, hits } = stats;

	const accuracy = clicks === 0 ? 0 : hits / clicks;
	const rawLpm =
		elapsedTime > 0
			? parseFloat((hits * (60000 / elapsedTime)).toFixed(2))
			: 0;
	const lpm = parseFloat((rawLpm * accuracy).toFixed(2));

	return {
		accuracy,
		rawLpm,
		lpm,
	};
};
